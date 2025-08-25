import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-800 via-purple-700 to-orange-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-iglesia.jpg"
              alt="Logo Fe y Esperanza Galicia"
              width={60}
              height={60}
              className="rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-playfair">Fe y Esperanza Galicia</h1>
              <p className="text-sm opacity-90 font-inter">Una Familia, Mi Familia, Nuestra Familia</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm lg:text-base font-medium">
            <Link
              href="#inicio"
              className="hover:text-yellow-300 transition-colors duration-300 hover:scale-105 transform"
            >
              Inicio
            </Link>
            <Link
              href="#nosotros"
              className="hover:text-yellow-300 transition-colors duration-300 hover:scale-105 transform"
            >
              Quiénes Somos
            </Link>
            <Link
              href="#servicios"
              className="hover:text-yellow-300 transition-colors duration-300 hover:scale-105 transform"
            >
              Servicios
            </Link>
            <Link
              href="#contacto"
              className="hover:text-yellow-300 transition-colors duration-300 hover:scale-105 transform"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
