"use client"

import { useState, useRef, useEffect } from "react"
import {
  Phone, Mail, MapPin, Clock,
  Facebook, Instagram, Send, CheckCircle2, AlertCircle,
} from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    gradient: "from-amber-500 to-orange-600",
    title: "Teléfono",
    line1: "+57 323 763 8113",
    line2: "Disponible de lunes a viernes",
    href: "tel:+573237638113",
  },
  {
    icon: Mail,
    gradient: "from-blue-500 to-indigo-600",
    title: "Email",
    line1: "feyesperanzagalicia@gmail.com",
    line2: "Respuesta en 24 horas",
    href: "mailto:feyesperanzagalicia@gmail.com",
  },
  {
    icon: MapPin,
    gradient: "from-emerald-500 to-teal-600",
    title: "Dirección",
    line1: "Cra 15 #153-42, Galicia",
    line2: "Pereira, Risaralda",
    href: "https://maps.google.com/?q=Fe+y+Esperanza+Galicia+Pereira",
  },
  {
    icon: Clock,
    gradient: "from-violet-500 to-purple-700",
    title: "Horario de Oficina",
    line1: "Lunes a viernes: 9:00 a. m. – 6:00 p. m.",
    line2: "Sábados: 10:00 a. m. – 2:00 p. m.",
    href: null,
  },
]

type Status = "idle" | "sending" | "sent" | "error"
type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>

const LIMITS = { nameMin: 2, nameMax: 80, emailMax: 254, messageMin: 10, messageMax: 2000 }

