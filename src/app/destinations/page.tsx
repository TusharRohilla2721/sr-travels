import type { Metadata } from 'next'
import DestinationsClient from '@/components/DestinationsClient'

export const metadata: Metadata = {
  title: 'Destinations & Routes — SR Travels',
  description: 'Explore all bus routes covered by SR Travels. Get instant price estimates for 7, 12, 16, 20, 26 and 42 seater vehicles. Delhi, Jaipur, Agra, Chandigarh and more.',
  alternates: { canonical: 'https://srtravels.in/destinations' },
}

export default function DestinationsPage() {
  return <DestinationsClient />
}