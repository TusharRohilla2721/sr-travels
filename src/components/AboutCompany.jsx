import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function AboutCompany() {
  const textRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    gsap.from(textRef.current.children, {
      opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
    })
    gsap.from(imgRef.current, {
      opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: imgRef.current, start: 'top 80%' }
    })
  }, [])

  return (
    <section id="about-company" style={{
      padding: '7rem 4rem', background: 'var(--bg)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: '5rem', alignItems: 'center', transition: 'background 0.4s'
    }}>
      <div ref={textRef}>
        <span className="section-label">Our Story</span>
        <h2 className="section-title">SR Travels —<br /><em>Driven by Trust</em></h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          SR Travels was established in <strong style={{ color: 'var(--text)' }}>2012–13</strong> with a simple but powerful belief:{' '}
          <strong style={{ color: 'var(--text)' }}>trust must come before profit.</strong> What began as a small step forward has grown into a dependable travel company built on discipline, integrity, and personal responsibility.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          Every stage of our growth has been achieved through consistency, late nights, operational supervision, and a strong commitment to delivering on our promises. Even today, if there is ever a shortage of staff, service is never compromised — leadership steps forward.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          At SR Travels, customers are not transactions — they are long-term partners and an extension of our <strong style={{ color: 'var(--text)' }}>family.</strong> When we meet a new client, we do not immediately talk about pricing — we first seek to understand their expectations.
        </p>
        <div style={{
          marginTop: '2rem', padding: '1.5rem',
          borderLeft: '3px solid var(--accent)',
          background: 'var(--bg-alt)', borderRadius: '0 4px 4px 0',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text)',
          lineHeight: 1.7, transition: 'background 0.4s'
        }}>
          "At SR Travels, we do not simply provide vehicles. We provide assurance, accountability, and long-term partnership. — Delivered with Responsibility."
        </div>
      </div>

      <div ref={imgRef} style={{
        position: 'relative', borderRadius: 4, overflow: 'hidden', aspectRatio: '4/5'
      }}>
        {}
        <img src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&q=80"
          alt="SR Travels Fleet"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)',
          opacity: 0.15
        }} />
      </div>
    </section>
  )
}
