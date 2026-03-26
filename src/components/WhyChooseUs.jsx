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
  const [expanded, setExpanded] = useState(false);

  return (
    <div id={card.id} className="w-card" style={{
      position: 'relative', width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '300px 1fr',
      borderRadius: 14, overflow: 'hidden',
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'background 0.4s, border-color 0.4s, transform 0.3s',
      cursor: 'grab'
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div className="w-card-img" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <img src={card.img} alt={card.title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'grayscale(1) contrast(1.1) brightness(0.9)'
        }} />
      </div>

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

        <div className="read-more-wrapper">
          <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
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
    const el = containerRef.current
    if (!el) return
    let isDown = false
    let startX
    let scrollLeft

    const onDown = (e) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }
    const onLeave = () => { isDown = false; el.style.cursor = 'grab' }
    const onUp = () => { isDown = false; el.style.cursor = 'grab' }
    const onMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 2
      el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('mousemove', onMove)

    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseup', onUp)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <style>{`
        .whyus-scroll::-webkit-scrollbar { display: none; }
        .whyus-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .whyus-card-wrapper {
          flex: 0 0 760px;
          height: 400px;
          scroll-snap-align: center;
        }

        .section-header { padding: 0 4rem; }
        .cards-scroll-container { padding: 1rem 4rem 3rem 4rem; }

        @media (min-width: 769px) {
          .read-more-wrapper { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .section-header { padding: 0 1.5rem; }
          .cards-scroll-container { padding: 1rem 1.5rem 3rem 1.5rem; gap: 1rem !important; }
          .whyus-card-wrapper {
            flex: 0 0 85vw;
            height: 580px;
          }
          .w-card {
            display: flex !important;
            flex-direction: column !important;
            background: #0f0d0b !important; 
          }
          .w-card-img { 
            height: 70% !important; 
            width: 100% !important;
            border-radius: 14px 14px 0 0 !important; 
            flex-shrink: 0;
            display: flex;
          }
          .w-card-text { 
            height: 30% !important;
            padding: 0rem 1.5rem 1.2rem 1.5rem !important;
            border-radius: 0 0 14px 14px !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
            text-align: left !important; 
            overflow-y: auto;
            position: relative;
          }
          .w-card-num { 
            position: absolute !important; top: 1rem !important; right: 1.2rem !important;
            font-size: 2.2rem !important; margin: 0 !important; opacity: 0.15 !important;
          }
          .w-card-text h3 { font-size: 1.15rem !important; margin-bottom: 0.4rem !important; padding-right: 2rem !important; justify-content: flex-start !important; }
          .w-card-text p { font-size: 0.85rem !important; margin-bottom: 0.6rem !important; line-height: 1.4 !important; }
          .w-card-list { display: none; }
          .read-more-btn {
            margin-top: auto !important; padding: 0.4rem 1rem !important;
            background: rgba(196,98,45,0.1) !important; border: 1px solid var(--accent) !important;
            color: var(--accent) !important; border-radius: 20px !important; font-size: 0.7rem !important; text-transform: uppercase !important;
            align-self: flex-start !important;
          }
          .w-card-text.is-expanded {
            position: absolute !important; top: 0 !important; left: 0 !important;
            width: 100% !important; height: 100% !important; border-radius: 14px !important;
            background: rgba(15, 13, 11, 0.96) !important; backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important; justify-content: center !important;
            z-index: 10;
          }
          .w-card-text.is-expanded .w-card-list {
            display: block; margin-bottom: 1rem;
          }
        }
      `}</style>

      <section id="why-us" style={{
        padding: '6rem 0', background: 'var(--bg)', transition: 'background 0.4s',
        display: 'flex', flexDirection: 'column'
      }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Our Promise</span>
          <h2 className="section-title">Why Choose <em>SR Travels?</em></h2>
        </div>

        <div className="whyus-scroll cards-scroll-container" ref={containerRef} style={{
          display: 'flex', gap: '2rem', overflowX: 'auto',
          scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', cursor: 'grab'
        }}>
          {CARDS.map(card => (
            <div key={card.id} className="whyus-card-wrapper">
              <WCard card={card} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}