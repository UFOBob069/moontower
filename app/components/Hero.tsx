import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-[#FFE17D] to-[#FFD700]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <Image
            src="/moontower-logo.jpg"
            alt="MoonTower Business Logo"
            width={200}
            height={200}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            MoonTower Business Podcast
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-8">
            Exploring the Austin business landscape through engaging conversations with entrepreneurs, executives, and innovators.
          </p>
          <a 
            href="#latest-episodes"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Listen to Latest Episode
          </a>
        </div>
      </div>
    </section>
  )
} 