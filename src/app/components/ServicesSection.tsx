"use client"

import { Clock, MapPin, Music, BookOpen, Users, Heart } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Culto Dominical",
      time: "Domingos 10:00 AM",
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
      time: "Sábados 6:00 PM",
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
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl p-8 lg:p-12 shadow-2xl inline-block max-w-4xl">
            <div className="flex items-center gap-3 justify-center mb-6">
              <MapPin className="w-8 h-8" />
              <h3 className="text-3xl font-bold font-playfair">Nuestra Ubicación</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Información de ubicación */}
              <div className="text-left space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3">Fe y Esperanza Galicia</h4>
                  <p className="text-lg">📍 Pereira, Risaralda</p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Fe+y+Esperanza+Galicia+Iglesia+Cristiana+-+Pereira+-+Risaralda/@4.8076317,-75.9382612,12z/data=!4m10!1m2!2m1!1sFe+y+esperanza+galicia!3m6!1s0x8e387c0a60e42dc3:0xa2c40a7cf243f88b!8m2!3d4.8076317!4d-75.8064253!15sChZGZSB5IGVzcGVyYW56YSBnYWxpY2lhkgEQY2hyaXN0aWFuX2NodXJjaKoBRxABKgYiAmZlKA4yHxABIhux_C9PzGbwOLC7rd63ECCQOTchI99OjiEyOzMyGhACIhZmZSB5IGVzcGVyYW56YSBnYWxpY2lh4AEA!16s%2Fg%2F1ptyyzk01?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
                      "_blank",
                    )
                  }
                  className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  📍 Ver en Google Maps
                </button>
              </div>

              {/* Mapa visual */}
              <div className="relative">
                <div
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Fe+y+Esperanza+Galicia+Iglesia+Cristiana+-+Pereira+-+Risaralda/@4.8076317,-75.9382612,12z/data=!4m10!1m2!2m1!1sFe+y+esperanza+galicia!3m6!1s0x8e387c0a60e42dc3:0xa2c40a7cf243f88b!8m2!3d4.8076317!4d-75.8064253!15sChZGZSB5IGVzcGVyYW56YSBnYWxpY2lhkgEQY2hyaXN0aWFuX2NodXJjaKoBRxABKgYiAmZlKA4yHxABIhux_C9PzGbwOLC7rd63ECCQOTchI99OjiEyOzMyGhACIhZmZSB5IGVzcGVyYW56YSBnYWxpY2lh4AEA!16s%2Fg%2F1ptyyzk01?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
                      "_blank",
                    )
                  }
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63421.89482827!2d-75.9382612!3d4.8076317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387c0a60e42dc3%3A0xa2c40a7cf243f88b!2sFe%20y%20Esperanza%20Galicia%20Iglesia%20Cristiana%20-%20Pereira%20-%20Risaralda!5e0!3m2!1ses!2sco!4v1640995200000!5m2!1ses!2sco"
                    width="100%"
                    height="250"
                    style={{ border: 0, borderRadius: "8px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-lg"
                  ></iframe>

                  {/* Overlay para hacer clic */}
                  <div className="absolute inset-0 bg-transparent hover:bg-white/10 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 text-orange-600 px-4 py-2 rounded-full font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                      🗺️ Abrir en Maps
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 lg:p-12 inline-block shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">¿Listo para unirte a nosotros?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              Te esperamos con los brazos abiertos en cualquiera de nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block"
              >
                Contáctanos
              </a>
              <a
                href="#galeria"
                className="border-2 border-white hover:bg-white hover:text-purple-700 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-105 inline-block"
              >
                Ver Galería
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
