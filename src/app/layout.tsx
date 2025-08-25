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
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Fe y Esperanza Galicia - Una Familia, Mi Familia, Nuestra Familia",
  description:
    "Iglesia Fe y Esperanza Galicia - Comunidad de fe, amor y esperanza. Únete a nuestra familia espiritual.",
  keywords: "iglesia, fe, esperanza, galicia, comunidad, familia, cristo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        {children}
        <SmoothScroll />
        <FloatingActionButton />
      </body>
    </html>
  )
}
