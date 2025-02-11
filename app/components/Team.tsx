import Image from 'next/image'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Team() {
  const teamMembers = [
    {
      name: "Joseph O'Bell",
      role: "Host & Executive Producer",
      image: "/joey.jpg",
      bio: "An attorney and entrepreneur bringing unique perspectives on both legal and business aspects of entrepreneurship. General Counsel for American Metals Recovery and Recycling Inc. and Multiband Global.",
      social: {
        linkedin: "https://www.linkedin.com/in/joseph-o-bell-2451621b/",
        twitter: "https://x.com/NY_TX_Lawyer"
      }
    },
    {
      name: "David Eagan",
      role: "Co-Founder & Producer",
      image: "/davod.jpg",
      bio: "Senior Executive with 16+ years of experience in Commercial Operations & Strategic Leadership. Proven track record of driving financial performance and innovation in tech, e-commerce, and financial services sectors.",
      social: {
        linkedin: "https://www.linkedin.com/in/davidroberteagan/",
        twitter: "https://x.com/Eagan218"
      }
    },
    {
      name: "Aaron Moises",
      role: "Editor & Producer",
      image: "/aaron.jpg",
      bio: "Skilled audio producer and editor bringing professional polish to each episode. Ensures high-quality production standards and engaging content delivery for our listeners.",
      social: {
        linkedin: "https://www.linkedin.com/in/aaron-moises/",
        twitter: "https://twitter.com/aaronmoises"
      }
    }
  ]

  return (
    <section id="team" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-400">The voices behind MoonTower Business</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member.name}
              className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-gray-800/60"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative rounded-full overflow-hidden ring-2 ring-[#FFD700]/60 group-hover:ring-[#FFD700] transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2 group-hover:scale-105 transition-transform">
                  {member.name}
                </h3>
                <p className="text-gray-300 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-center leading-relaxed mb-6">
                  {member.bio}
                </p>
                <div className="flex gap-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFD700] transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFD700] transition-colors"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 