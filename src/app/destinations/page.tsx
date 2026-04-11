import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getActiveRoutes } from '@/lib/supabase/client'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Explore all routes covered by SR Travels. Comfortable bus journeys to top destinations across Maharashtra.',
}

// Revalidate every 6 hours (ISR)
export const revalidate = 21600

// Fallback routes if DB is empty
const FALLBACK_ROUTES = [
  { id: 1, from_city: 'Mumbai', to_city: 'Pune', duration: '3.5 hrs', price: 350, image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80', active: true },
  { id: 2, from_city: 'Mumbai', to_city: 'Nashik', duration: '4 hrs', price: 400, image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80', active: true },
  { id: 3, from_city: 'Pune', to_city: 'Aurangabad', duration: '5 hrs', price: 500, image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', active: true },
  { id: 4, from_city: 'Mumbai', to_city: 'Nagpur', duration: '12 hrs', price: 900, image_url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80', active: true },
  { id: 5, from_city: 'Pune', to_city: 'Solapur', duration: '4.5 hrs', price: 450, image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80', active: true },
  { id: 6, from_city: 'Nashik', to_city: 'Shirdi', duration: '1.5 hrs', price: 150, image_url: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&q=80', active: true },
]

export default async function DestinationsPage() {
  const dbRoutes = await getActiveRoutes()
  const routes = dbRoutes.length > 0 ? dbRoutes : FALLBACK_ROUTES

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&q=80"
          alt="Travel destinations"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.5) 100%)' }}
        />
        <div className="relative z-10 container-sr">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Where We Go
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light" style={{ color: 'var(--text)' }}>
            Our Destinations
          </h1>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-sr">
          <p className="section-subtitle">Available Routes</p>
          <div className="accent-line" />
          <h2 className="section-title mb-12">Book Your Route</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div key={route.id} className="card-sr group overflow-hidden">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  {route.image_url ? (
                    <Image
                      src={route.image_url}
                      alt={`${route.from_city} to ${route.to_city}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full" style={{ background: 'var(--surface)' }} />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--overlay) 0%, transparent 60%)' }}
                  />
                  <span className="absolute bottom-3 left-3 badge badge-accent text-xs">
                    ₹{route.price}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-serif text-lg" style={{ color: 'var(--text)' }}>
                      {route.from_city}
                    </span>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="font-serif text-lg" style={{ color: 'var(--text)' }}>
                      {route.to_city}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {route.duration}
                    </div>

                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi! I want to book a seat from ${route.from_city} to ${route.to_city}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest font-medium transition-colors duration-200"
                      style={{ color: 'var(--accent)' }}
                    >
                      Book Now →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Don't see your route? Contact us — we may run special trips.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I need a custom route. Can you help?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ask for Custom Route
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
