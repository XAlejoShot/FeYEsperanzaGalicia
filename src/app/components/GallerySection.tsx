"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const galleryImages = [
  {
    src: "/foto1.jpg",
    title: "Culto Dominical",
    description: "Momentos de adoración y alabanza en familia",
  },
  {
    src: "/foto2.jpg",
    title: "Bautismos",
    description: "Celebrando nuevas vidas en Cristo",
  },
  {
    src: "/foto3.jpg",
    title: "Ministerio Juvenil",
    description: "Jóvenes creciendo en fe y comunidad",
  },
  {
    src: "/foto4.jpg",
    title: "Eventos Especiales",
    description: "Celebraciones que unen a nuestra familia",
  },
  {
    src: "/foto5.jpg",
    title: "Grupos Pequeños",
    description: "Comunión íntima y crecimiento espiritual",
  },
  {
    src: "/foto6.jpg",
    title: "Actividades Familiares",
    description: "Fortaleciendo lazos en la familia de Dios",
  },
]

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const SLIDE_DURATION = 4000 // 4 segundos por imagen

  // useEffect simplificado que solo depende de isPlaying
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [isPlaying]) // Solo depende de isPlaying

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="galeria" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-800 mb-6">Nuestra Galería</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Momentos especiales que capturan la esencia de nuestra comunidad de fe. Cada imagen cuenta una historia de
            amor, esperanza y familia.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Image Display */}
          <div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Images */}
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-4xl font-bold font-playfair mb-4">{image.title}</h3>
                    <p className="text-lg md:text-xl opacity-90">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 md:p-4 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 md:p-4 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute top-4 md:top-8 right-4 md:right-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="hidden md:flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 lg:p-12 inline-block shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">¿Quieres ser parte de estos momentos?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              Te invitamos a unirte a nuestra familia y crear nuevos recuerdos juntos.
            </p>
            <a
              href="#contacto"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block"
            >
              Únete a Nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
