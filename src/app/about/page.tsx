import type { Metadata } from 'next'
import AboutCompany from '@/components/AboutCompany'
import AboutDeck from '@/components/AboutDeck'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us — SR Travels',
  description: 'Learn about SR Travels — founded by Sunder Rohilla in 2012, built on trust, discipline and integrity. Meet the founder and CEO behind 25+ years of reliable travel.',
  alternates: { canonical: 'https://srtravels.in/about' },
}

export default function AboutPage() {
  return (
    <>
      <div style={{ paddingTop: '80px', background: 'var(--bg)' }}>
        <AboutCompany />
        <AboutDeck />
      </div>
      <Footer />
    </>
  )
}