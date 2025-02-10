import Link from 'next/link'

export default function RelatedProjects() {
  const projects = [
    {
      title: "Bitcoin Initiatives",
      description: "Exploring the intersection of cryptocurrency and business in Austin's growing tech scene.",
      link: "https://bitcoin.org/bitcoin.pdf"
    },
    {
      title: "Vineyard Sun",
      description: "A lifestyle brand that offers unique sunglasses designed for wine enthusiasts, launched in the spring of 2017.",
      link: "https://vineyardsun.com"
    },
    {
      title: "Eagan Ventures LLC",
      description: "Strategic investment and business development firm focused on emerging technologies and innovative startups.",
      link: "https://eaganventures.com"
    }
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Related Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gray-800 p-8 rounded-lg transition-all duration-300 hover:bg-gray-800/80 hover:translate-y-[-4px]">
                <h3 className="text-2xl font-semibold mb-4 text-[#FFD700] group-hover:text-[#FFE17D]">
                  {project.title}
                </h3>
                <p className="text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4 inline-flex items-center text-[#FFD700] group-hover:translate-x-1 transition-transform">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 