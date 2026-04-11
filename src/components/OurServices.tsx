'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: '🚌',
    title: 'City Express',
    description: 'High-frequency routes connecting major cities with premium coaches and on-time guarantee.',
  },
  {
    icon: '🌄',
    title: 'Outstation Tours',
    description: 'Curated group tours to scenic destinations with experienced travel guides.',
  },
  {
    icon: '🏢',
    title: 'Corporate Travel',
    description: 'Dedicated fleet for corporate requirements — comfortable, punctual, and professional.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Packages',
    description: 'Special packages for family trips with child-friendly amenities and flexible booking.',
  },
  {
    icon: '🎓',
    title: 'Student Buses',
    description: 'Safe and reliable school & college transport with trained drivers and GPS tracking.',
  },
  {
    icon: '✈️',
    title: 'Airport Transfers',
    description: 'Timely and comfortable airport pick-up and drop-off across the region.',
  },
]

export default function OurServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container-sr">
        {/* Header */}
        <p className="section-subtitle">What We Offer</p>
        <div className="accent-line" />
        <h2 className="section-title">Our Services</h2>

        {/* Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="service-card card-sr p-8 group cursor-default"
            >
              <div
                className="text-4xl mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'var(--border)' }}
              >
                {service.icon}
              </div>
              <h3
                className="font-serif text-xl mb-3"
                style={{ color: 'var(--text)' }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {service.description}
              </p>
              <div
                className="mt-5 w-8 h-px transition-all duration-300 group-hover:w-16"
                style={{ background: 'var(--accent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
