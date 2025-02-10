import Image from 'next/image'
import Link from 'next/link'

export default function Merchandise() {
  const product = {
    name: "Premium Icahn Positive Cash Flow Pillow",
    image: "/pillow.jpg",
    regularPrice: 49.00,
    salePrice: 39.00,
    description: "Add a stylish and inspiring touch to your space with our &quot;Positive Cash Flow&quot; pillow.",
    shortDetails: "Featuring the phrase &quot;Happiness is Positive Cash Flow&quot; embroidered in orange on a navy blue pillow, it&apos;s a great reminder of financial success and the value of a balanced life."
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#FFD700] mb-16">
          MoonTower Shop
        </h2>
        <div className="max-w-4xl mx-auto">
          <Link 
            href="https://vineyardsun.com/products/premium-icahn-happiness-is-positive-cashflow-decorative-pillow"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-gray-800/60">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex gap-3 items-baseline">
                    <span className="text-2xl font-bold text-[#FFD700]">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.regularPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-[#FFD700] font-medium">Sale</span>
                  </div>
                  <p className="text-gray-300">{product.description}</p>
                  <p className="text-gray-400 text-sm">{product.shortDetails}</p>
                  <div className="inline-flex items-center text-[#FFD700] font-medium group-hover:translate-x-1 transition-transform">
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 