import { Clock, MapPin, Music, BookOpen, Users, Heart } from "lucide-react"

export default function ServicesSection() {
    const services = [
    {
        icon: <Music className="w-8 h-8" />,
        title: "Culto Dominical",
        time: "Domingos 09:00 AM",
        description: "Adoración, predicación y comunión familiar",
    },
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Estudio Bíblico",
        time: "Miércoles 7:00 PM",
        description: "Profundizamos en la Palabra de Dios juntos",
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Grupos Pequeños",
        time: "Viernes 7:30 PM",
        description: "Comunión íntima y crecimiento espiritual",
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Ministerio Juvenil",
        time: "Sábados 7:00 PM",
        description: "Espacio especial para jóvenes y adolescentes",
    },
]

    return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-800 mb-6">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Te invitamos a participar en nuestras actividades semanales. Cada encuentro es una oportunidad para crecer
                espiritualmente y fortalecer lazos familiares.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {services.map((service, index) => (
                <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-lg flex-shrink-0">
                    {service.icon}
                    </div>
                    <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 font-playfair">{service.title}</h3>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3">
                        <Clock className="w-4 h-4" />
                        {service.time}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl p-8 inline-block">
                <div className="flex items-center gap-3 justify-center mb-4">
                <MapPin className="w-6 h-6" />
                <h3 className="text-2xl font-bold font-playfair">Ubicación</h3>
                </div>
                <p className="text-lg">Nos reunimos en el corazón de Galicia</p>
                <p className="text-sm opacity-90 mt-2">Dirección exacta disponible por contacto</p>
            </div>
            </div>
        </div>
    </section>
    )
}