export default function ContactSection() {
  const [status,      setStatus]      = useState<Status>("idle")
  const [error,       setError]       = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const sectionRef    = useRef<HTMLElement>(null)
  const submittingRef = useRef(false)          // evita doble envío por doble clic
  const startedAtRef  = useRef<number>(0)      // antispam: momento en que se mostró el formulario

  const loading = status === "sending"

  /* Email regex — acepta dominios reales (.com .co .net .org .edu etc.) */
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())

  useEffect(() => { startedAtRef.current = Date.now() }, [])

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

  const validate = (name: string, email: string, message: string, consent: boolean): FieldErrors => {
    const errs: FieldErrors = {}
    if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax)
      errs.name = `Escribe tu nombre (entre ${LIMITS.nameMin} y ${LIMITS.nameMax} caracteres).`
    if (!isValidEmail(email) || email.length > LIMITS.emailMax)
      errs.email = "Ingresa un correo válido (ej: nombre@gmail.com, nombre@outlook.com)"
    if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax)
      errs.message = `El mensaje debe tener entre ${LIMITS.messageMin} y ${LIMITS.messageMax} caracteres.`
    if (!consent)
      errs.consent = "Para enviar el mensaje debes autorizar el tratamiento de tus datos."
    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submittingRef.current) return

    const form     = e.currentTarget
    const formData = new FormData(form)
    const name     = String(formData.get("name") ?? "").trim()
    const email    = String(formData.get("email") ?? "").trim()
    const message  = String(formData.get("message") ?? "").trim()
    const consent  = formData.get("consent") === "on"

    const errs = validate(name, email, message, consent)
    setFieldErrors(errs)
    setError("")
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    submittingRef.current = true
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          consent,
          website:   String(formData.get("website") ?? ""),
          startedAt: startedAtRef.current,
        }),
      })

      let data: { ok?: boolean; error?: string } = {}
      try { data = await res.json() } catch { /* respuesta no JSON */ }

      if (res.ok && data.ok) {
        form.reset()
        setStatus("sent")
      } else {
        setError(data.error || "No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.")
        setStatus("error")
      }
    } catch {
      setError("No hay conexión con el servidor. Revisa tu internet e intenta de nuevo; tu mensaje sigue escrito.")
      setStatus("error")
    } finally {
      submittingRef.current = false
    }
  }

  const resetForm = () => {
    startedAtRef.current = Date.now()
    setFieldErrors({})
    setError("")
    setStatus("idle")
  }

  const clearFieldError = (field: keyof FieldErrors) =>
    setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev))

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/45 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      aria-label="Contáctanos"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #5b21b6 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Estamos aquí para ti
          </div>
          <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 leading-tight">
            Contáctanos
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">
            No dudes en comunicarte con nosotros para cualquier consulta,
            petición de oración, o si deseas conocer más sobre nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── Contact info ─── */}
          <div className="space-y-5 reveal">
            {contactInfo.map(item => {
              const Icon = item.icon
              const sharedCls = `flex items-start gap-5 p-6 rounded-2xl bg-white/6 border border-white/10 transition-all duration-300`
              const inner = (
                <>
                  <div className={`flex-shrink-0 p-3.5 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1 font-playfair">{item.title}</h3>
                    <p className="text-white/75 text-sm">{item.line1}</p>
                    <p className="text-white/45 text-xs mt-0.5">{item.line2}</p>
                  </div>
                </>
              )

              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`${sharedCls} hover:bg-white/10 hover:border-white/20 cursor-pointer`}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.title} className={sharedCls}>
                  {inner}
                </div>
              )
            })}

            {/* Social links */}
            <div className="pt-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 font-playfair">
                Síguenos en redes
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/feyesperanzagaliciaoficial?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Fe y Esperanza Galicia"
                  className="flex items-center gap-3 bg-blue-600/80 hover:bg-blue-500 px-5 py-3 rounded-2xl text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/fe_y_esperanza_galicia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Fe y Esperanza Galicia"
                  className="flex items-center gap-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-5 py-3 rounded-2xl text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@iglesia.fe.y.espe1?_t=ZS-8wxTPpPW9nU&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de Fe y Esperanza Galicia"
                  className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 px-5 py-3 rounded-2xl text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* ─── Form ─── */}
          <div className="reveal reveal-delay-2">
            <div className="relative bg-white/8 backdrop-blur-xl border border-white/12 rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold font-playfair text-white mb-8">
                Envíanos un Mensaje
              </h3>

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4" role="status" aria-live="polite">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" strokeWidth={1.5} aria-hidden="true" />
                  <h4 className="text-xl font-bold text-white font-playfair">¡Mensaje enviado!</h4>
                  <p className="text-white/70 text-sm max-w-xs">
                    Recibimos tu mensaje y lo enviamos al correo de la iglesia. Te responderemos lo antes posible.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 text-amber-400 text-sm hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-describedby="contact-required-note">
                  <p id="contact-required-note" className="text-white/70 text-xs -mt-4">
                    Los campos con <span className="text-amber-400" aria-hidden="true">*</span> son obligatorios.
                  </p>

                  <div>
                    <label htmlFor="contact-name" className="block text-white/80 text-sm font-medium mb-2">
                      Nombre completo <span className="text-amber-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      minLength={LIMITS.nameMin}
                      maxLength={LIMITS.nameMax}
                      onChange={() => clearFieldError("name")}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                      className={`${inputCls} ${fieldErrors.name ? "border-red-400 ring-1 ring-red-400" : ""}`}
                      placeholder="Tu nombre"
                    />
                    {fieldErrors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-red-300 text-xs flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-white/80 text-sm font-medium mb-2">
                      Correo electrónico <span className="text-amber-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      maxLength={LIMITS.emailMax}
                      onChange={() => clearFieldError("email")}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      className={`${inputCls} ${fieldErrors.email ? "border-red-400 ring-1 ring-red-400" : ""}`}
                      placeholder="tu@gmail.com · tu@outlook.com"
                    />
                    {fieldErrors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-red-300 text-xs flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-white/80 text-sm font-medium mb-2">
                      Mensaje <span className="text-amber-400" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      minLength={LIMITS.messageMin}
                      maxLength={LIMITS.messageMax}
                      onChange={() => clearFieldError("message")}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={`contact-message-hint${fieldErrors.message ? " contact-message-error" : ""}`}
                      className={`${inputCls} resize-none ${fieldErrors.message ? "border-red-400 ring-1 ring-red-400" : ""}`}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                    <p id="contact-message-hint" className="mt-1.5 text-white/70 text-xs">
                      Compartir peticiones de oración, temas de salud u otra información personal es opcional.
                      Escribe solo lo que quieras que lea el equipo de la iglesia.
                    </p>
                    {fieldErrors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-red-300 text-xs flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Campo trampa antispam: invisible para personas, los robots lo llenan */}
                  <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-website">No llenes este campo</label>
                    <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="contact-consent"
                        type="checkbox"
                        name="consent"
                        required
                        onChange={() => clearFieldError("consent")}
                        aria-invalid={!!fieldErrors.consent}
                        aria-describedby={fieldErrors.consent ? "contact-consent-error" : undefined}
                        className="mt-1 w-4 h-4 flex-shrink-0 accent-amber-500 cursor-pointer"
                      />
                      <label htmlFor="contact-consent" className="text-white/80 text-xs leading-relaxed cursor-pointer">
                        Autorizo a Fe y Esperanza Galicia a tratar mis datos (nombre, correo y lo que escriba en el mensaje,
                        incluida información sensible si decido compartirla) solo para responder mi mensaje, según el{" "}
                        <a href="/privacidad" className="text-amber-400 underline hover:text-amber-300">aviso de privacidad</a>.{" "}
                        <span className="text-amber-400" aria-hidden="true">*</span>
                      </label>
                    </div>
                    {fieldErrors.consent && (
                      <p id="contact-consent-error" className="mt-1.5 text-red-300 text-xs flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {fieldErrors.consent}
                      </p>
                    )}
                  </div>

                  <div aria-live="polite" className="sr-only">
                    {loading ? "Enviando tu mensaje…" : ""}
                  </div>

                  {error && (
                    <div role="alert" className="flex items-start gap-3 bg-red-500/15 border border-red-500/30 text-red-200 text-sm px-4 py-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(217,119,6,0.45)] shadow-md"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
