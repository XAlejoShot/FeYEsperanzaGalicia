import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "#inicio",    label: "Inicio"        },
  { href: "#nosotros",  label: "Quiénes Somos" },
  { href: "#servicios", label: "Servicios"      },
  { href: "#galeria",   label: "Galería"        },
  { href: "#contacto",  label: "Contacto"       },
]

export default function Footer() {
  return (
    <footer className="bg-[#080c1a] text-white" role="contentinfo">
      {/* Top accent */}
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, #1e3a8a, #5b21b6, #7c3aed, #d97706)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo-iglesia.jpg"
                alt="Logo Fe y Esperanza Galicia"
                width={52}
                height={52}
                className="rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="font-bold text-lg font-playfair leading-tight">Fe y Esperanza</p>
                <p className="text-amber-400 text-sm font-semibold">Galicia</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-[22ch]">
              Una comunidad de fe, amor y esperanza. Una Familia, Mi Familia, Nuestra Familia.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/feyesperanzagaliciaoficial?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-blue-600 transition-all duration-200 hover:scale-110"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/fe_y_esperanza_galicia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@iglesia.fe.y.espe1?_t=ZS-8wxTPpPW9nU&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-slate-700 transition-all duration-200 hover:scale-110"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav col */}
          <nav aria-label="Navegación del pie de página">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-5">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+573237638113"
                  className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" aria-hidden="true" />
                  +57 323 763 8113
                </a>
              </li>
              <li>
                <a
                  href="mailto:feyesperanzagalicia@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" aria-hidden="true" />
                  feyesperanzagalicia@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" aria-hidden="true" />
                <span>Cra 15 #153-42, Galicia<br />Pereira, Risaralda</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} Fe y Esperanza Galicia. Todos los derechos reservados.
            {" · "}
            <a href="/privacidad" className="underline hover:text-white">Aviso de privacidad</a>
          </p>
          <p className="text-white/60 text-xs">
            Hecho para la gloria de Dios
          </p>
        </div>
      </div>
    </footer>
  )
}
