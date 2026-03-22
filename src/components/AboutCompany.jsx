import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBreakpoint } from '../hooks/useBreakpoint'
gsap.registerPlugin(ScrollTrigger)

export default function AboutCompany() {
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const containerRef = useRef(null)
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' }
      })
      gsap.from(imgRef.current, {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: imgRef.current, start: 'top 85%' }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const cols = isMobile || isTablet ? '1fr' : '1fr 1fr'
  const pad = isMobile ? '4rem 1.5rem' : isTablet ? '5rem 2.5rem' : '7rem 4rem'

  return (
    <section id="about-company" ref={containerRef} style={{
      padding: pad, background: 'var(--bg)',
      display: 'grid', gridTemplateColumns: cols,
      gap: isMobile || isTablet ? '2.5rem' : '5rem',
      alignItems: 'center', transition: 'background 0.4s'
    }}>
      <div ref={textRef}>
        <span className="section-label">Our Story</span>
        <h2 className="section-title">SR Travels —<br /><em>Driven by Trust</em></h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          SR Travels was established in <strong style={{ color: 'var(--text)' }}>2012–13</strong> with a simple but powerful belief:{' '}
          <strong style={{ color: 'var(--text)' }}>trust must come before profit.</strong> What began as a small step has grown into a dependable travel company built on discipline, integrity, and personal responsibility.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          Every stage of our growth has been achieved through consistency, late nights, and a strong commitment to delivering on our promises. Even today, if there is ever a shortage of staff, leadership steps forward.
        </p>
        <div style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '3px solid var(--accent)', background: 'var(--bg-alt)', borderRadius: '0 4px 4px 0', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.7, transition: 'background 0.4s' }}>
          "At SR Travels, we do not simply provide vehicles. We provide assurance, accountability, and long-term partnership."
        </div>
      </div>

      <div ref={imgRef} style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', aspectRatio: isMobile ? '3/2' : '4/5' }}>
        <img
          src="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774166640/WhatsApp_Image_2026-03-06_at_12.21.54_AM_zagne4.jpg"
          alt="SR Travels Luxury Bus Service"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)', opacity: 0.15 }} />
      </div>
    </section>
  )
}