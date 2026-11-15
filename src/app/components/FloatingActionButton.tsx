"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Phone, Send } from "lucide-react"

const PHONE  = "573237638113"
const WA_MSG = encodeURIComponent("¡Hola! Me gustaría conocer más sobre la iglesia Fe y Esperanza Galicia.")

export default function FloatingActionButton() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true)
      } else {
        setVisible(false)
        setIsOpen(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!mounted || !visible) return null

  const scrollToContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const openWhatsApp = () => {
    window.open(`https://wa.me/${PHONE}?text=${WA_MSG}`, "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  const actions = [
    {
      id:      "fab-contact",
      label:   "Enviar mensaje",
      icon:    <Send className="w-4 h-4" />,
      onClick: scrollToContact,
      className: "bg-indigo-600 hover:bg-indigo-500",
    },
    {
      id:      "fab-whatsapp",
      label:   "WhatsApp",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z" />
        </svg>
      ),
      onClick: openWhatsApp,
      className: "bg-emerald-500 hover:bg-emerald-400",
    },
    {
      id:      "fab-call",
      label:   "Llamar",
      icon:    <Phone className="w-4 h-4" />,
      onClick: () => { window.location.href = `tel:+${PHONE}`; setIsOpen(false) },
      className: "bg-amber-500 hover:bg-amber-400",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" aria-label="Acciones rápidas">
      {/* Action buttons */}
      <div
        id="fab-actions"
        inert={!isOpen}
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {actions.map(action => (
          <button
            key={action.id}
            id={action.id}
            onClick={action.onClick}
            className={`${action.className} text-white flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full shadow-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
            aria-label={action.label}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        id="fab-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú de acciones" : "Abrir menú de acciones"}
        aria-expanded={isOpen}
        aria-controls="fab-actions"
        className={`w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(91,33,182,0.45)] flex items-center justify-center text-white transition-all duration-300 ${
          isOpen
            ? "bg-slate-700 hover:bg-slate-600 rotate-45"
            : "bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 hover:scale-110"
        }`}
      >
        {isOpen
          ? <X size={22} aria-hidden="true" />
          : <MessageCircle size={22} aria-hidden="true" />
        }
      </button>
    </div>
  )
}
