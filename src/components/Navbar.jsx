import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('green') // Defaulting to Green
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'green') setTheme('warm')
    else if (theme === 'warm') setTheme('dark')
    else setTheme('green')
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        padding: isScrolled ? '1rem 2rem' : '1.5rem 2.5rem',
        background: isScrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s'
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}>
          SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={toggleTheme} style={{ background: 'rgba(150,150,150,0.1)', border: '1px solid var(--border)', width: 42, height: 42, borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>
            {theme === 'green' ? '🌲' : theme === 'warm' ? '☀️' : '🌙'}
          </button>

          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
            <div style={{ width: '24px', height: '2px', background: 'var(--text)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </div>
        </div>
      </nav>

      {/* FULL SCREEN OVERLAY */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'var(--bg-darkest)', visibility: mobileMenuOpen ? 'visible' : 'hidden', opacity: mobileMenuOpen ? 0.98 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: '0.4s' }}>
        {['about-company', 'galleria', 'why-us', 'stories'].map((id) => (
          <button key={id} onClick={() => handleNav(id)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic', margin: '1rem 0', cursor: 'pointer' }}>
            {id.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>
    </>
  )
}