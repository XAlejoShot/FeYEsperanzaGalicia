"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, Expand, X } from "lucide-react"

const galleryImages = [
  {
    src: "/foto1.jpg",
    title: "Ministerio Infantil y Adolescentes",
    description: "Compartiendo en comunidad al aire libre",
  },
  {
    src: "/foto2.jpg",
    title: "Predicación de la Palabra",
    description: "Mensajes que fortalecen nuestra fe",
  },
  {
    src: "/foto3.jpg",
    title: "Celebraciones",
    description: "Momentos especiales que vivimos en familia",
  },
  {
    src: "/foto4.jpg",
    title: "Culto Principal",
    description: "Adoración y alabanza cada sábado",
  },
  {
    src: "/foto5.jpg",
    title: "Alabanza y Palabra",
    description: "Música y enseñanza para la gloria de Dios",
  },
  {
    src: "/foto6.jpg",
    title: "Nuestra Congregación",
    description: "Una familia unida en la fe",
  },
]

const SLIDE_DURATION = 5000

export default function GallerySection() {
  const [current,    setCurrent]    = useState(0)
  const [playing,    setPlaying]    = useState(true)
  const [lightbox,   setLightbox]   = useState<number | null>(null)
  const [progress,   setProgress]   = useState(0)
  const [inView,     setInView]     = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const total = galleryImages.length

  /* ─── Scroll reveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting)
            entry.target.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"))
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* ─── El carrusel solo avanza cuando la galería está en pantalla (ahorra batería) ─── */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ─── Autoplay + progress bar ─── */
  const startProgress = useCallback(() => {
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    const step = 100 / (SLIDE_DURATION / 50)
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressRef.current!); return 100 }
        return prev + step
      })
    }, 50)
  }, [])

  useEffect(() => {
    if (!playing || !inView) {
      if (intervalRef.current)  clearInterval(intervalRef.current)
      if (progressRef.current)  clearInterval(progressRef.current)
      return
    }
    startProgress()
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total)
      startProgress()
    }, SLIDE_DURATION)
    return () => {
      if (intervalRef.current)  clearInterval(intervalRef.current)
      if (progressRef.current)  clearInterval(progressRef.current)
    }
  }, [playing, inView, startProgress, total])

  /* ─── Keyboard navigation ─── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "ArrowRight") setLightbox(l => ((l ?? 0) + 1) % total)
        if (e.key === "ArrowLeft")  setLightbox(l => ((l ?? 0) - 1 + total) % total)
        if (e.key === "Escape")     setLightbox(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox, total])

  const goTo = (index: number) => {
    setCurrent(index)
    startProgress()
  }

  const prev = () => goTo((current - 1 + total) % total)
  const next = () => goTo((current + 1) % total)

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-gradient-to-b from-white to-slate-50"
      aria-label="Galería de fotos"
    >
      {/* Decorative blob */}
      <div
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Momentos especiales</div>
          <h2 className="section-title">
            Nuestra <span className="gradient-text">Galería</span>
          </h2>
          <p className="section-subtitle">
            Cada imagen cuenta una historia de amor, esperanza y familia.
            Momentos que capturan la esencia de nuestra comunidad de fe.
          </p>
        </div>

        {/* ─── Main Slider ─── */}
        <div className="reveal max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.25)] group"
            style={{ height: "clamp(280px, 55vw, 580px)" }}
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(true)}
          >
            {/* Images */}
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-all duration-[900ms] ease-in-out ${
                  i === current
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-[1.03] z-0"
                }`}
                aria-hidden={i !== current}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Caption */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-8 lg:p-12 transform transition-all duration-700 ${
                    i === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-2xl lg:text-4xl font-bold font-playfair text-white mb-2 drop-shadow-lg">
                    {img.title}
                  </h3>
                  <p className="text-base lg:text-lg text-white/80 drop-shadow">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-3 lg:p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus-visible:opacity-100"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-3 lg:p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus-visible:opacity-100"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Top controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setPlaying(!playing)}
                className="bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label={playing ? "Pausar presentación" : "Reanudar presentación"}
              >
                {playing
                  ? <Pause className="w-4 h-4" />
                  : <Play  className="w-4 h-4" />
                }
              </button>
              <button
                onClick={() => { setLightbox(current); setPlaying(false) }}
                className="bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Ver en pantalla completa"
              >
                <Expand className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/20">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-amber-400 transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-20 bg-black/30 backdrop-blur-md text-white/80 text-xs font-mono px-3 py-1.5 rounded-full">
              {current + 1} / {total}
            </div>
          </div>

          {/* ─── Dots ─── */}
          <div className="flex justify-center mt-6 gap-2" role="tablist" aria-label="Navegación de galería">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir a ${img.title}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2.5 bg-gradient-to-r from-violet-500 to-indigo-500"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* ─── Thumbnails ─── */}
          <div className="hidden md:flex justify-center mt-6 gap-3 no-scrollbar overflow-x-auto pb-2">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => goTo(i)}
                aria-label={`Ver ${img.title}`}
                className={`relative flex-shrink-0 w-[88px] h-[60px] rounded-xl overflow-hidden transition-all duration-300 ${
                  i === current
                    ? "ring-3 ring-violet-500 ring-offset-2 scale-110 shadow-lg"
                    : "opacity-50 hover:opacity-90 hover:scale-105"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="88px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div
          className="reveal mt-16 rounded-3xl p-10 lg:p-14 text-white text-center relative overflow-hidden"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold mb-3">
              ¿Quieres ser parte de estos momentos?
            </h3>
            <p className="text-white/75 mb-8 max-w-lg mx-auto">
              Te invitamos a unirte a nuestra familia y crear nuevos recuerdos juntos.
            </p>
            <a href="#contacto" className="btn-cta">
              Únete a Nosotros
            </a>
          </div>
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${galleryImages[lightbox].title}`}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-200 z-10"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
            onClick={e => { e.stopPropagation(); setLightbox(l => ((l ?? 0) - 1 + total) % total) }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
            onClick={e => { e.stopPropagation(); setLightbox(l => ((l ?? 0) + 1) % total) }}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <p className="text-lg font-bold font-playfair">{galleryImages[lightbox].title}</p>
            <p className="text-sm text-white/60">{galleryImages[lightbox].description}</p>
          </div>
        </div>
      )}
    </section>
  )
}
