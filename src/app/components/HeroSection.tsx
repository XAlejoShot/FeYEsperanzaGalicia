import Image from "next/image"
import { ChevronDown, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center items-center"
      aria-label="Sección principal"
    >
      {/* ─── Background layers (all absolute, all aria-hidden) ─── */}

      {/* Deep gradient base */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Radial purple glow — top left */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, #5b21b6 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Radial blue glow — bottom right */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, #1e3a8a 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Gold accent — center top */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[2px] opacity-30 -z-10"
        style={{ background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] -z-10"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* ─── Main content ─────────────────────────────────────────── */}
      {/*
        Key layout fix:
        - pt-24 so content clears the sticky header (~72px)
        - pb-28 sm:pb-36 gives breathing room above the wave (h-16/h-20)
          and ensures stats are never clipped on short/medium viewports
        - NO overflow-hidden on the section → stats always visible
        - flex-col allows the section to grow taller than 100vh when needed
      */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto w-full pt-24 pb-28 sm:pb-36">

        {/* Badge */}
        <div className="hero-fade-1 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 sm:mb-10">
          <Sparkles size={12} aria-hidden="true" />
          Bienvenidos a nuestra comunidad
          <Sparkles size={12} aria-hidden="true" />
        </div>

        {/* Logo */}
        <div className="hero-fade-2 flex justify-center mb-8 sm:mb-10">
          <div className="relative">
            {/* Soft ambient glow — purely decorative, not a visible ring */}
            <div
              className="absolute inset-[-8px] rounded-full blur-2xl pointer-events-none opacity-40"
              style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <Image
              src="/logo-iglesia.jpg"
              alt="Logo Fe y Esperanza Galicia"
              width={180}
              height={180}
              priority
              className="logo-breathe relative rounded-full object-cover"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-fade-3 font-playfair text-[clamp(2.2rem,7vw,5.5rem)] font-extrabold leading-[1.05] mb-4 tracking-tight text-balance">
          Fe y Esperanza
          <span className="block gradient-text-warm">Galicia</span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-fade-3 text-[clamp(0.9rem,2.2vw,1.25rem)] text-white/75 font-light tracking-wide mb-3">
          Una Familia · Mi Familia · Nuestra Familia
        </p>

        <p className="hero-fade-4 text-sm sm:text-base lg:text-lg text-white/60 max-w-xl mx-auto leading-relaxed mb-10">
          Bienvenidos a nuestra comunidad de fe, donde cada persona es valorada,
          amada y encuentra su lugar en la familia de Dios.
        </p>

        {/* CTAs */}
        <div className="hero-fade-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-14">
          <a href="#contacto" className="btn-cta text-base">
            Únete a nosotros
          </a>
          <a href="#nosotros" className="btn-secondary text-base">
            Conoce Más
          </a>
        </div>

        {/* Stats row — always fully visible */}
        <div className="hero-fade-4 grid grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-lg mx-auto">
          {[
            { value: "10+",  label: "Años de ministerio"  },
            { value: "100+", label: "Familias unidas"     },
            { value: "4",    label: "Servicios semanales" },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl py-4 px-2 sm:px-3"
            >
              <div className="text-xl sm:text-2xl font-bold font-playfair text-amber-400">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 mt-0.5 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Scroll indicator ─────────────────────────────────────── */}
      {/*
        Uses bottom-[5.5rem] (≈ 88px) on mobile and bottom-[6.5rem] on sm+
        so it always floats above the wave without clipping content.
      */}
      <a
        href="#nosotros"
        className="absolute bottom-[5.5rem] sm:bottom-[6.5rem] left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors duration-300 z-10"
        aria-label="Ir a quiénes somos"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>

      {/* ─── Bottom wave ──────────────────────────────────────────── */}
      {/*
        pointer-events-none + -z-10 ensures the wave is purely decorative
        and never clips or captures events over content.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 -z-[1] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-16 lg:h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#f8faff"
          />
        </svg>
      </div>
    </section>
  )
}
