import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ExploreCTA() {
  const sectionRef = useRef(null)
  const navigate   = useNavigate()

  useEffect(() => {
    gsap.from(sectionRef.current.children, {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
    })
  }, [])

  return (
    <section id="explore-cta" style={{
      background: 'var(--accent)', padding: '7rem 4rem',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      transition: 'background 0.4s'
    }}>
      <div style={{
        position: 'absolute',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '28vw', fontWeight: 700,
        color: 'rgba(255,255,255,0.05)', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        letterSpacing: '-0.05em', userSelect: 'none', whiteSpace: 'nowrap'
      }} aria-hidden>SR</div>

      <div ref={sectionRef} style={{ position: 'relative' }}>
        <span className="section-label" style={{ color: 'rgba(255,255,255,0.55)' }}>Start Your Journey</span>
        <h2 className="section-title" style={{ color: '#fff', marginBottom: '1rem' }}>
          Ready to <em style={{ color: 'rgba(255,255,255,0.65)' }}>Explore</em><br />Something New?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto 2.5rem',
          lineHeight: 1.85, fontSize: '0.95rem'
        }}>
          Check out our routes and get an instant price estimate. No hidden charges — transparent, affordable, and reliable travel across India.
        </p>
        <button className="btn-white" onClick={() => navigate('/destinations')}>
          Plan My Trip →
        </button>
      </div>
    </section>
  )
}
