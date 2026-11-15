"use client"

import { Clock, MapPin, Music, BookOpen, Flame, Sunrise, Video, MessageCircle, ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

const MAPS_URL =
  "https://www.google.com/maps/place/Fe+y+Esperanza+Galicia+Iglesia+Cristiana+-+Pereira+-+Risaralda/@4.8076317,-75.9382612,12z/data=!4m10!1m2!2m1!1sFe+y+esperanza+galicia!3m6!1s0x8e387c0a60e42dc3:0xa2c40a7cf243f88b!8m2!3d4.8076317!4d-75.8064253!15sChZGZSB5IGVzcGVyYW56YSBnYWxpY2lhkgEQY2hyaXN0aWFuX2NodXJjaKoBRxABKgYiAmZlKA4yHxABIhux_C9PzGbwOLC7rd63ECCQOTchI99OjiEyOzMyGhACIhZmZSB5IGVzcGVyYW56YSBnYWxpY2lh4AEA!16s%2Fg%2F1ptyyzk01?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63421.89482827!2d-75.9382612!3d4.8076317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387c0a60e42dc3%3A0xa2c40a7cf243f88b!2sFe%20y%20Esperanza%20Galicia%20Iglesia%20Cristiana%20-%20Pereira%20-%20Risaralda!5e0!3m2!1ses!2sco!4v1640995200000!5m2!1ses!2sco"

const WHATSAPP = "573237638113"
const waLink = (servicio: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero el enlace para unirme a ${servicio}.`)}`

type Service = {
  icon: typeof Music
  gradient: string
  label: "principal" | ""
  title: string
  time: string
  virtual?: boolean
  description: string
}

const services: Service[] = [
  {
    icon: Music,
    gradient: "from-indigo-500 to-blue-600",
    label: "principal",
    title: "Culto Principal",
    time: "Sábados, 6:00 – 8:00 p. m.",
    description: "Adoración, predicación y comunión en familia. Ven y experimenta la presencia de Dios.",
  },
  {
    icon: BookOpen,
    gradient: "from-violet-500 to-purple-700",
    label: "",
    title: "Estudio Bíblico",
    time: "Miércoles, 7:00 p. m.",
    description: "Profundizamos juntos en la Palabra de Dios. Un espacio para aprender y crecer.",
  },
  {
    icon: Flame,
    gradient: "from-rose-500 to-red-600",
    label: "",
    title: "Cuarto de Guerra",
    time: "Martes, 8:00 – 9:00 p. m.",
    virtual: true,
    description:
      "Una hora de oración e intercesión. Desde casa nos unimos para presentar ante Dios nuestras familias, necesidades y peticiones.",
  },
  {
    icon: Sunrise,
    gradient: "from-amber-500 to-orange-600",
    label: "",
    title: "Madrugón con Jesús",
    time: "Miércoles y viernes, 5:00 – 6:00 a. m.",
    virtual: true,
    description:
      "Empezamos el día en la presencia de Dios, con oración y la Palabra, antes de salir a nuestras labores.",
  },
]

export default function ServicesSection() {
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
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white"
      aria-label="Nuestros servicios"
    >
      {/* Decorative element */}
      <div
        className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Header ─── */}
        <div className="text-center mb-20 reveal">
          <div className="section-badge">Actividades semanales</div>
          <h2 className="section-title">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="section-subtitle">
            Te invitamos a participar. Cada encuentro es una oportunidad para crecer
            espiritualmente y fortalecer lazos en la familia de Dios.
          </p>
        </div>

        {/* ─── Services Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {services.map((service, i) => {
            const Icon = service.icon
            const isPrincipal = service.label === "principal"
            return (
              <article
                key={service.title}
                className={`reveal reveal-delay-${i + 1} relative group rounded-3xl p-8 transition-all duration-300 ${
                  isPrincipal
                    ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-[0_8px_40px_rgba(91,33,182,0.30)]"
                    : "card-glass card-hover"
                }`}
              >
                {isPrincipal && (
                  <span className="inline-block mb-4 sm:mb-0 sm:absolute sm:top-6 sm:right-6 bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Destacado
                  </span>
                )}

                <div className="flex items-start gap-5">
                  <div
                    className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl font-bold font-playfair mb-2 ${
                        isPrincipal ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <div
                      className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold mb-3 ${
                        isPrincipal ? "text-amber-300" : "text-violet-700"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        {service.time}
                      </span>
                      {service.virtual && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
                          <Video className="w-3.5 h-3.5" aria-hidden="true" />
                          Virtual
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        isPrincipal ? "text-indigo-100" : "text-slate-500"
                      }`}
                    >
                      {service.description}
                    </p>

                    {service.virtual && (
                      <a
                        href={waLink(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline-offset-4 hover:underline"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        Pide el enlace por WhatsApp
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ─── Location Card ─── */}
        <div className="reveal">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white shadow-[0_8px_40px_rgba(217,119,6,0.35)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <MapPin className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold font-playfair">Nuestra Ubicación</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
              {/* Info col */}
              <div className="lg:col-span-2 flex flex-col justify-between gap-6">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 flex-1">
                  <h4 className="text-xl font-bold mb-3">Fe y Esperanza Galicia</h4>
                  <div className="space-y-2 text-white/85 text-sm">
                    <p>Cra 15 #153-42, Galicia</p>
                    <p>Pereira, Risaralda, Colombia</p>
                  </div>
                </div>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-orange-700 font-bold py-3.5 px-6 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md"
                  aria-label="Abrir en Google Maps"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Ver en Google Maps
                </a>
              </div>

              {/* Map col */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 h-[260px] lg:h-full min-h-[220px]">
                  <iframe
                    src={MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Fe y Esperanza Galicia en Google Maps"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CTA banner ─── */}
        <div
          className="reveal mt-12 rounded-3xl p-10 lg:p-14 text-white text-center relative overflow-hidden"
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
              ¿Listo para unirte a nosotros?
            </h3>
            <p className="text-white/75 mb-8 max-w-xl mx-auto">
              Te esperamos con los brazos abiertos en cualquiera de nuestros servicios, en el templo o desde casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contacto" className="btn-cta">Contáctanos</a>
              <a href="#galeria"  className="btn-secondary">Ver Galería</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
