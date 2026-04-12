import type { Metadata } from 'next'
import HomeClient from '@/components/HomeClient'

export const metadata: Metadata = {
  title: 'SR Travels — Affordable & Reliable Travel Since 2012',
  description: 'SR Travels offers comfortable, affordable and reliable bus travel across NCR and All India. Employee transport, tourist buses, honeymoon packages. Book via WhatsApp.',
  alternates: { canonical: 'https://srtravels.in' },
}

export default function HomePage() {
  return <HomeClient />
}