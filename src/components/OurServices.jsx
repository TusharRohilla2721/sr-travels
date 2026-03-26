import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 1. Fully Customized Data with Your Cloudinary Images
const FLEET_DATA = [
  {
    id: '7s',
    name: '7 Seater (SUV)',
    tagline: 'Compact Comfort for Family Getaways',
    features: [
      { id: '7s-1', title: 'Ergonomic Seating', desc: 'Premium leather finish with ample legroom for long drives.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.22.20_AM_aflbpk.jpg' },
      { id: '7s-2', title: 'Dual AC Control', desc: 'Independent climate control for front and rear passengers.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.31_AM_1_srrkry.jpg' },
      { id: '7s-3', title: 'Compact Storage', desc: 'Flexible boot space to accommodate all your travel gear.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173358/FLEET_2_a8bsy1.jpg' },
      { id: '7s-4', title: 'Safety First', desc: 'Equipped with dual airbags and ABS for a secure journey.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173363/WhatsApp_Image_2026-03-06_at_12.21.57_AM_f8jq4k.jpg' },
      { id: '7s-5', title: 'Entertainment', desc: 'Bluetooth enabled audio for your favorite travel playlists.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173365/WhatsApp_Image_2026-03-06_at_12.21.58_AM_ur8gjv.jpg' }
    ]
  },
  {
    id: '12s',
    name: '12 Seater (Traveler)',
    tagline: 'The Perfect Balance of Group Space and Agility',
    features: [
      { id: '12s-1', title: 'Push-back Seats', desc: 'Adjustable seating for maximum relaxation during night hauls.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173704/WhatsApp_Image_2026-03-06_at_12.22.07_AM_utls4w.jpg' },
      { id: '12s-2', title: 'High Roof Design', desc: 'Ample headroom allowing passengers to move comfortably.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173694/WhatsApp_Image_2026-03-06_at_12.22.01_AM_p12n6s.jpg' },
      { id: '12s-3', title: 'LED Ambience', desc: 'Customizable interior lighting for a premium travel vibe.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173693/WhatsApp_Image_2026-03-06_at_12.22.00_AM_cfpjyy.jpg' },
      { id: '12s-4', title: 'USB Charging', desc: 'Dedicated charging ports at every row to keep you connected.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173688/WhatsApp_Image_2026-03-06_at_12.21.54_AM_gfc816.jpg' },
      { id: '12s-5', title: 'Panoramic Windows', desc: 'Large window panes for uninterrupted views of the landscape.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173391/WhatsApp_Image_2026-03-06_at_12.25.32_AM_lxdk0u.jpg' }
    ]
  },
  {
    id: '16s',
    name: '16 Seater Premium Urbania',
    tagline: 'Luxury Travel Redefined for Mid-Sized Groups',
    features: [
      { id: '16s-1', title: 'Captain Seats', desc: 'Individual luxury captain seats for unmatched comfort.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.25.31_AM_kdixct.jpg' },
      { id: '16s-2', title: 'Surround Sound', desc: 'Premium audio system for an immersive entertainment experience.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.25.31_AM_2_mo0fi8.jpg' },
      { id: '16s-3', title: 'Mood Lighting', desc: 'Aesthetic interior lighting perfect for night travel.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173672/WhatsApp_Image_2026-03-06_at_12.21.47_AM_hja188.jpg' },
      { id: '16s-4', title: 'Spacious Aisles', desc: 'Wider layout allowing easy movement throughout the cabin.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173686/WhatsApp_Image_2026-03-06_at_12.21.56_AM_hxvxht.jpg' },
      { id: '16s-5', title: 'Climate Control', desc: 'Advanced multi-zone AC for perfectly balanced temperatures.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173375/WhatsApp_Image_2026-03-06_at_12.22.43_AM_1_waxnvy.jpg' }
    ]
  },
  {
    id: '20s',
    name: '20 Seater',
    tagline: 'Spacious and Smooth for Extended Families',
    features: [
      { id: '20s-1', title: 'Reclining Comfort', desc: 'Deep reclining seats perfect for long interstate journeys.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173377/WhatsApp_Image_2026-03-06_at_12.25.15_AM_k5okav.jpg' },
      { id: '20s-2', title: 'Overhead Storage', desc: 'Convenient racks for easy access to your personal carry-ons.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774171932/WhatsApp_Image_2026-03-06_at_12.25.27_AM_jcaj9b.jpg' },
      { id: '20s-3', title: 'Smooth Suspension', desc: 'Engineered for a bump-free ride even on rugged terrains.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.08_AM_obptm3.jpg' },
      { id: '20s-4', title: 'Wide Windows', desc: 'Large tinted windows offering great views with privacy.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178602/IMG_20260104_090144_qaala3.jpg' },
      { id: '20s-5', title: 'PA System', desc: 'On-board microphone system for easy group coordination.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178600/IMG_20260104_085020_v87sfb.jpg' }
    ]
  },
  {
    id: '26s',
    name: '26 Seater',
    tagline: 'Ideal for Corporate Outings and Large Gatherings',
    features: [
      { id: '26s-1', title: 'Air Suspension', desc: 'Glides over highways for the ultimate passenger comfort.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178515/IMG_20250610_155004_s3xyrp.jpg' },
      { id: '26s-2', title: 'Curtained Windows', desc: 'Pull-down curtains for those who want to sleep on the road.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178497/IMG_20260104_085059_nuj6zm.jpg' },
      { id: '26s-3', title: 'Dedicated Luggage', desc: 'Spacious rear and side boots for heavy travel bags.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178486/20260104_092638_tkqwbo.jpg' },
      { id: '26s-4', title: 'Reading Lights', desc: 'Individual overhead lights for nighttime reading and activities.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178484/IMG_20260104_122118_qjbmym.jpg' },
      { id: '26s-5', title: 'GPS Tracking', desc: 'Real-time tracking for peace of mind and strict schedule adherence.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178477/IMG_20260105_073555_nbejab.jpg' }
    ]
  },
  {
    id: '42s',
    name: '42 Seater (Coach)',
    tagline: 'Maximum Capacity for Grand Tours and Events',
    features: [
      { id: '42s-1', title: 'Coach Seating', desc: 'Plush, wide seating designed specifically for large group tours.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178471/IMG_20260104_180211_qu856s.jpg' },
      { id: '42s-2', title: 'Underbelly Storage', desc: 'Massive compartment space to handle bulk luggage easily.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178470/IMG_20260104_170951_fawbjj.jpg' },
      { id: '42s-3', title: 'Guide Microphone', desc: 'Integrated PA system perfect for tour guides and announcements.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178453/IMG_20260104_120638_d98vv4.jpg' },
      { id: '42s-4', title: 'Heavy Duty AC', desc: 'Powerful cooling system built to handle full passenger capacity.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178434/IMG_20260307_145035_vkmcmk.jpg' },
      { id: '42s-5', title: 'Long-Haul Ready', desc: 'Engineered for reliability across state lines and extended trips.', img: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178433/IMG_20260307_174756_o3ldnz.jpg' }
    ]
  }
]

// 2. Component for the individual scrolling rows
function FleetRow({ fleet, navigate }) {
  const scrollRef = useRef(null)

  // Drag-to-scroll functionality scoped to this specific row
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
    <div style={{ marginBottom: '5rem' }}>
      {/* Subheading & Tagline */}
      <div className="fleet-header">
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: 'var(--text)', marginBottom: '0.2rem', lineHeight: 1.2 }}>
          {fleet.name}
        </h3>
        <p style={{ color: 'var(--accent)', fontStyle: 'italic', fontSize: '1.05rem' }}>
          {fleet.tagline}
        </p>
      </div>

      {/* Horizontal Deck (5 Cards + 1 CTA) */}
      <div className="services-scroll cards-scroll-container" ref={scrollRef}>

        {/* The 5 Flashcards */}
        {fleet.features.map(card => (
          <div key={card.id} className="service-card">
            <img src={card.img} alt={card.title} loading="lazy" />
            <div className="service-card-content">
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {fleet.name.split(' ')[0]} Seater Class
              </span>
              <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                {card.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          </div>
        ))}

        {/* The 6th CTA Card linking to destinations */}
        <div className="service-card cta-card" onClick={() => navigate('/destinations')}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Book This <br />{fleet.name.split(' ')[0]} Seater
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem', padding: '0 1rem' }}>
            Check rates, compare routes, and plan your journey with us today.
          </p>
          <div className="cta-btn">
            Connect With Us →
          </div>
        </div>

      </div>
    </div>
  )
}

