import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'

export default function SocialLinks() {
  const socialLinks = [
    { icon: FaTwitter, url: 'https://twitter.com/2018Tower', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://www.instagram.com/moontower2018/', label: 'Instagram' },
    { icon: FaYoutube, url: 'https://www.youtube.com/channel/UCEt5Wrs-C1WAWRXchTxTOeg', label: 'YouTube' },
    { icon: FaFacebook, url: 'https://www.facebook.com/MoontowerBusinessPodcast2020/', label: 'Facebook' },
  ]

  return (
    <footer className="py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <link.icon className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
} 