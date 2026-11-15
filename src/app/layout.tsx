import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import SmoothScroll from "./components/SmoothScroll"
import FloatingActionButton from "./components/FloatingActionButton"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

/* URL pública del sitio.
   - Si la iglesia tiene dominio propio, ponlo en NEXT_PUBLIC_SITE_URL (ej. https://midominio.org).
   - Si no, Vercel entrega VERCEL_PROJECT_PRODUCTION_URL automáticamente al compilar.
   No se inventa ninguna URL: si no hay ninguna de las dos, no se declara. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined)

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/" } } : {}),
  title: "Fe y Esperanza Galicia | Iglesia Cristiana en Pereira, Risaralda",
  description:
    "Iglesia Fe y Esperanza Galicia — Comunidad cristiana en Pereira, Risaralda. Culto principal los sábados de 6:00 a 8:00 p. m. Únete a nuestra familia espiritual llena de fe, amor y esperanza.",
  keywords: [
    "iglesia cristiana pereira",
    "fe y esperanza galicia",
    "iglesia risaralda",
    "culto sábados pereira",
    "comunidad cristiana galicia",
    "familia espiritual",
  ],
  authors: [{ name: "Fe y Esperanza Galicia" }],
  openGraph: {
    title: "Fe y Esperanza Galicia | Iglesia Cristiana en Pereira",
    description: "Comunidad cristiana en Pereira. Culto principal los sábados de 6:00 a 8:00 p. m. Únete a nuestra familia.",
    type: "website",
    locale: "es_CO",
    siteName: "Fe y Esperanza Galicia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fe y Esperanza Galicia | Iglesia Cristiana en Pereira",
    description: "Comunidad cristiana en Pereira. Culto principal los sábados de 6:00 a 8:00 p. m. Únete a nuestra familia.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <SmoothScroll />
        <FloatingActionButton />
      </body>
    </html>
  )
}
