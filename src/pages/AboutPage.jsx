import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutCompany from '../components/AboutCompany'
import AboutDeck from '../components/AboutDeck'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', background: 'var(--bg)' }}>
        <AboutCompany />
        <AboutDeck />
      </div>
      <Footer />
    </>
  )
}
