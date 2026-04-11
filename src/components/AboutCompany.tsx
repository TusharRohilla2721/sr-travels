'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutCompany() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      })
      gsap.from('.about-img', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container-sr grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="about-img relative h-[440px] rounded-2xl overflow-hidden order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80"
            alt="SR Travels fleet"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top right, var(--overlay), transparent)' }}
          />
          {/* Badge */}
          <div
            className="absolute top-6 left-6 px-4 py-2 rounded-full glass text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            Est. 2010
          </div>
        </div>

        {/* Text */}
        <div className="about-text order-1 lg:order-2">
          <p className="section-subtitle text-left mb-3">Our Story</p>
          <div className="w-16 h-px mb-4" style={{ background: 'var(--accent)' }} />
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 leading-snug" style={{ color: 'var(--text)' }}>
            Driven by Trust,
            <br />
            <em className="italic" style={{ color: 'var(--accent)' }}>Powered by Passion</em>
          </h2>
          <p className="text-sm leading-loose mb-4" style={{ color: 'var(--text-muted)' }}>
            SR Travels was founded with a single mission — to make quality travel accessible for everyone.
            Over a decade later, we've carried thousands of passengers safely to their destinations,
            building a reputation rooted in reliability, comfort, and transparency.
          </p>
          <p className="text-sm leading-loose mb-8" style={{ color: 'var(--text-muted)' }}>
            From humble beginnings with a handful of coaches, we've grown into a trusted name across
            multiple routes. Every journey we operate reflects our commitment to safety and passenger
            satisfaction above everything else.
          </p>
          <Link href="/about" className="btn-primary">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}
