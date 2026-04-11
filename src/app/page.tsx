import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import AboutCompany from '@/components/AboutCompany'
import OurServices from '@/components/OurServices'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SR Travels — Affordable & Reliable Travel',
  description:
    'SR Travels offers comfortable, affordable, and reliable bus travel across major routes. Book your seat via WhatsApp today.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutCompany />
      <OurServices />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Footer />
    </>
  )
}
