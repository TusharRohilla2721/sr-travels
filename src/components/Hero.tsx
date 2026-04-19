'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919289694400'

export default function Hero() {
  const tagRef = useRef<HTMLParagraphElement>(null)
  const l1Ref = useRef<HTMLSpanElement>(null)
  const l2Ref = useRef<HTMLSpanElement>(null)
  const l3Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(tagRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to([l1Ref.current, l2Ref.current, l3Ref.current], { y: 0, duration: 1, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(imgRef.current, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0.3)
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
        .to(hintRef.current, { opacity: 1, duration: 0.5 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @keyframes scrollLinePulse {
          0%   { transform: scaleX(0) translateX(0); transform-origin: left center; }
          49%  { transform: scaleX(1) translateX(0); transform-origin: left center; }
          50%  { transform: scaleX(1) translateX(0); transform-origin: right center; }
          100% { transform: scaleX(0) translateX(0); transform-origin: right center; }
        }
        .scroll-line-bar {
          height: 2px;
          width: 40px;
          background: var(--accent);
          transform-origin: left center;
          animation: scrollLinePulse 2.4s ease-in-out infinite;
        }
        #hero { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          #hero { display: flex !important; flex-direction: column !important; min-height: auto !important; }
          #hero > div:first-child { padding: 7rem 1.5rem 2rem !important; }
          #hero > div:last-child {
            margin: 0 !important;
            padding: 0 1.25rem 3rem !important;
            height: auto !important;
            min-height: unset !important;
            max-height: unset !important;
            border-radius: 0 !important;
            position: relative !important;
            overflow: visible !important;
          }
          .hero-img-wrap {
            height: 60vw !important;
            min-height: 240px !important;
            max-height: 400px !important;
            border-radius: 16px !important;
            overflow: hidden !important;
            position: relative !important;
            transform: none !important;
          }
          .hero-img-wrap img {
             object-position: center 20% !important;
          }
          .hero-badge {
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            position: static !important;
            padding: 0 !important;
            min-width: unset !important;
            text-align: left !important;
            margin-top: 1rem !important;
            background: transparent !important;
            backdrop-filter: none !important;
            border: none !important;
          }
          .hero-badge-num { font-size: 2rem !important; margin-bottom: 0 !important; line-height: 1.1 !important; color: var(--accent) !important; }
          .hero-badge-label { font-size: 0.75rem !important; }
        }
      `}</style>
      <section id="hero" ref={containerRef} style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 4rem 4rem', position: 'relative', zIndex: 2 }}>
          <p ref={tagRef} style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, marginBottom: '1.4rem', opacity: 0 }}>
            ✦ Est. 2012 · Affordable & Efficient Travel
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', lineHeight: 1.05, fontWeight: 300, color: 'var(--text)', marginBottom: '1.5rem' }}>
            {(['Travel Smart,', 'Explore More,', 'Spend Less.'] as const).map((text, i) => (
              <span key={text} style={{ overflow: 'hidden', display: 'block' }}>
                <span ref={[l1Ref, l2Ref, l3Ref][i]} style={{ display: 'block', transform: 'translateY(110%)' }}>{text}</span>
              </span>
            ))}
          </h1>
          <p ref={subRef} style={{ fontSize: '0.96rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: 390, marginBottom: '2.2rem', opacity: 0, transform: 'translateY(20px)' }}>
            Quality travel experiences for everyone — from daily employee transport across NCR to all-India tourist journeys. Comfort you deserve. Prices you&apos;ll love.
          </p>
          <div ref={actionsRef} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem', opacity: 0, transform: 'translateY(20px)' }}>
            <Link href="/destinations" className="btn-primary">Explore Destinations</Link>
            <button className="btn-ghost" onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}>Why Choose Us</button>
          </div>
          <div ref={hintRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem', opacity: 0 }}>
            <div style={{ width: 40, height: 2, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <div className="scroll-line-bar" />
            </div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll to discover</span>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div ref={imgRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, transform: 'scale(1.12)' }}>
            <img
              src="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_1200/v1774172216/WhatsApp_Image_2026-03-06_at_12.21.52_AM_ixi0oh.jpg"
              alt="SR Travels luxury bus fleet"
              fetchPriority="high"
              loading="eager"
              width={800} height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.88)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 35%, var(--bg) 100%)' }} />
          </div>
          <div ref={badgeRef} className="hero-badge" style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%) translateY(20px)', zIndex: 3, background: 'var(--card-bg)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', padding: '1rem 1.8rem', textAlign: 'center', borderRadius: 4, minWidth: 180, opacity: 0 }}>
            <div className="hero-badge-num" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.3rem' }}>25+</div>
            <p className="hero-badge-label" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Years of Excellence</p>
          </div>
        </div>
      </section>
    </>
  )
}