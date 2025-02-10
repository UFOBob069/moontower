import Hero from './components/Hero'
import About from './components/About'
import ListenNow from './components/ListenNow'
import SpotifyFeed from './components/SpotifyFeed'
import Team from './components/Team'
import FeaturedLogos from './components/FeaturedLogos'
import RelatedProjects from './components/RelatedProjects'
import Merchandise from './components/Merchandise'
import SocialLinks from './components/SocialLinks'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ListenNow />
      <SpotifyFeed />
      <Team />
      <FeaturedLogos />
      <RelatedProjects />
      <Merchandise />
      <SocialLinks />
    </main>
  )
} 