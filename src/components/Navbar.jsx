import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../hooks/useTheme'
gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef(null)
  const { icon, cycle } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 })
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: () => {
        if (navRef.current) navRef.current.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)'
      }
    })
  }, [])

  const sNav = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2rem 3.5rem', background: 'var(--nav-bg)',
      backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)',
      transition: 'box-shadow 0.3s, background 0.4s, border-color 0.4s'
    }}>
      <Link to="/" style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text)'
      }}>
        SR <span style={{ color: 'var(--accent)' }}>Travels</span>
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
        {[
          ['About',    () => sNav('about-company')],
          ['Galleria', () => sNav('galleria')],
          ['Why Us',   () => sNav('why-us')],
          ['Stories',  () => sNav('stories')],
          ['Contact',  () => sNav('contact-footer')],
        ].map(([label, action]) => (
          <li key={label}>
            <a onClick={action} style={{
              fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              cursor: 'none', transition: 'color 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <button className="btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.72rem' }}
            onClick={() => navigate('/destinations')}>
            Book Now
          </button>
        </li>
      </ul>

      <button className="theme-toggle-btn" onClick={cycle} title="Switch theme" style={{
        width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)',
        background: 'var(--bg-alt)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'none',
        transition: 'border-color 0.3s, background 0.3s, transform 0.2s',
        marginLeft: '1rem', flexShrink: 0, fontSize: '0.95rem', lineHeight: 1
      }}>
        {icon}
      </button>
    </nav>
  )
}
