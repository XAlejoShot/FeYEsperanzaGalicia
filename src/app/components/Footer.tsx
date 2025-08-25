import Image from "next/image"

export default function Footer() {
    return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center">
            <Image
                src="/logo-iglesia.jpg"
                alt="Logo Fe y Esperanza Galicia"
                width={80}
                height={80}
                className="rounded-full mb-4"
            />
            <h3 className="text-2xl font-bold font-playfair mb-2">Fe y Esperanza Galicia</h3>
            <p className="text-gray-400 mb-6">Una Familia, Mi Familia, Nuestra Familia</p>
            <div className="border-t border-gray-700 pt-6 w-full">
                <p className="text-gray-400 text-sm">© 2025 Fe y Esperanza Galicia. Todos los derechos reservados.</p>
                <p className="text-gray-500 text-xs mt-2">Hecho con ❤️ para la gloria de Dios</p>
            </div>
            </div>
        </div>
    </footer>
    )
}
