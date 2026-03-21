import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { count: 100, suffix: '+', label: 'Happy Clients' },
  { count: 50, suffix: '+', label: 'Tour Packages' },
  { count: 100, suffix: '+', label: 'Destinations Covered' },
  { count: 25, suffix: '+', label: 'Years of Excellence' },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const numbersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      })

      numbersRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to({ val: 0 }, {
          val: STATS[i].count,
          duration: 2,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          },
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + STATS[i].suffix
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '8rem 2rem', background: '#0a0a0a' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {STATS.map((s, i) => (
          <div key={i} className="stat-item" style={{ textAlign: 'center' }}>
            <div
              ref={el => numbersRef.current[i] = el}
              style={{
                fontFamily: 'serif',
                fontSize: '4rem',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}
            >
              0{s.suffix}
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.8rem'
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}