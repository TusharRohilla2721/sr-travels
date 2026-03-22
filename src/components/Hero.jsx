import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

export default function Hero() {
  const tagRef = useRef(null)
  const l1Ref = useRef(null)
  const l2Ref = useRef(null)
  const l3Ref = useRef(null)
  const subRef = useRef(null)
  const actionsRef = useRef(null)
  const imgRef = useRef(null)
  const badgeRef = useRef(null)
  const hintRef = useRef(null)
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(tagRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to([l1Ref.current, l2Ref.current, l3Ref.current],
          { y: 0, duration: 1, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(imgRef.current, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0.3)
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
        .to(hintRef.current, { opacity: 1, duration: 0.5 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={containerRef} style={{
      minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
      position: 'relative', overflow: 'hidden'
    }}>
      { }
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '8rem 4rem 4rem', position: 'relative', zIndex: 2
      }}>
        <p ref={tagRef} style={{
          fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--accent)', fontWeight: 500, marginBottom: '1.4rem', opacity: 0
        }}>
          ✦ Est. 2010 · Affordable & Efficient Travel
        </p>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 5.5vw, 5rem)', lineHeight: 1.05,
          fontWeight: 300, color: 'var(--text)', marginBottom: '1.5rem'
        }}>
          {[
            ['Travel Smart,', l1Ref],
            ['Explore More,', l2Ref],
            ['Spend Less.', l3Ref],
          ].map(([text, ref]) => (
            <span key={text} style={{ overflow: 'hidden', display: 'block' }}>
              <span ref={ref} style={{ display: 'block', transform: 'translateY(110%)' }}>
                {text}
              </span>
            </span>
          ))}
        </h1>

        <p ref={subRef} style={{
          fontSize: '0.96rem', lineHeight: 1.85, color: 'var(--text-muted)',
          maxWidth: 390, marginBottom: '2.2rem', opacity: 0, transform: 'translateY(20px)'
        }}>
          Quality travel experiences for everyone — from daily employee transport across NCR
          to all-India tourist journeys. Comfort you deserve. Prices you'll love.
        </p>

        <div ref={actionsRef} style={{
          display: 'flex', gap: '1rem', alignItems: 'center',
          marginBottom: '2rem', opacity: 0, transform: 'translateY(20px)'
        }}>
          <button className="btn-primary" onClick={() => navigate('/destinations')}>
            Explore Destinations
          </button>
          <button className="btn-ghost"
            onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}>
            Why Choose Us
          </button>
        </div>

        <div ref={hintRef} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          marginTop: '2.5rem', opacity: 0
        }}>
          <div style={{
            width: 40, height: 1, background: 'var(--accent)',
            animation: 'scrollLine 2s infinite'
          }} />
          <span style={{
            fontSize: '0.68rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--text-muted)'
          }}>Scroll to discover</span>
        </div>

        <style>{`
          @keyframes scrollLine {
            0%   { transform: scaleX(0); transform-origin: left; }
            50%  { transform: scaleX(1); transform-origin: left; }
            51%  { transform: scaleX(1); transform-origin: right; }
            100% { transform: scaleX(0); transform-origin: right; }
          }
        `}</style>
      </div>

      { }
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={imgRef} style={{
          width: '100%', height: '100%', position: 'absolute', inset: 0, transform: 'scale(1.12)'
        }}>
          { }
          <img src="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774172216/WhatsApp_Image_2026-03-06_at_12.21.52_AM_ixi0oh.jpg"
            alt="SR Travels fleet" style={{
              width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.88)'
            }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--bg) 0%, transparent 35%)'
          }} />
        </div>

        <div ref={badgeRef} style={{
          position: 'absolute', bottom: '3rem', left: '50%',
          transform: 'translateX(-50%) translateY(20px)',
          zIndex: 3, background: 'var(--card-bg)', backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)', padding: '1rem 1.8rem',
          textAlign: 'center', borderRadius: 4, minWidth: 180, opacity: 0,
          transition: 'background 0.4s, border-color 0.4s'
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
            fontWeight: 600, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.3rem'
          }}>25+</div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Years of Excellence
          </p>
        </div>
      </div>
    </section>
  )
}
