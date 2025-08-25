import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
    return (
        <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-orange-700 overflow-hidden"
        >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-800/50 to-orange-700/50"></div>
        <div
            className="absolute inset-0"
            style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            }}
        ></div>

        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
            <div className="mb-8 animate-fade-in">
            <Image
                src="/logo-iglesia.jpg"
                alt="Logo Fe y Esperanza Galicia"
                width={200}
                height={200}
                className="mx-auto rounded-full shadow-2xl mb-8 hover:scale-105 transition-transform duration-500"
            />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-playfair mb-6 animate-slide-up">
            Fe y Esperanza
            <span className="block text-yellow-300">Galicia</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-4 font-light animate-slide-up animation-delay-200">
            Una Familia, Mi Familia, Nuestra Familia
            </p>

            <p className="text-lg lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-400">
            Bienvenidos a nuestra comunidad de fe, donde cada persona es valorada, amada y encuentra su lugar en la
            familia de Dios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <a
                href="#contacto"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center inline-block"
            >
                Únete a Nosotros
            </a>
            <a
                href="#nosotros"
                className="border-2 border-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 text-center inline-block"
            >
                Conoce Más
            </a>
            </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-white/70" />
        </div>
        </section>
    )
}
