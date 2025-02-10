import Link from 'next/link'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About the Podcast</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                The MoonTower Business Podcast stands at the intersection of innovation and entrepreneurship, 
                delivering unparalleled insights from the heart of Texas&apos; most dynamic business ecosystem. 
                Through in-depth conversations with industry titans, disruptive innovators, and thought leaders, 
                we explore the cutting-edge developments shaping the future of business and technology.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                With a rapidly growing audience across multiple platforms and listeners in over 50 countries, 
                we&apos;ve become a trusted voice in the business podcast landscape. Our episodes have featured 
                Fortune 500 executives, successful entrepreneurs, and innovative startups, providing actionable 
                insights and behind-the-scenes perspectives on building and scaling successful enterprises.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Host</h3>
              <p className="text-gray-600 leading-relaxed">
                Joey O&apos;Bell is a seasoned attorney, entrepreneur, and podcast host, specializing in corporate law, business strategy, and litigation. As the founder of Vineyard Sun and the host of Moontower Business Podcast, he brings a passion for business, innovation, and insightful conversations with industry leaders. With a strong legal background and a commitment to entrepreneurship, Joey continues to make an impact in law, business, and media.
              </p>
            </div>

            <div className="pt-8 flex justify-center">
              <Link
                href="mailto:marse.obell@yahoo.com; david.eagan@gmail.com"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 