export default function OurServices() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        .services-scroll::-webkit-scrollbar { display: none; }
        .services-scroll { 
          -ms-overflow-style: none; scrollbar-width: none; 
          display: flex; gap: 1.5rem; overflow-x: auto;
          scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
        }
        
        .fleet-header {
          padding: 0 4rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid var(--accent);
          margin-left: 4rem;
        }

        .cards-scroll-container { padding: 1rem 4rem 3rem 4rem; }
        
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
          display: flex;
          flex-direction: column;
        }
        
        .service-card:active { cursor: grabbing; }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .service-card img {
          width: 100%; height: 55%; object-fit: cover;
          border-bottom: 1px solid var(--border);
        }

        .service-card-content {
          padding: 1.5rem;
          height: 45%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        /* 6th CTA Card Styling */
        .cta-card {
          background: var(--accent);
          justify-content: center;
          align-items: center;
          text-align: center;
          cursor: pointer;
          border: none;
        }
        .cta-card:hover { background: var(--accent-lt); }
        .cta-btn {
          padding: 0.8rem 1.5rem; border: 1px solid #fff; border-radius: 25px;
          color: #fff; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .fleet-header { padding: 0 1.5rem; margin-left: 1.5rem; }
          .cards-scroll-container { padding: 1rem 1.5rem 3rem 1.5rem; gap: 1rem; }
          .service-card {
            flex: 0 0 85vw;
            height: 420px;
          }
        }
      `}</style>

      <section id="our-services" style={{
        padding: '6rem 0', background: 'var(--bg-alt)', transition: 'background 0.4s',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '0 4rem', marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-label">Travel In Style</span>
          <h2 className="section-title">Our <em>Fleet</em> & Services</h2>
        </div>

        {/* Map through each fleet type and render a dedicated row */}
        {FLEET_DATA.map(fleet => (
          <FleetRow key={fleet.id} fleet={fleet} navigate={navigate} />
        ))}

      </section>
    </>
  )
}