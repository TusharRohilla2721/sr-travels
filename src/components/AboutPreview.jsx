import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ABOUT_CARDS = [
  {
    tag: 'Intro',
    title: 'Driven By Trust',
    desc: 'Established in 2012-13, what began as a small step has grown into a dependable travel company built on discipline and integrity.'
  },
  {
    tag: 'The Founder',
    title: 'Sunder Rohilla',
    desc: '25+ years of experience. A visionary who transformed his humble beginnings into a legacy of reliable transport.'
  },
  {
    tag: 'The CEO',
    title: 'Tushar Rohilla',
    desc: 'Taking the helm to modernize operations. Brought SR travels online and managed over 100+ happy clients personally.'
  },
  {
    tag: 'Our Mission',
    title: 'Nationwide Expansion',
    desc: 'From dominating the NCR region to securing an All India Permit, our dreams are bound by no borders.'
  }
]

export default function AboutPreview() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

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
        .about-scroll::-webkit-scrollbar { display: none; }
        .about-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .about-preview-card {
          flex: 0 0 calc(280px);
          height: 320px;
          border-radius: 12px;
          padding: 2rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          scroll-snap-align: start;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: grab;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .section-header { padding: 0 4rem; }
        .cards-scroll-container { padding: 1rem 4rem 3rem 4rem; }

        @media (max-width: 768px) {
          .section-header { padding: 0 1.5rem; }
          .cards-scroll-container { padding: 1rem 1.5rem 3rem 1.5rem; gap: 1rem; }
          .about-preview-card {
            flex: 0 0 85vw;
            height: 300px;
            padding: 1.5rem;
          }
          .scroll-indicator-gradient { display: none !important; }
        }
        .about-preview-card:active { cursor: grabbing; }
        .about-preview-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      `}</style>

      <section id="about-preview" style={{
        padding: '6rem 0', background: 'var(--bg-alt)', transition: 'background 0.4s',
        display: 'flex', flexDirection: 'column'
      }}>
        <div className="section-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">About <em>Us</em></h2>
          </div>
          <button className="btn-outline" style={{ background: 'var(--text)', color: 'var(--bg)', border: 'none' }} onClick={() => navigate('/about')}>
            Read Full Story ✦
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Scroll indicator gradient */}
          <div className="scroll-indicator-gradient" style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: '3rem',
            width: '150px',
            background: 'linear-gradient(to left, var(--bg-alt), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'background 0.4s'
          }} />

          {/* Scroll hint text */}
          <div style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0.4,
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            <span>Scroll</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </div>

          <div className="about-scroll cards-scroll-container" ref={scrollRef} style={{
            display: 'flex', gap: '1.5rem', overflowX: 'auto',
            scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}>
            {ABOUT_CARDS.map((item, idx) => (
              <div key={idx} className="about-preview-card">
                <span style={{
                  display: 'inline-block', alignSelf: 'flex-start',
                  padding: '0.2rem 0.6rem', border: '1px solid var(--accent)', color: 'var(--accent)',
                  borderRadius: 20, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '1rem'
                }}>{item.tag}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.8rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}

            {/* CTA Card leading to About Page */}
            <div className="about-preview-card" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', cursor: 'pointer', alignItems: 'center', textAlign: 'center' }} onClick={() => navigate('/about')}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', color: '#fff', marginBottom: '1rem' }}>
                Want to see the whole journey?
              </h3>
              <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)' }}>Explore the interactive timelines ➔</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}