import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { count: 100, suffix: '+', label: 'Happy Clients'       },
  { count: 50,  suffix: '+', label: 'Tour Packages'       },
  { count: 100, suffix: '+', label: 'Destinations Covered'},
  { count: 25,  suffix: '+', label: 'Years of Excellence' },
]

export default function Stats() {
  const blockRefs = useRef([])
  const numRefs   = useRef([])

  useEffect(() => {
    gsap.from(blockRefs.current, {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: blockRefs.current[0], start: 'top 80%' }
    })

    numRefs.current.forEach((el, i) => {
      if (!el) return
      const { count, suffix } = STATS[i]
      ScrollTrigger.create({
        trigger: el, start: 'top 80%', once: true,
        onEnter() {
          gsap.from({ val: 0 }, {
            val: count, duration: 2.5, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix }
          })
        }
      })
    })
  }, [])

  return (
    <section id="stats" style={{
      background: 'var(--stat-bg)', padding: '6rem 4rem', transition: 'background 0.4s'
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center'
      }}>
        {STATS.map((s, i) => (
          <div key={i} ref={el => blockRefs.current[i] = el} className="stat-block">
            <div ref={el => numRefs.current[i] = el} style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 300,
              color: 'var(--stat-txt)', lineHeight: 1, marginBottom: '0.5rem'
            }}>0{s.suffix}</div>
            <p style={{
              fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)'
            }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
