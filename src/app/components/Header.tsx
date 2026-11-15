"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#inicio",    label: "Inicio"        },
  { href: "#nosotros",  label: "Quiénes Somos" },
  { href: "#servicios", label: "Servicios"      },
  { href: "#galeria",   label: "Galería"        },
  { href: "#contacto",  label: "Contacto"       },
]

export default function Header() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const pathname = usePathname()
  /* En otras páginas (ej. /privacidad) los anclajes deben volver a la portada */
  const toHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`)

  /* ── Scroll detection ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    // Run once on mount to set correct initial state
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ── Active section (IntersectionObserver) ────────── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* ── Close mobile menu on resize ─────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  /* ── Derived styles ───────────────────────────────── */
  // When NOT scrolled: dark hero background so white text is always legible
  // When scrolled: white glass background with dark text
  const headerBg = scrolled
    ? "bg-white/96 backdrop-blur-xl shadow-[0_2px_32px_rgba(30,58,138,0.12)] border-b border-slate-100/80"
    : "bg-gradient-to-r from-[#0f172a]/95 via-[#1e1b4b]/90 to-[#1e3a8a]/95 backdrop-blur-sm border-b border-white/10"

  const textColor     = scrolled ? "text-slate-700"  : "text-white/90"
  const textHover     = scrolled ? "hover:text-slate-900 hover:bg-slate-50" : "hover:text-white hover:bg-white/12"
  const activeText    = scrolled ? "text-violet-700 bg-violet-50" : "text-white bg-white/18"
  const logoTitle     = scrolled ? "text-slate-900"  : "text-white"
  const logoSub       = scrolled ? "text-violet-600" : "text-amber-300"
  const mobileToggle  = scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/15"

  return (
    <header className={`sticky top-0 z-50 transition-all duration-400 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ─────────────────────────────────── */}
          <Link href={toHref("#inicio")} className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative flex-shrink-0">
              {/* Ambient glow when scrolled */}
              <div
                className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-300 bg-violet-400/30 ${
                  scrolled ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
              <Image
                src="/logo-iglesia.jpg"
                alt=""
                width={52}
                height={52}
                priority
                className="rounded-full object-cover relative z-10 ring-2 ring-white/70 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="leading-snug">
              <span className={`block font-extrabold text-base lg:text-lg font-playfair tracking-tight transition-colors duration-300 ${logoTitle}`}>
                Fe y Esperanza
              </span>
              <span className={`block text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${logoSub}`}>
                Galicia
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegación principal">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <Link
                  key={link.href}
                  href={toHref(link.href)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive ? activeText : `${textColor} ${textHover}`
                  }`}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}

            {/* CTA button */}
            <a
              href={toHref("#contacto")}
              className="ml-4 inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(91,33,182,0.40)] hover:shadow-[0_6px_24px_rgba(91,33,182,0.55)] hover:scale-[1.04] active:scale-95 transition-all duration-200"
            >
              Únete
            </a>
          </nav>

          {/* ── Mobile toggle ────────────────────────── */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${mobileToggle}`}
          >
            {menuOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────── */}
      <div
        id="mobile-nav"
        inert={!menuOpen}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="bg-white border-t border-slate-100 shadow-xl px-5 py-4 space-y-1"
          aria-label="Navegación móvil"
        >
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <Link
                key={link.href}
                href={toHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={toHref("#contacto")}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-3 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white text-sm font-bold py-3 px-5 rounded-xl shadow-md transition-all duration-200"
          >
            Únete a nosotros
          </a>
        </nav>
      </div>
    </header>
  )
}
