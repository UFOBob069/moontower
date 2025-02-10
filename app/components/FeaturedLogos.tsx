import Image from 'next/image'

export default function FeaturedLogos() {
  const logos = [
    { src: '/logo1.jpg', alt: 'Featured Company 1', width: 150 },
    { src: '/logo2.jpg', alt: 'Featured Company 2', width: 150 },
    { src: '/logo3.jpg', alt: 'Featured Company 3', width: 150 },
    { src: '/logo4.jpg', alt: 'Featured Company 4', width: 150 },
    { src: '/logo5.jpg', alt: 'Featured Company 5', width: 150 },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Featured On The Podcast</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">

          {logos.map((logo) => (
            <div key={logo.alt} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.width * 0.6}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 