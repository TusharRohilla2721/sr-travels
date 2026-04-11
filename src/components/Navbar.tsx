'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/galleria', label: 'Galleria' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-sr flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            SR
          </div>
          <span className="font-serif text-xl tracking-wide hidden sm:block" style={{ color: 'var(--text)' }}>
            SR Travels
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'var(--border)' }}
          >
            {theme === 'green' ? (
              <span className="text-base">🌙</span>
            ) : (
              <span className="text-base">🌿</span>
            )}
          </button>

          {/* Book Now CTA */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20SR%20Travels!%20I%20want%20to%20book%20a%20seat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex text-xs px-5 py-2"
          >
            Book Now
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--accent)' }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--accent)' }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--accent)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'var(--surface)' }}
      >
        <nav className="flex flex-col px-6 py-4 gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link text-base ${pathname === href ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20SR%20Travels!%20I%20want%20to%20book%20a%20seat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-5 py-2 self-start"
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  )
}
