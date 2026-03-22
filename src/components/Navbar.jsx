import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 1. Set to TRUE so your Dark/Green theme is the default!
  const [isDarkMode, setIsDarkMode] = useState(true)
  const navigate = useNavigate()

  // 2. THE MAGIC TOGGLE: This physically changes the CSS class on the website body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  const handleNav = (targetId, path = '/') => {
    setMobileMenuOpen(false)
    navigate(path)
    setTimeout(() => {
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
  }

  const NAV_LINKS = [
    { name: 'About', id: 'about-company' },
    { name: 'Galleria', id: 'galleria' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Stories', id: 'stories' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        padding: isScrolled ? '1rem 2rem' : '1.5rem 2.5rem',
        background: isScrolled ? 'rgba(10, 9, 8, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.3s ease'
      }}>

        {/* LOGO */}
        <div
          onClick={() => handleNav(null)}
          style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
            fontWeight: 600, color: 'var(--text)', cursor: 'pointer', zIndex: 10000
          }}
        >
          SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="desktop-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.name}
              onClick={() => handleNav(link.id)}
              style={{
                background: 'none', border: 'none', color: 'var(--text)',
                fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'color 0.3s', opacity: 0.7
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.opacity = 1; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.opacity = 0.7; }}
            >
              {link.name}
            </button>
          ))}
          <button className="btn-primary" onClick={() => handleNav(null, '/destinations')} style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}>
            Book Now
          </button>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', zIndex: 10000 }}>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'rgba(150,150,150,0.1)', border: '1px solid rgba(150,150,150,0.2)',
              width: 36, height: 36, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              fontSize: '1.1rem', transition: 'background 0.3s', color: 'var(--text)'
            }}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="mobile-toggle">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '5px',
                padding: '0.5rem'
              }}
            >
              <div style={{
                width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
              }} />
              <div style={{
                width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s',
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <div style={{
                width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* FULL SCREEN MOBILE OVERLAY */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'var(--bg-darkest)', opacity: 0.98,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.name}
              onClick={() => handleNav(link.id)}
              style={{
                background: 'none', border: 'none', color: 'var(--text)',
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem',
                fontStyle: 'italic', cursor: 'pointer',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i}s`
              }}
            >
              {link.name}
            </button>
          ))}
          <div style={{
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s`,
            marginTop: '1rem'
          }}>
            <button className="btn-primary" onClick={() => handleNav(null, '/destinations')} style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Explore Destinations
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
        }
      `}</style>
    </>
  )
}