/**
 * Lógica del formulario de contacto (solo servidor).
 * Aquí se valida lo que llega del navegador y se arma el correo.
 */

/* Destino oficial en producción. El navegador NUNCA puede cambiarlo. */
export const OFFICIAL_CONTACT_EMAIL = "Feyesperanzagalicia@gmail.com"

/**
 * Decide a qué correo llega el mensaje.
 * - Vercel Production: SIEMPRE el correo oficial (no depende de variables).
 * - Preview / local: EMAIL_TO, para poder probar.
 */
export function resolveRecipient(env: Record<string, string | undefined>): string | undefined {
  if (env.VERCEL_ENV === "production") return OFFICIAL_CONTACT_EMAIL
  return env.EMAIL_TO?.trim() || undefined
}

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
  /** Tamaño máximo del cuerpo JSON (bytes). */
  bodyMax: 8 * 1024,
  /** Un humano tarda más que esto en llenar el formulario (ms). */
  minFillTimeMs: 3000,
} as const

const EMAIL_REGEX = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/
/* Caracteres de control (incluye saltos de línea) */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/
const CONTROL_CHARS_EXCEPT_NEWLINE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

export type ContactInput = {
  name: string
  email: string
  message: string
}

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; status: number; error: string; spam?: boolean }

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

export function validateContact(raw: unknown, now = Date.now()): ValidationResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, status: 400, error: "Solicitud inválida." }
  }
  const body = raw as Record<string, unknown>

  /* ── Antispam 1: campo trampa (los humanos no lo ven ni lo llenan) ── */
  const honeypot = asString(body.website) ?? ""
  if (honeypot.trim() !== "") {
    return {
      ok: false,
      status: 400,
      spam: true,
      error: "No pudimos procesar el envío. Si el problema continúa, escríbenos por correo o WhatsApp.",
    }
  }

  /* ── Antispam 2: tiempo mínimo de llenado ── */
  const startedAt = Number(body.startedAt)
  if (!Number.isFinite(startedAt) || now - startedAt < LIMITS.minFillTimeMs) {
    return {
      ok: false,
      status: 400,
      spam: true,
      error: "Por favor espera unos segundos y vuelve a intentarlo.",
    }
  }

  const name = (asString(body.name) ?? "").trim()
  const email = (asString(body.email) ?? "").trim()
  const message = (asString(body.message) ?? "").replace(/\r\n/g, "\n").trim()

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax || CONTROL_CHARS.test(name)) {
    return {
      ok: false,
      status: 400,
      error: `El nombre debe tener entre ${LIMITS.nameMin} y ${LIMITS.nameMax} caracteres.`,
    }
  }

  if (email.length > LIMITS.emailMax || CONTROL_CHARS.test(email) || !EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      status: 400,
      error: "Ingresa un correo electrónico válido (ej: nombre@gmail.com).",
    }
  }

  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) {
    return {
      ok: false,
      status: 400,
      error: `El mensaje debe tener entre ${LIMITS.messageMin} y ${LIMITS.messageMax} caracteres.`,
    }
  }

  /* ── Autorización de tratamiento de datos (casilla obligatoria) ── */
  if (body.consent !== true) {
    return {
      ok: false,
      status: 400,
      error: "Debes autorizar el tratamiento de tus datos para poder enviar el mensaje.",
    }
  }

  return {
    ok: true,
    data: { name, email, message: message.replace(CONTROL_CHARS_EXCEPT_NEWLINE, "") },
  }
}

/** Convierte < > & " ' en texto seguro para HTML (evita inyectar código en el correo). */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function buildEmail({ name, email, message }: ContactInput) {
  const n = escapeHtml(name)
  const e = escapeHtml(email)
  const m = escapeHtml(message)

  const text = [
    "Has recibido un nuevo mensaje desde el formulario de contacto de la web.",
    "",
    "────────────────────────────────────────",
    `Nombre:  ${name}`,
    `Correo:  ${email}`,
    "────────────────────────────────────────",
    "",
    "Mensaje:",
    message,
    "",
    "────────────────────────────────────────",
    "Responde directamente a este correo para contactar a la persona.",
    "La persona autorizó el tratamiento de sus datos según el aviso de privacidad del sitio.",
  ].join("\n")

  const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #5b21b6); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">Nuevo mensaje desde la web</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Fe y Esperanza Galicia</p>
          </div>
          <div style="background: #f8faff; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a; width: 100px;">Nombre</td>
                <td style="padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; color: #0f172a;">${n}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a;">Correo</td>
                <td style="padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0;">
                  <a href="mailto:${e}" style="color: #5b21b6;">${e}</a>
                </td>
              </tr>
            </table>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #1e3a8a;">Mensaje:</p>
              <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${m}</p>
            </div>
            <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">La persona autorizó el tratamiento de sus datos según el aviso de privacidad del sitio.</p>
          </div>
          <div style="background: #1e3a8a; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">
              Fe y Esperanza Galicia · Pereira, Risaralda
            </p>
          </div>
        </div>
      `

  return {
    subject: `Nuevo mensaje desde la web: ${name}`,
    text,
    html,
  }
}
