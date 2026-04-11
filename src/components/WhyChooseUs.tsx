'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  { icon: '🛡️', title: 'Safety First', desc: 'All vehicles GPS-tracked, drivers background-verified.' },
  { icon: '⏱️', title: 'Always On Time', desc: '98% on-time departure rate across all routes.' },
  { icon: '💰', title: 'Best Prices', desc: 'Competitive fares with no hidden charges.' },
  { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock helpline for any travel assistance.' },
  { icon: '🧼', title: 'Clean Coaches', desc: 'Sanitized buses before every departure.' },
  { icon: '🎟️', title: 'Easy Booking', desc: 'Book your seat via WhatsApp in under 2 minutes.' },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      })

      gsap.from('.why-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container-sr grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <p className="section-subtitle text-left mb-4">Our Promise</p>
          <div className="w-16 h-px mb-4" style={{ background: 'var(--accent)' }} />
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-snug" style={{ color: 'var(--text)' }}>
            Why Thousands
            <br />
            <em className="italic" style={{ color: 'var(--accent)' }}>Choose SR Travels</em>
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {REASONS.map((r) => (
              <div key={r.title} className="why-item flex gap-4 items-start group">
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'var(--border)' }}
                >
                  {r.icon}
                </div>
                <div>
                  <p className="font-medium mb-1 text-sm" style={{ color: 'var(--text)' }}>{r.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="why-image relative h-[480px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"
            alt="SR Travels comfortable bus interior"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--overlay) 0%, transparent 60%)' }}
          />
          {/* Stat overlay */}
          <div
            className="absolute bottom-6 left-6 right-6 p-5 rounded-xl glass"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              {[['10+', 'Years'], ['50K+', 'Trips'], ['98%', 'On Time']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-serif font-semibold" style={{ color: 'var(--accent)' }}>{num}</p>
                  <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
