import { useState } from 'react'
import Cursor       from '../components/Cursor'
import Loader       from '../components/Loader'
import Navbar       from '../components/Navbar'
import WaFloat      from '../components/WaFloat'
import CreatorCard  from '../components/CreatorCard'
import Hero         from '../components/Hero'
import Marquee      from '../components/Marquee'
import AboutCompany from '../components/AboutCompany'
import AboutDeck    from '../components/AboutDeck'
import Galleria     from '../components/Galleria'
import WhyChooseUs  from '../components/WhyChooseUs'
import Stats        from '../components/Stats'
import Testimonials from '../components/Testimonials'
import ExploreCTA   from '../components/ExploreCTA'
import Footer       from '../components/Footer'

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <WaFloat />
      <CreatorCard />
      <Loader onComplete={() => setReady(true)} />

      {}
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Navbar />
        <Hero />
        <Marquee />
        <AboutCompany />
        <AboutDeck />
        <Galleria />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <ExploreCTA />
        <Footer />
      </div>
    </>
  )
}
