/**
 * Pruebas del formulario de contacto SIN enviar correos reales.
 *
 *   npm run build
 *   npm run test:contact
 *
 * Levanta un servidor SMTP falso en este computador y arranca el sitio
 * apuntando a él (SMTP_TEST_HOST). Ningún mensaje sale a Internet.
 * No imprime el contenido de los mensajes.
 */
import net from "node:net"
import { spawn } from "node:child_process"
import { setTimeout as sleep } from "node:timers/promises"

const APP_PORT = 3123
const SMTP_PORT = 2526
const BASE = `http://127.0.0.1:${APP_PORT}`
const TEST_FROM = "remitente-prueba@example.com"
const TEST_TO = "destino-prueba@example.com"

/* ── Servidor SMTP falso ─────────────────────────────────────── */
let smtpMode = "ok" // "ok" | "fail-data"
const received = []

const smtp = net.createServer(socket => {
  let inData = false
  let buffer = ""
  let mail = { from: "", to: [], data: "" }
  socket.write("220 mock-smtp listo\r\n")
  socket.on("data", chunk => {
    buffer += chunk.toString("utf8")
    if (inData) {
      const end = buffer.indexOf("\r\n.\r\n")
      if (end === -1) return
      mail.data = buffer.slice(0, end)
      buffer = buffer.slice(end + 5)
      inData = false
      if (smtpMode === "fail-data") {
        socket.write("554 rechazado por prueba\r\n")
      } else {
        received.push(mail)
        socket.write("250 OK guardado\r\n")
      }
      mail = { from: "", to: [], data: "" }
    }
    let idx
    while (!inData && (idx = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, idx)
      buffer = buffer.slice(idx + 2)
      const cmd = line.slice(0, 4).toUpperCase()
      if (cmd === "EHLO" || cmd === "HELO") socket.write("250 mock-smtp\r\n")
      else if (cmd === "MAIL") { mail.from = line; socket.write("250 OK\r\n") }
      else if (cmd === "RCPT") { mail.to.push(line); socket.write("250 OK\r\n") }
      else if (cmd === "DATA") { inData = true; socket.write("354 envia los datos\r\n") }
      else if (cmd === "QUIT") { socket.end("221 adios\r\n") }
      else if (cmd === "RSET" || cmd === "NOOP") socket.write("250 OK\r\n")
      else socket.write("502 no soportado\r\n")
    }
  })
  socket.on("error", () => {})
})

/* ── Utilidades ──────────────────────────────────────────────── */
/** Extrae y decodifica la parte text/html de un correo MIME (quoted-printable o base64). */
function decodeHtmlPart(raw) {
  const parts = raw.split(/\r\n--[^\r\n]+\r\n/)
  const part = parts.find(p => /Content-Type: text\/html/i.test(p)) ?? ""
  const [head, ...rest] = part.split("\r\n\r\n")
  const body = rest.join("\r\n\r\n")
  if (/Content-Transfer-Encoding: base64/i.test(head)) return Buffer.from(body.replace(/\s+/g, ""), "base64").toString("utf8")
  if (/Content-Transfer-Encoding: quoted-printable/i.test(head)) {
    const bytes = body.replace(/=\r\n/g, "").replace(/=([0-9A-F]{2})/gi, (_, h) => "%" + h)
    try { return decodeURIComponent(bytes.replace(/%(?![0-9A-F]{2})/gi, "%25")) } catch { return bytes }
  }
  return body
}

let passed = 0
let failed = 0
function check(name, condition) {
  if (condition) { passed++; console.log(`  ✔ ${name}`) }
  else { failed++; console.log(`  ✘ ${name}`) }
}

let ipCounter = 10
const valid = () => ({
  name: "Persona de Prueba",
  email: "visitante-prueba@example.com",
  message: "Este es un mensaje de prueba automático.",
  consent: true,
  website: "",
  startedAt: Date.now() - 10_000,
})

async function post(body, { headers = {}, raw } = {}) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: BASE,
      "X-Forwarded-For": `10.0.0.${ipCounter++}`,
      ...headers,
    },
    body: raw ?? JSON.stringify(body),
  })
  let data = {}
  try { data = await res.json() } catch { /* sin JSON */ }
  return { status: res.status, data }
}

/* ── Arranque ────────────────────────────────────────────────── */
await new Promise(r => smtp.listen(SMTP_PORT, "127.0.0.1", r))

const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(APP_PORT)], {
  env: {
    ...process.env,
    VERCEL_ENV: "development",
    EMAIL_USER: TEST_FROM,
    EMAIL_PASS: "",
    EMAIL_TO: TEST_TO,
    SMTP_TEST_HOST: "127.0.0.1",
    SMTP_TEST_PORT: String(SMTP_PORT),
  },
  stdio: ["ignore", "pipe", "pipe"],
})
const serverLogs = []
app.stdout.on("data", d => serverLogs.push(d.toString()))
app.stderr.on("data", d => serverLogs.push(d.toString()))

let ready = false
for (let i = 0; i < 60 && !ready; i++) {
  await sleep(500)
  try { ready = (await fetch(BASE)).ok } catch { /* aún no */ }
}
if (!ready) {
  console.error("El sitio no arrancó. ¿Ejecutaste `npm run build`?")
  app.kill(); smtp.close(); process.exit(1)
}

