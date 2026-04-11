'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(overlayRef.current, { opacity: 0, duration: 1.2 })
        .from(headingRef.current, { y: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
        alt="SR Travels — Open road"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--overlay) 0%, rgba(0,0,0,0.5) 60%, var(--bg) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="badge badge-accent mb-6 inline-block">Trusted Since 2010</span>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight"
          style={{ color: 'var(--text)' }}
        >
          Journey Beyond
          <br />
          <em className="italic" style={{ color: 'var(--accent)' }}>the Ordinary</em>
        </h1>

        <p
          ref={subRef}
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Comfortable, reliable, and affordable travel across premier routes.
          Your trusted partner for every journey.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20SR%20Travels!%20I%20want%20to%20book%20a%20seat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book Your Seat
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link href="/destinations" className="btn-outline">
            View Routes
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
