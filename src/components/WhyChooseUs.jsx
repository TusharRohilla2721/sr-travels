import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    id: 'wc0', num: '01', emoji: '🌟',
    title: 'The SR Travels Promise',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80',
    desc: 'Trust and ground-level experience from Sunder and Tushar in every booking.',
    points: [
      { b: 'Experience that Counts:', t: '25 years of field knowledge — roads, rhythms, shortcuts of India.' },
      { b: 'Personal Touch:', t: 'Every booking treated like a family commitment.' },
      { b: 'Safety First:', t: 'Expert drivers trained to prioritise your safety above all else.' },
      { b: '24/7 Support:', t: '2 AM pickup or last-minute change — just a call away.' },
    ]
  },
  {
    id: 'wc1', num: '02', emoji: '🚐',
    title: 'Our Fleet',
    img: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=700&q=80',
    desc: '100+ vehicles ready for any group size — intimate family trips to large corporate retreats.',
    points: [
      { b: 'Small Squad (7-Seaters):', t: 'Perfect for family airport runs or quick city trips.' },
      { b: 'Mid-Range (12 & 14 Seaters):', t: 'Space without the "big bus" feel.' },
      { b: 'Premium Urbania (16-Seater):', t: 'Premium interiors for those who travel like royalty.' },
      { b: 'Big Groups (20, 26 & 42 Seaters):', t: 'Luxury coaches for weddings, corporate outings, reunions.' },
    ]
  },
  {
    id: 'wc2', num: '03', emoji: '✨',
    title: 'Premium Comfort',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80',
    desc: 'Aesthetic interiors and real comfort features that make every mile enjoyable.',
    points: [
      { b: 'Aesthetic Lighting:', t: 'Custom ambience that starts the vacation before you arrive.' },
      { b: 'Push-Back Seats + Full AC:', t: 'Sleep through those long overnight hauls.' },
      { b: 'Charging at Every Seat:', t: 'Maps, music, and cameras — always powered.' },
      { b: 'Clean-Car Policy:', t: 'Spotless interiors, every single trip.' },
    ]
  },
  {
    id: 'wc3', num: '04', emoji: '🌍',
    title: 'Specialized Packages',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80',
    desc: 'End-to-end travel planning beyond just the bus — we handle everything.',
    points: [
      { b: 'Custom Itineraries:', t: 'Dream destination, perfect plan — budget to ultra-luxury.' },
      { b: 'Honeymoon & Romance:', t: 'Handpicked resorts, candlelit experiences.' },
      { b: 'Spiritual Journeys:', t: 'Pilgrimage tours with respect and expert guidance.' },
      { b: 'Global Adventures:', t: 'Dubai, Thailand, Bali, Europe — handled end-to-end.' },
    ]
  },
]

function WCard({ card }) {
  return (
    <div id={card.id} style={{
      position: 'absolute', inset: 0,
      display: 'grid', gridTemplateColumns: '340px 1fr',
      borderRadius: 14, overflow: 'hidden',
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
      transition: 'background 0.4s, border-color 0.4s',
      willChange: 'transform, opacity'
    }}>
      { }
      <div id={`${card.id}-scrim`} style={{
        position: 'absolute', inset: 0, zIndex: 3, borderRadius: 14,
        background: 'rgba(0,0,0,0)', pointerEvents: 'none', willChange: 'opacity'
      }} />

      { }
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px 0 0 14px', zIndex: 1 }}>
        <img src={card.img} alt={card.title} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'grayscale(1) contrast(1.1) brightness(0.9)'
        }} />
      </div>

      { }
      <div style={{
        padding: '2.4rem 2.8rem', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
        borderRadius: '0 14px 14px 0', zIndex: 1
      }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '3.2rem', fontWeight: 300, color: 'var(--border)',
          lineHeight: 1, marginBottom: '0.4rem'
        }}>{card.num}</div>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.3rem, 2vw, 1.55rem)', fontWeight: 400,
          color: 'var(--text)', marginBottom: '0.8rem'
        }}>{card.emoji} {card.title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.82 }}>{card.desc}</p>
        <ul style={{ listStyle: 'none', marginTop: '0.7rem' }}>
          {card.points.map((p, i) => (
            <li key={i} style={{
              fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.72,
              padding: '0.18rem 0 0.18rem 1rem', position: 'relative'
            }}>
              <span style={{
                position: 'absolute', left: 0, color: 'var(--accent)',
                fontSize: '0.5rem', top: '0.5rem'
              }}>✦</span>
              <strong>{p.b}</strong> {p.t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = CARDS.map(c => document.getElementById(c.id))
      const scrimEls = CARDS.map(c => document.getElementById(`${c.id}-scrim`))


      cardEls.forEach((c, i) => {
        if (!c) return
        c.style.transform = ''
        gsap.set(c, { y: i === 0 ? 0 : '110%', scale: 1, opacity: 1, zIndex: 100 + i })
        gsap.set(scrimEls[i], { opacity: 0 })
      })

      const GAP = 28
      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      for (let i = 1; i < CARDS.length; i++) {
        const pos = i - 1

        tl.to(cardEls[i], { y: 0, duration: 1 }, pos)

        tl.to(cardEls[i - 1], { scale: 0.94, y: -GAP, duration: 1 }, pos)
        tl.to(scrimEls[i - 1], { opacity: 0.42, duration: 1 }, pos)

        for (let j = 0; j < i - 1; j++) {
          const depth = i - j
          tl.to(cardEls[j], {
            scale: Math.max(0.80, 0.94 - (depth - 1) * 0.05),
            y: -(GAP * depth), duration: 1
          }, pos)
          tl.to(scrimEls[j], {
            opacity: Math.min(0.75, 0.42 + (depth - 1) * 0.15), duration: 1
          }, pos)
        }
      }

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: innerRef.current,
        pinSpacing: false,
        scrub: 0.5,
        animation: tl
      })

      return () => ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === outerRef.current) t.kill()
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} id="why-us-outer" style={{ height: '250vh' }}>
      <section ref={innerRef} id="why-us" style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: 'var(--bg)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.4s'
      }}>
        <div style={{
          position: 'absolute', top: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 50,
          textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap'
        }}>
          <span className="section-label">Our Promise</span>
          <h2 className="section-title">Why Choose <em>SR Travels?</em></h2>
        </div>

        <div style={{
          position: 'relative',
          width: 'min(960px, 90vw)', height: 'min(480px, 58vh)',
          clipPath: 'inset(-200px -20px 0 -20px)'
        }}>
          {CARDS.map(card => <WCard key={card.id} card={card} />)}
        </div>
      </section>
    </div>
  )
}
