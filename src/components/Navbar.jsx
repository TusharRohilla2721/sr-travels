import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'EXPLORE', path: '/destinations' },
  { label: 'GALLERIA', path: '/galleria' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme, icon } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const handleNav = (path, hashId) => {
    setMobileMenuOpen(false)
    if (location.pathname !== path) {
      navigate(path)
      if (hashId) {
        setTimeout(() => {
          document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    } else {
      if (hashId) {
        document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const THEME_LABELS = { green: 'Switch to warm theme', warm: 'Switch to dark theme', dark: 'Switch to green theme' }

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; gap: 2rem; align-items: center; justify-content: center; position: absolute; left: 50%; transform: translateX(-50%); }
        .mobile-toggle { display: none !important; }
        .desktop-nav-link { 
          background: none; border: none; color: var(--text); 
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; 
          font-weight: 500; letter-spacing: 0.15em; cursor: pointer; 
          transition: color 0.3s;
        }
        .desktop-nav-link:hover { color: var(--accent); }
        .desktop-nav-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 2px; }

        .nav-container { padding: 1.5rem 2.5rem; }
        .nav-container.scrolled { padding: 1rem 2rem; border-bottom: 1px solid var(--border); }
        .nav-logo { font-size: 1.8rem; }
        
        /* Accessible focus styles */
        .nav-icon-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
        
        @media (max-width: 960px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: flex !important; }
        }
        @media (max-width: 768px) {
          .nav-container { padding: 1rem 1.2rem; }
          .nav-container.scrolled { padding: 0.8rem 1.2rem; }
          .nav-logo { font-size: 1.4rem; }
        }
      `}</style>

      <nav
        className={`nav-container ${isScrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: isScrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s'
        }}
      >
        {/* Home logo */}
        <a
          href="/"
          className="nav-logo"
          onClick={e => { e.preventDefault(); handleNav('/', null) }}
          aria-label="SR Travels — go to homepage"
          style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 600,
            color: 'var(--text)', textDecoration: 'none', zIndex: 2
          }}
        >
          SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
        </a>

        {/* Desktop options */}
        <div className="desktop-nav" role="list">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              className="desktop-nav-link"
              role="listitem"
              onClick={() => handleNav(link.path, link.hash)}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 2 }}>
          {/* Theme toggle */}
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label={THEME_LABELS[theme]}
            title={THEME_LABELS[theme]}
            style={{
              background: 'rgba(150,150,150,0.1)', border: '1px solid var(--border)',
              width: 42, height: 42, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {icon}
          </button>

          {/* Hamburger icon */}
          <button
            className="mobile-toggle nav-icon-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-overlay"
            style={{ cursor: 'pointer', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', padding: '4px' }}
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998, background: 'var(--bg-darkest)',
          visibility: mobileMenuOpen ? 'visible' : 'hidden', opacity: mobileMenuOpen ? 0.98 : 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: '0.4s'
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNav(link.path, link.hash)}
            aria-current={location.pathname === link.path ? 'page' : undefined}
            style={{
              background: 'none', border: 'none', color: 'var(--text)',
              fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic',
              margin: '1rem 0', cursor: 'pointer',
              textDecoration: location.pathname === link.path ? 'underline' : 'none',
              textUnderlineOffset: '4px'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  )
}