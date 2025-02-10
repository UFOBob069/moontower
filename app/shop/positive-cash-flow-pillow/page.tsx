import Image from 'next/image'
import Link from 'next/link'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#FFD700] mb-12 hover:-translate-x-1 transition-transform"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/pillow.jpg"
              alt="Premium Icahn Positive Cash Flow Pillow"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Premium Icahn Positive Cash Flow Pillow</h1>
            
            <div className="flex gap-3 items-baseline">
              <span className="text-3xl font-bold text-[#FFD700]">$39.00</span>
              <span className="text-xl text-gray-400 line-through">$49.00</span>
              <span className="text-sm bg-[#FFD700] text-gray-900 px-2 py-1 rounded">Sale</span>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                Add a stylish and inspiring touch to your space with our &quot;Positive Cash Flow&quot; pillow.
              </p>
              
              <p className="text-gray-400">
                Featuring the phrase &quot;Happiness is Positive Cash Flow&quot; embroidered in orange on a navy blue pillow, 
                it&apos;s a great reminder of financial success and the value of a balanced life.
              </p>
              
              <p className="text-gray-400">
                Whether for your home, office, or as a gift, this pillow combines comfort with a meaningful message. 
                The soft fabric and elegant design make it perfect for any room.
              </p>
            </div>

            <div className="pt-6">
              <button className="w-full bg-[#FFD700] text-gray-900 py-4 px-6 rounded-lg font-medium hover:bg-[#FFE17D] transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 