import type { Metadata } from 'next'
import Image from 'next/image'
import Galleria from '@/components/Galleria'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Galleria',
  description:
    'Browse photos of SR Travels fleet, journeys, and destinations. See why thousands trust us for their travels.',
}

export default function GalleriaPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1920&q=80"
          alt="SR Travels moments"
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
            Captured Moments
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light" style={{ color: 'var(--text)' }}>
            Galleria
          </h1>
        </div>
      </section>

      <Galleria />
      <Footer />
    </>
  )
}
