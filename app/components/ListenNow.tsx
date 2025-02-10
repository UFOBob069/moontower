import { 
  FaSpotify, 
  FaApple, 
  FaGoogle, 
  FaYoutube, 
  FaRss 
} from 'react-icons/fa'

export default function ListenNow() {
  const platforms = [
    {
      name: 'Spotify',
      icon: FaSpotify,
      url: 'https://open.spotify.com/show/1ffGDEnDolncAj4xA753TA',
      color: 'hover:text-[#FFD700]'
    },
    {
      name: 'Apple Podcasts',
      icon: FaApple,
      url: 'https://podcasts.apple.com/id1507993317',
      color: 'hover:text-[#FFD700]'
    },
    {
      name: 'Google Podcasts',
      icon: FaGoogle,
      url: 'https://podcasts.google.com/YOUR_GOOGLE_ID',
      color: 'hover:text-[#FFD700]'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://www.youtube.com/@moontowerbusinesspodcast9156',
      color: 'hover:text-[#FFD700]'
    },
    {
      name: 'RSS Feed',
      icon: FaRss,
      url: 'https://anchor.fm/s/140e55d8/podcast/rss',
      color: 'hover:text-[#FFD700]'
    }
  ]

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-white mb-20">
          Listen Now
        </h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center text-white transition-all duration-300 hover:scale-110 ${platform.color}`}
              >
                <platform.icon className="w-24 h-24 mb-4" />
                <span className="text-lg font-medium whitespace-nowrap">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 