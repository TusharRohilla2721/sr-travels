import type { Metadata } from 'next'
import Galleria from '@/components/Galleria'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Galleria — SR Travels',
  description: 'Browse photos of SR Travels fleet, journeys, team and destinations. See why thousands trust us for their travels.',
  alternates: { canonical: 'https://srtravels.in/galleria' },
}

export default function GalleriaPage() {
  return (
    <>
      <div style={{ paddingTop: '80px', background: 'var(--bg-darkest)' }}>
        <Galleria />
      </div>
      <Footer />
    </>
  )
}