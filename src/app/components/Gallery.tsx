import Image from "next/image"

const Gallery = () => {
  return (
    <section id="galeria" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Nuestra Galería</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image 1 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery1.jpg"
              alt="Gallery Image 1"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Image 2 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery2.jpg"
              alt="Gallery Image 2"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Image 3 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery3.jpg"
              alt="Gallery Image 3"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Image 4 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery4.jpg"
              alt="Gallery Image 4"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Image 5 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery5.jpg"
              alt="Gallery Image 5"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Image 6 */}
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/gallery6.jpg"
              alt="Gallery Image 6"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <p className="text-lg text-gray-700 mb-6">¿Listo para unirte a nuestra comunidad?</p>
          <a
            href="#contacto"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block"
          >
            Únete a Nosotros
          </a>
        </div>
      </div>
    </section>
  )
}

export default Gallery
