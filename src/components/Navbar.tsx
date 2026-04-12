'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'EXPLORE', path: '/destinations' },
  { label: 'GALLERIA', path: '/galleria' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { toggleTheme, icon } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menuOpen])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: isScrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isScrolled ? '1rem 2rem' : '1.5rem 2.5rem',
          transition: '0.3s',
        }}
      >
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', fontSize: '1.8rem', zIndex: 2 }}>
          SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.path} style={{ background: 'none', border: 'none', color: pathname === link.path ? 'var(--accent)' : 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.15em', textDecoration: 'none', transition: 'color 0.3s' }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 2 }}>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ background: 'rgba(150,150,150,0.1)', border: '1px solid var(--border)', width: 42, height: 42, borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} style={{ cursor: 'pointer', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', padding: '4px', display: 'none' }} className="mobile-toggle">
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </button>
        </div>
      </nav>

      <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'var(--bg-darkest)', visibility: menuOpen ? 'visible' : 'hidden', opacity: menuOpen ? 0.98 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: '0.4s' }}>
        {NAV_LINKS.map(link => (
          <Link key={link.label} href={link.path} style={{ color: 'var(--text)', fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic', margin: '1rem 0', textDecoration: pathname === link.path ? 'underline' : 'none', textUnderlineOffset: '4px' }}>
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-toggle { display: none !important; }
        @media (max-width: 960px) { .desktop-nav { display: none !important; } .mobile-toggle { display: flex !important; } }
        @media (max-width: 768px) { nav { padding: 1rem 1.2rem !important; } }
      `}</style>
    </>
  )
}