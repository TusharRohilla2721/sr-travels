import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Galleria from '../components/Galleria'
import Footer from '../components/Footer'

export default function GalleriaPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', background: 'var(--bg-darkest)' }}>
        <Galleria />
      </div>
      <Footer />
    </>
  )
}
