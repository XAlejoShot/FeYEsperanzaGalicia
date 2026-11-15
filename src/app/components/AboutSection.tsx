"use client"

import { Heart, Users, BookOpen, PlayIcon as Pray } from "lucide-react"
import { useEffect, useRef } from "react"

const values = [
  {
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    textColor: "text-rose-600",
    title: "Amor",
    description: "Vivimos y compartimos el amor de Cristo en cada acción y palabra.",
  },
  {
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    textColor: "text-blue-600",
    title: "Comunidad",
    description: "Somos una familia unida que se apoya mutuamente en fe y vida.",
  },
  {
    icon: BookOpen,
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
    textColor: "text-violet-600",
    title: "Enseñanza",
    description: "Crecemos juntos en el conocimiento de la Palabra de Dios.",
  },
  {
    icon: Pray,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    textColor: "text-amber-600",
    title: "Oración",
    description: "La oración es el fundamento de nuestra relación con Dios.",
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
      aria-label="Quiénes somos"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #5b21b6 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-20 reveal">
          <div className="section-badge">Nuestra historia</div>
          <h2 className="section-title">
            Quiénes <span className="gradient-text">Somos</span>
          </h2>
          <p className="section-subtitle">
            Somos una comunidad cristiana comprometida con vivir y compartir el amor de
            Dios. Nuestra misión es ser una familia espiritual donde cada persona pueda
            crecer en fe, encontrar propósito y experimentar el amor incondicional de Cristo.
          </p>
        </div>

        {/* ─── Values Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <article
                key={v.title}
                className={`card-glass card-hover p-8 text-center reveal reveal-delay-${i + 1}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} text-white mb-6 shadow-lg`}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-playfair text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
              </article>
            )
          })}
        </div>

        {/* ─── Vision Banner ─── */}
        <div
          className="reveal relative overflow-hidden rounded-3xl p-10 lg:p-16 text-white text-center"
          style={{ background: "var(--gradient-brand)" }}
        >
          {/* Radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="inline-block bg-white/15 border border-white/20 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              Nuestra visión
            </div>
            <h3 className="font-playfair text-3xl lg:text-4xl font-bold mb-6 text-balance">
              Transformar vidas a través del Evangelio
            </h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ser una iglesia que transforma vidas y comunidades a través del poder del
              Evangelio, donde cada persona descubra su identidad en Cristo y su propósito
              en el Reino de Dios. Aspiramos a ser un faro de esperanza y amor en Galicia
              y más allá.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
