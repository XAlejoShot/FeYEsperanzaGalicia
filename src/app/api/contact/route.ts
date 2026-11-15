export const dynamic = "force-dynamic"
export const runtime = "nodejs" // nodemailer necesita Node.js (no Edge)

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { LIMITS, buildEmail, resolveRecipient, validateContact } from "@/lib/contact"

/* ─────────────────────────────────────────────────────────────
   Límite de envíos por IP (mejor esfuerzo).
   En Vercel cada instancia tiene su propia memoria, así que esto
   frena ráfagas, pero no reemplaza al Firewall de Vercel.
   La IP nunca se guarda en logs.
   ───────────────────────────────────────────────────────────── */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string, now = Date.now()): boolean {
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    if (hits.size > 5000) {
      for (const [key, value] of hits) if (value.resetAt < now) hits.delete(key)
    }
    return false
  }
  entry.count += 1
  return entry.count > RATE_MAX
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

const GENERIC_FAIL =
  "No pudimos enviar tu mensaje en este momento. Intenta de nuevo en unos minutos o escríbenos por WhatsApp."

export async function POST(req: NextRequest) {
  /* ── 1. Solo aceptamos envíos desde este mismo sitio ── */
  const origin = req.headers.get("origin")
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  if (origin) {
    let originHost = ""
    try {
      originHost = new URL(origin).host
    } catch {
      /* origen mal formado */
    }
    if (!host || originHost !== host) {
      return json({ error: "Solicitud no permitida." }, 403)
    }
  }

  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ error: "Solicitud inválida." }, 415)
  }

  /* ── 2. Límite de tamaño y de frecuencia ── */
  const declared = Number(req.headers.get("content-length") ?? 0)
  if (declared > LIMITS.bodyMax) {
    return json({ error: "El mensaje es demasiado largo." }, 413)
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local"
  if (isRateLimited(ip)) {
    console.warn("[contact] rechazado: demasiados envíos seguidos")
    return json(
      { error: "Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo." },
      429
    )
  }

  let raw: unknown
  try {
    const text = await req.text()
    if (Buffer.byteLength(text, "utf8") > LIMITS.bodyMax) {
      return json({ error: "El mensaje es demasiado largo." }, 413)
    }
    raw = JSON.parse(text)
  } catch {
    return json({ error: "Solicitud inválida." }, 400)
  }

  /* ── 3. Validación en el servidor ── */
  const result = validateContact(raw)
  if (!result.ok) {
    if (result.spam) console.warn("[contact] rechazado: filtro antispam")
    return json({ error: result.error }, result.status)
  }

  /* ── 4. Configuración (variables de entorno) ──
     En producción el destino es SIEMPRE el correo oficial de la iglesia.
     En Preview/local se usa EMAIL_TO para poder probar sin tocar producción. */
  const isProduction = process.env.VERCEL_ENV === "production"
  const emailUser = process.env.EMAIL_USER?.trim()
  const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, "")
  const emailTo = resolveRecipient(process.env)

  /* Solo para pruebas automáticas (servidor SMTP simulado). Ignorado en producción. */
  const testHost = isProduction ? undefined : process.env.SMTP_TEST_HOST
  const testPort = Number(process.env.SMTP_TEST_PORT ?? 2525)

  if (!emailUser || !emailTo || (!emailPass && !testHost)) {
    console.error("[contact] faltan variables de entorno", {
      EMAIL_USER: !!emailUser,
      EMAIL_PASS: !!emailPass,
      EMAIL_TO: !!emailTo,
    })
    return json({ error: GENERIC_FAIL }, 503)
  }

  const transporter = testHost
    ? nodemailer.createTransport({ host: testHost, port: testPort, secure: false, ignoreTLS: true })
    : nodemailer.createTransport({
        service: "gmail",
        auth: { user: emailUser, pass: emailPass }, // Contraseña de APLICACIÓN de Google
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      })

  /* ── 5. Enviar ── */
  const { subject, text, html } = buildEmail(result.data)
  try {
    const info = await transporter.sendMail({
      from: { name: "Fe y Esperanza Galicia", address: emailUser },
      to: emailTo,
      // El correo del visitante solo va en Reply-To, nunca como remitente.
      replyTo: { name: result.data.name, address: result.data.email },
      subject,
      text,
      html,
    })

    const accepted = ((info.accepted ?? []) as Array<string | { address: string }>).map(a =>
      (typeof a === "string" ? a : a.address).toLowerCase()
    )
    if (!accepted.includes(emailTo.toLowerCase())) {
      console.error("[contact] el servidor SMTP no aceptó el destinatario")
      return json({ error: GENERIC_FAIL }, 502)
    }

    // Sin datos personales en el log: solo que el servidor lo aceptó.
    console.info("[contact] mensaje aceptado por el servidor de correo")
    return json({ ok: true }, 200)
  } catch (error: unknown) {
    const err = error as { code?: string; responseCode?: number; command?: string }
    console.error("[contact] error al enviar", {
      code: err?.code ?? "desconocido",
      responseCode: err?.responseCode,
      command: err?.command,
    })
    return json({ error: GENERIC_FAIL }, 502)
  }
}
