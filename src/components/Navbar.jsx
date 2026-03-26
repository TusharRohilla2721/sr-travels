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

        .nav-container { padding: 1.5rem 2.5rem; }
        .nav-container.scrolled { padding: 1rem 2rem; border-bottom: 1px solid var(--border); }
        .nav-logo { font-size: 1.8rem; }
        
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
      <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: isScrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s'
      }}>
        <div className="nav-logo" onClick={() => handleNav('/', null)} style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: 'var(--text)', cursor: 'pointer', zIndex: 2 }}>
          SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
        </div>

        {/* DESKTOP NAV */}
        <div className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link.label} className="desktop-nav-link" onClick={() => handleNav(link.path, link.hash)}>
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 2 }}>
          <button onClick={toggleTheme} style={{ background: 'rgba(150,150,150,0.1)', border: '1px solid var(--border)', width: 42, height: 42, borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </button>

          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </div>
        </div>
      </nav>

      {/* FULL SCREEN OVERLAY */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998, background: 'var(--bg-darkest)',
        visibility: mobileMenuOpen ? 'visible' : 'hidden', opacity: mobileMenuOpen ? 0.98 : 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: '0.4s'
      }}>
        {NAV_LINKS.map((link) => (
          <button key={link.label} onClick={() => handleNav(link.path, link.hash)} style={{
            background: 'none', border: 'none', color: 'var(--text)',
            fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic',
            margin: '1rem 0', cursor: 'pointer'
          }}>
            {link.label}
          </button>
        ))}
      </div>
    </>
  )
}