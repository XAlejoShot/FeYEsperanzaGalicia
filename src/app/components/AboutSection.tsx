import { Heart, Users, BookOpen, PlayIcon as Pray } from "lucide-react"

export default function AboutSection() {
    const values = [
        {
        icon: <Heart className="w-12 h-12" />,
        title: "Amor",
        description: "Vivimos y compartimos el amor de Cristo en cada acción y palabra.",
        },
        {
        icon: <Users className="w-12 h-12" />,
        title: "Comunidad",
        description: "Somos una familia unida que se apoya mutuamente en fe y vida.",
        },
        {
        icon: <BookOpen className="w-12 h-12" />,
        title: "Enseñanza",
        description: "Crecemos juntos en el conocimiento de la Palabra de Dios.",
        },
        {
        icon: <Pray className="w-12 h-12" />,
        title: "Oración",
        description: "La oración es el fundamento de nuestra relación con Dios.",
        },
    ]
    
    return (
    <section id="nosotros" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-800 mb-6">Quiénes Somos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Somos una comunidad cristiana comprometida con vivir y compartir el amor de Dios. Nuestra misión es ser una
                familia espiritual donde cada persona pueda crecer en fe, encontrar propósito y experimentar el amor
                incondicional de Cristo.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                    {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
            ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold font-playfair mb-6">Nuestra Visión</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                En el cumplimiento de la Misión somos una iglesia dinámica, estructurada y reflexiva, sólida en la doctrina Bíblica, con un alto concepto de su liderazgo, organizada y transparente, íntegra en sus relaciones interpersonales, abierta a los cambios, que contextualiza su desarrollo a la par del entorno sociocultural para percibir, interpretar y responder a las necesidades espirituales, morales y materiales de la sociedad, a la luz de los principios establecidos en las Sagradas Escrituras. 
            </p>
            </div>
        </div>
    </section>
    )
}
