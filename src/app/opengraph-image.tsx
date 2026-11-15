import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

/* Imagen que aparece al compartir el enlace en WhatsApp, Facebook, etc. */
export const alt = "Fe y Esperanza Galicia — Iglesia Cristiana en Pereira, Risaralda"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-iglesia.jpg"))
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 90px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e3a8a 100%)",
          color: "white",
        }}
      >
        <img src={logoSrc} width={260} height={260} alt="" style={{ borderRadius: 9999, border: "6px solid rgba(255,255,255,0.7)" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Fe y Esperanza</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#fcd34d", letterSpacing: 8, marginTop: 8 }}>GALICIA</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)", marginTop: 28 }}>
            Iglesia cristiana · Pereira, Risaralda
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)", marginTop: 8 }}>Culto principal: sábados, 6:00 – 8:00 p. m.</div>
        </div>
      </div>
    ),
    size
  )
}
