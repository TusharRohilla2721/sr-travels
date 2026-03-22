import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    id: 'wc0', num: '01', emoji: '🌟',
    title: 'The SR Travels Promise',
    img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173717/WhatsApp_Image_2026-03-06_at_12.22.39_AM_1_cmrksy.jpg',
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
    img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174233/WhatsApp_Image_2026-03-06_at_12.21.55_AM_lq4eqa.jpg',
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
    img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173391/WhatsApp_Image_2026-03-06_at_12.25.32_AM_lxdk0u.jpg',
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
    img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173689/WhatsApp_Image_2026-03-06_at_12.21.58_AM_xw5des.jpg',
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
  const [expanded, setExpanded] = useState(false); // Mobile Read More Toggle

  return (
    <div id={card.id} className="w-card" style={{
      position: 'absolute', inset: 0,
      display: 'grid', gridTemplateColumns: '340px 1fr',
      borderRadius: 14, overflow: 'hidden',
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'background 0.4s, border-color 0.4s',
      willChange: 'transform, opacity'
    }}>
      <div id={`${card.id}-scrim`} style={{
        position: 'absolute', inset: 0, zIndex: 3, borderRadius: 14,
        background: 'rgba(0,0,0,0)', pointerEvents: 'none', willChange: 'opacity'
      }} />

      <div className="w-card-img" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <img src={card.img} alt={card.title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'grayscale(1) contrast(1.1) brightness(0.9)'
        }} />
      </div>

      {/* Added the dynamic 'is-expanded' class */}
      <div className={`w-card-text ${expanded ? 'is-expanded' : ''}`} style={{
        padding: '2.4rem 2.8rem', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', position: 'relative', overflowY: 'hidden',
        zIndex: 2, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div className="w-card-num" style={{
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

        {/* Bullet points are hidden on mobile by default */}
        <ul className="w-card-list" style={{ listStyle: 'none', marginTop: '0.7rem' }}>
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

        {/* Read More Button (Only visible on Mobile) */}
        <div className="read-more-wrapper">
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less ↑' : 'Read More ↓'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
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
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        animation: tl
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        /* Hide the button on desktop */
        @media (min-width: 769px) {
          .read-more-wrapper { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .w-card {
            grid-template-columns: 1fr !important;
            grid-template-rows: 240px 1fr !important; 
            background: #0f0d0b !important; 
          }
          .w-card-img { border-radius: 14px 14px 0 0 !important; }
          .w-card-text { 
            padding: 1.2rem 1.2rem !important; 
            border-radius: 0 0 14px 14px !important;
            justify-content: flex-start !important; 
          }
          .w-card-num { font-size: 2rem !important; margin-bottom: 0.2rem !important; }
          
          /* READ MORE LOGIC */
          .w-card-list { display: none; } /* Hide list initially */
          
          /* The button styling */
          .read-more-btn {
            margin-top: 0.8rem;
            padding: 0.4rem 1rem;
            background: rgba(196,98,45,0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            border-radius: 20px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          /* When user clicks "Read More", the box expands to cover the image */
          .w-card-text.is-expanded {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 14px !important;
            background: rgba(15, 13, 11, 0.96) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            justify-content: center !important;
          }
          /* Show the list when expanded */
          .w-card-text.is-expanded .w-card-list {
            display: block;
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <section ref={containerRef} id="why-us" style={{
        height: '100vh', overflow: 'hidden', width: '100%',
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
          width: 'min(960px, 90vw)', height: 'min(480px, 60vh)',
          clipPath: 'inset(-200px -20px 0 -20px)'
        }}>
          {CARDS.map(card => <WCard key={card.id} card={card} />)}
        </div>
      </section>
    </>
  )
}