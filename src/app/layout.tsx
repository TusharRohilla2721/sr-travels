import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import WaFloat from '@/components/WaFloat'

export const metadata: Metadata = {
  title: {
    default: 'SR Travels — Affordable & Reliable Travel',
    template: '%s | SR Travels',
  },
  description:
    'SR Travels offers comfortable, affordable, and reliable bus travel across major routes. Book your seat today.',
  keywords: ['SR Travels', 'bus travel', 'affordable travel', 'comfortable journey', 'travel booking'],
  openGraph: {
    title: 'SR Travels — Affordable & Reliable Travel',
    description: 'Comfortable and reliable travel experiences at the best prices.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SR Travels',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="theme-green">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <WaFloat />
        </ThemeProvider>
      </body>
    </html>
  )
}
