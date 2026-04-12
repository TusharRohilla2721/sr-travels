import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import WaFloat from '@/components/WaFloat'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://srtravels.in'),
  title: {
    default: 'SR Travels — Affordable & Reliable Travel Since 2012',
    template: '%s | SR Travels',
  },
  description:
    'SR Travels offers comfortable, affordable and reliable bus travel across NCR and All India. Employee transport, tourist buses, honeymoon packages and more. Book via WhatsApp instantly.',
  keywords: [
    'SR Travels', 'bus travel India', 'employee transport Gurgaon', 'tourist bus NCR',
    'affordable travel', 'Gurgaon travels', 'All India permit bus', 'Sunder Rohilla',
    'bus booking WhatsApp', 'luxury bus rental Delhi', 'group travel India',
  ],
  authors: [{ name: 'SR Travels', url: 'https://srtravels.in' }],
  creator: 'SR Travels',
  publisher: 'SR Travels',
  openGraph: {
    title: 'SR Travels — Affordable & Reliable Travel Since 2012',
    description: 'Comfortable, reliable and affordable travel across NCR and All India. Employee transport, tourist buses, honeymoon packages.',
    url: 'https://srtravels.in',
    siteName: 'SR Travels',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_1200/v1774172216/WhatsApp_Image_2026-03-06_at_12.21.52_AM_ixi0oh.jpg',
        width: 1200,
        height: 630,
        alt: 'SR Travels Fleet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SR Travels — Affordable & Reliable Travel',
    description: 'Comfortable bus travel across NCR and All India. Book via WhatsApp.',
    images: ['https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_1200/v1774172216/WhatsApp_Image_2026-03-06_at_12.21.52_AM_ixi0oh.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://srtravels.in' },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'SR Travels',
  description: 'Affordable and reliable bus travel across NCR and All India since 2012.',
  url: 'https://srtravels.in',
  telephone: '+919289694400',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 1, Ganpati Complex, Atul Kataria Chowk, Opposite Huda Nursery',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.4595, longitude: 77.0266 },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  sameAs: ['https://instagram.com/srtravels_official', 'https://linkedin.com/company/sr-travels'],
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="green">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_1200/v1774172216/WhatsApp_Image_2026-03-06_at_12.21.52_AM_ixi0oh.jpg"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <WaFloat />
        </ThemeProvider>
      </body>
    </html>
  )
}