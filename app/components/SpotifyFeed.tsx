export default function SpotifyFeed() {
  return (
    <section id="latest-episodes" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#FFD700] mb-16">
          Latest Episodes
        </h2>
        <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-3xl p-12">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://open.spotify.com/embed/show/1ffGDEnDolncAj4xA753TA"
              width="100%"
              height="352"
              frameBorder="0"
              allow="encrypted-media"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
} 