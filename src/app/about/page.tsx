import type { Metadata } from 'next'
import Image from 'next/image'
import AboutCompany from '@/components/AboutCompany'
import AboutDeck from '@/components/AboutDeck'
import WhyChooseUs from '@/components/WhyChooseUs'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about SR Travels — our story, our team, and our commitment to safe and reliable travel since 2010.',
}

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1920&q=80"
          alt="SR Travels fleet"
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
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light" style={{ color: 'var(--text)' }}>
            About SR Travels
          </h1>
        </div>
      </section>

      <AboutCompany />
      <Stats />
      <AboutDeck />
      <WhyChooseUs />
      <Footer />
    </>
  )
}
