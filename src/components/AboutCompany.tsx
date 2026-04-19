'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function AboutCompany() {
  const textRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return
      gsap.from(Array.from(textRef.current.children), { opacity: 0, x: -36, duration: 0.75, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: textRef.current, start: 'top 85%' } })
      gsap.from(imgRef.current, { opacity: 0, x: 48, scale: 1.04, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: imgRef.current, start: 'top 85%' } })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        #about-company {
          padding: 7rem 4rem;
          background: var(--bg);
          display: grid;
          grid-template-columns: 42% 58%;
          gap: 4rem;
          align-items: center;
          transition: background 0.4s;
        }
        .about-img-wrap {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 5;
        }
        .about-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        @media (max-width: 900px) {
          #about-company {
            grid-template-columns: 1fr !important;
            padding: 4.5rem 1.5rem !important;
            gap: 2.5rem !important;
          }
          .about-img-wrap {
            height: auto !important;
            aspect-ratio: 16 / 9;
            min-height: unset !important;
            max-height: unset !important;
          }
        }
      `}</style>
      <section ref={containerRef} id="about-company">
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span className="section-label">Our Story</span>
          <h2 className="section-title">SR Travels —<br /><em>Driven by Trust</em></h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            SR Travels was established in <strong style={{ color: 'var(--text)' }}>2012–13</strong> with a simple but powerful belief: <strong style={{ color: 'var(--text)' }}>trust must come before profit.</strong> What began as a small step has grown into a dependable travel company built on discipline, integrity, and personal responsibility.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            Every stage of our growth has been achieved through consistency, late nights, and a strong commitment to delivering on our promises.
          </p>
          <div style={{ marginTop: '1.2rem', padding: '1.2rem 1.4rem', borderLeft: '3px solid var(--accent)', background: 'var(--bg-alt)', borderRadius: '0 4px 4px 0', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.7 }}>
            &quot;At SR Travels, we do not simply provide vehicles. We provide assurance, accountability, and long-term partnership.&quot;
          </div>
        </div>
        <div ref={imgRef} className="about-img-wrap">
          <img
            src="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_1000/v1774166640/WhatsApp_Image_2026-03-06_at_12.21.54_AM_zagne4.jpg"
            alt="SR Travels Luxury Bus Service"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)', opacity: 0.1 }} />
        </div>
      </section>
    </>
  )
}