try {
  console.log("\n1. Envío válido (proveedor simulado acepta)")
  {
    const before = received.length
    const r = await post({ ...valid(), name: "Prueba <b>html</b>", to: "atacante@example.com", replyTo: "x@example.com" })
    check("responde 200 y ok:true", r.status === 200 && r.data.ok === true)
    const mail = received[before]
    check("el proveedor recibió exactamente 1 correo", received.length === before + 1)
    check("destinatario = EMAIL_TO (el navegador no puede cambiarlo)", !!mail && mail.to.length === 1 && mail.to[0].includes(TEST_TO))
    check("remitente = EMAIL_USER, no el visitante", !!mail && mail.from.includes(TEST_FROM))
    check("correo del visitante va en Reply-To", !!mail && /^Reply-To:.*visitante-prueba@example\.com/mi.test(mail.data))
    const html = mail ? decodeHtmlPart(mail.data) : ""
    check("el HTML del visitante se escapa", html.includes("&lt;b&gt;html&lt;/b&gt;") && !html.includes("<b>html</b>"))
  }

  console.log("\n2. Datos inválidos (no deben llegar al proveedor)")
  {
    const before = received.length
    const cases = [
      ["correo inválido", { ...valid(), email: "no-es-correo" }, 400],
      ["nombre muy corto", { ...valid(), name: "A" }, 400],
      ["nombre con salto de línea", { ...valid(), name: "Ana\nBcc: x@example.com" }, 400],
      ["mensaje muy corto", { ...valid(), message: "hola" }, 400],
      ["mensaje demasiado largo", { ...valid(), message: "a".repeat(2001) }, 400],
      ["sin autorización de datos", { ...valid(), consent: false }, 400],
      ["campo trampa lleno (robot)", { ...valid(), website: "http://spam.example" }, 400],
      ["enviado demasiado rápido (robot)", { ...valid(), startedAt: Date.now() }, 400],
      ["campos con tipo incorrecto", { ...valid(), name: ["x", "y"] }, 400],
    ]
    for (const [label, body, expected] of cases) {
      const r = await post(body)
      check(`${label} → ${expected} con mensaje en español`, r.status === expected && typeof r.data.error === "string")
    }
    const big = await post(null, { raw: JSON.stringify({ ...valid(), message: "x".repeat(9000) }) })
    check("cuerpo enorme → 413", big.status === 413)
    const notJson = await post(null, { raw: "esto no es json" })
    check("cuerpo no JSON → 400", notJson.status === 400)
    const foreign = await post(valid(), { headers: { Origin: "https://otro-sitio.example" } })
    check("otro sitio (Origin distinto) → 403", foreign.status === 403)
    check("ninguno llegó al proveedor", received.length === before)
  }

  console.log("\n3. Falla del proveedor")
  {
    smtpMode = "fail-data"
    const r = await post(valid())
    check("proveedor rechaza → 502 sin falso éxito", r.status === 502 && !r.data.ok && typeof r.data.error === "string")
    smtpMode = "ok"
    await new Promise(r => smtp.close(r))
    const down = await post(valid())
    check("proveedor caído → 502 sin falso éxito", down.status === 502 && !down.data.ok)
    await new Promise(r => smtp.listen(SMTP_PORT, "127.0.0.1", r))
  }

  console.log("\n4. Límite de envíos seguidos (misma IP)")
  {
    const statuses = []
    for (let i = 0; i < 6; i++) {
      const r = await post({ ...valid(), message: "x" }, { headers: { "X-Forwarded-For": "10.9.9.9" } })
      statuses.push(r.status)
    }
    check("el 6.º intento en 10 minutos → 429", statuses[5] === 429)
  }

  console.log("\n5. Los logs del servidor no contienen datos del visitante")
  {
    await sleep(300)
    const logs = serverLogs.join("")
    check("sin correo del visitante en logs", !logs.includes("visitante-prueba@example.com"))
    check("sin texto del mensaje en logs", !logs.includes("mensaje de prueba automático"))
  }

  console.log("\n6. Destino en producción (Vercel Production)")
  try {
    const { resolveRecipient } = await import("../src/lib/contact.ts")
    check("producción → Feyesperanzagalicia@gmail.com aunque EMAIL_TO diga otra cosa",
      resolveRecipient({ VERCEL_ENV: "production", EMAIL_TO: "otro@example.com" }) === "Feyesperanzagalicia@gmail.com")
    check("preview → usa EMAIL_TO", resolveRecipient({ VERCEL_ENV: "preview", EMAIL_TO: TEST_TO }) === TEST_TO)
    check("sin EMAIL_TO fuera de producción → no envía", resolveRecipient({ VERCEL_ENV: "preview" }) === undefined)
  } catch {
    console.log("  (omitido: tu versión de Node no puede leer .ts; usa Node 22.18 o superior)")
  }
} finally {
  app.kill()
  smtp.close()
}

console.log(`\nResultado: ${passed} pruebas OK, ${failed} fallidas\n`)
process.exit(failed === 0 ? 0 : 1)
