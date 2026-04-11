'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { year: '2010', event: 'SR Travels founded with 2 coaches on a single route.' },
  { year: '2013', event: 'Expanded to 5 routes across Maharashtra.' },
  { year: '2016', event: 'Fleet grew to 15+ coaches; introduced AC buses.' },
  { year: '2019', event: 'Launched WhatsApp booking for instant seat reservations.' },
  { year: '2022', event: 'Reached 50,000+ happy passengers milestone.' },
  { year: '2024', event: 'Covering 30+ routes with GPS-tracked fleet.' },
]

export default function AboutDeck() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.milestone-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container-sr max-w-3xl mx-auto">
        <p className="section-subtitle">Our Journey</p>
        <div className="accent-line" />
        <h2 className="section-title mb-12">Milestones</h2>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
          />

          {MILESTONES.map((m, i) => (
            <div key={i} className="milestone-item relative mb-10 last:mb-0">
              {/* Dot */}
              <div
                className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                style={{ background: 'var(--accent)', borderColor: 'var(--bg)' }}
              />

              <div className="card-sr p-5">
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                  style={{ color: 'var(--accent)' }}
                >
                  {m.year}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {m.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
