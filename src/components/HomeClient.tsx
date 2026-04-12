'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import OurServices from '@/components/OurServices'
import WhyChooseUs from '@/components/WhyChooseUs'
import GalleriaPreview from '@/components/GalleriaPreview'
import Testimonials from '@/components/Testimonials'
import Stats from '@/components/Stats'
import AboutPreview from '@/components/AboutPreview'
import Footer from '@/components/Footer'

export default function HomeClient() {
    const [ready, setReady] = useState(false)
    return (
        <>
            <Loader onComplete={() => setReady(true)} />
            <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s' }}>
                <Hero />
                <Marquee />
                <OurServices />
                <WhyChooseUs />
                <GalleriaPreview />
                <Testimonials />
                <Stats />
                <AboutPreview />
                <Footer />
            </div>
        </>
    )
}