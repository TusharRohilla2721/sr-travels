import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FLEET_TYPES = [
  { id: '7s', name: '7 Seater' },
  { id: '12s', name: '12 Seater' },
  { id: '16s', name: '16 Seater Premium Urbania' },
  { id: '20s', name: '20 Seater' },
  { id: '26s', name: '26 Seater' },
  { id: '42s', name: '42 Seater' }
]

// Generate 5 placeholder cards for each fleet type
const CARDS = FLEET_TYPES.flatMap(fleet => 
  Array.from({ length: 5 }).map((_, i) => ({
    id: `${fleet.id}-${i}`,
    fleetName: fleet.name,
    title: `Feature ${i + 1}`,
    desc: `Placeholder text for ${fleet.name} feature ${i + 1}.`,
    img: `https://fakeimg.pl/600x800/181410/c4622d?text=${fleet.name.replace(/ /g, '+')} - ${i + 1}`
  }))
)

export default function OurServices() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  // Optional: Add drag-to-scroll functionality for desktop users
  useEffect(() => {
    const el = scrollRef.current
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
        .services-scroll::-webkit-scrollbar { display: none; }
        .services-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .service-card {
          flex: 0 0 320px;
          height: 480px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--border);
          scroll-snap-align: start;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: grab;
        }
        .section-header { padding: 0 4rem; }
        .cards-scroll-container { padding: 1rem 4rem 3rem 4rem; }
        
        @media (max-width: 768px) {
          .section-header { padding: 0 1.5rem; }
          .cards-scroll-container { padding: 1rem 1.5rem 3rem 1.5rem; gap: 1rem; }
          .service-card {
            flex: 0 0 85vw;
            height: 400px;
          }
        }
        .service-card:active { cursor: grabbing; }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .service-card img {
          width: 100%; height: 60%; object-fit: cover;
          border-bottom: 1px solid var(--border);
        }
        .service-card-content {
          padding: 1.5rem;
          height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>

      <section id="our-services" style={{
        padding: '6rem 0', background: 'var(--bg-alt)', transition: 'background 0.4s',
        display: 'flex', flexDirection: 'column'
      }}>
        <div className="section-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label">Travel In Style</span>
            <h2 className="section-title">Our <em>Fleet</em> & Services</h2>
          </div>
          <button className="btn-outline" style={{ background: 'var(--accent)', color: '#fff', border: 'none' }} onClick={() => navigate('/destinations')}>
            Explore Destinations ✦
          </button>
        </div>

        <div className="services-scroll cards-scroll-container" ref={scrollRef} style={{
          display: 'flex', gap: '1.5rem', overflowX: 'auto',
          scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch'
        }}>
          {CARDS.map(card => (
            <div key={card.id} className="service-card">
              <img src={card.img} alt={card.title} loading="lazy" />
              <div className="service-card-content">
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {card.fleetName}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
