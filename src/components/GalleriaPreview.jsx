import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TAGGED_IMAGES = {
  all: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178471/IMG_20260104_180211_qu856s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178470/IMG_20260104_170951_fawbjj.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177879/IMG_20260104_085406_lxpmfw.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178602/IMG_20260104_090144_qaala3.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178600/IMG_20260104_085020_v87sfb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178515/IMG_20250610_155004_s3xyrp.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178497/IMG_20260104_085059_nuj6zm.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178486/20260104_092638_tkqwbo.jpg',
  ],
  fleet: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173358/FLEET_2_a8bsy1.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173363/WhatsApp_Image_2026-03-06_at_12.21.57_AM_f8jq4k.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173365/WhatsApp_Image_2026-03-06_at_12.21.58_AM_ur8gjv.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.22.20_AM_aflbpk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.31_AM_1_srrkry.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173377/WhatsApp_Image_2026-03-06_at_12.25.15_AM_k5okav.jpg',
  ],
  destinations: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178434/IMG_20260307_145035_vkmcmk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178427/IMG_20260308_140020_kgjtlb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178408/IMG_20260307_150400_szvpsf.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178399/IMG_20260307_174752_fojf2g.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178354/IMG_20260307_175402_u1lojk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178338/IMG_20260306_185602_ubgu4s.jpg',
  ],
  team: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174651/WhatsApp_Image_2026-03-22_at_3.37.50_PM_joq0ac.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173722/WhatsApp_Image_2026-03-06_at_12.22.29_AM_jg2d1a.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181421/WhatsApp_Image_2026-03-22_at_5.29.15_PM_rgaliv.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181420/WhatsApp_Image_2026-03-22_at_5.27.48_PM_mivzwt.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181417/WhatsApp_Image_2026-03-22_at_5.30.26_PM_kegtbh.jpg',
  ],
}

const TABS = ['all', 'fleet', 'destinations', 'team']

export default function GalleriaPreview() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [active, setActive] = useState(1)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const imgs = TAGGED_IMAGES[activeTab] || TAGGED_IMAGES.all

  // Reset index
  useEffect(() => { setActive(1) }, [activeTab])

  // Swipe navigation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onDown = e => { isDragging.current = true; startX.current = e.clientX || e.touches?.[0]?.clientX }
    const onUp = e => {
      if (!isDragging.current) return
      isDragging.current = false
      const endX = e.clientX || e.changedTouches?.[0]?.clientX
      const diff = startX.current - endX
      if (Math.abs(diff) > 40) {
        if (diff > 0) setActive(a => Math.min(a + 1, imgs.length))
        else setActive(a => Math.max(a - 1, 0))
      }
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchend', onUp)
    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchend', onUp)
    }
  }, [imgs.length])

  return (
    <>
      <style>{`
        .gp-section { height: 100vh; display: flex; flex-direction: column; background: var(--bg-darkest); overflow: hidden; position: relative; }
        
        .gp-header { padding: 2.5rem 4rem 1rem; display: flex; justify-content: space-between; align-items: flex-end; flex-shrink: 0; flex-wrap: wrap; gap: 1rem; }
        
        .gp-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .gp-tab {
          padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.65rem;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.3);
          color: rgba(255,255,255,0.5); transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .gp-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }

        .gp-stage { flex: 1; min-height: 0; position: relative; perspective: 1200px; display: flex; align-items: center; justify-content: center; user-select: none; }
        
        .gp-card {
          position: absolute; width: clamp(220px, 26vw, 340px); height: clamp(300px, 60vh, 520px);
          border-radius: 16px; overflow: hidden; cursor: pointer;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s, box-shadow 0.55s;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .gp-card img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
        .gp-card-cta {
          width: clamp(220px, 26vw, 340px); height: clamp(300px, 60vh, 520px);
          background: var(--accent); border-radius: 16px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; padding: 2rem; cursor: pointer;
        }
        
        .gp-nav { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; align-items: center; }
        .gp-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3); transition: all 0.3s; cursor: pointer; }
        .gp-dot.active { width: 20px; border-radius: 3px; background: var(--accent); }
        
        .gp-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; font-size: 1.1rem; backdrop-filter: blur(8px); z-index: 10; }
        .gp-arrow:hover { background: var(--accent); border-color: var(--accent); }
        .gp-arrow.left { left: 1.5rem; }
        .gp-arrow.right { right: 1.5rem; }
        
        @media (max-width: 768px) {
          .gp-header { padding: 1.5rem 1.5rem 0.5rem; }
          .gp-card { width: clamp(200px, 75vw, 280px); height: clamp(280px, 55vh, 440px); }
          .gp-card-cta { width: clamp(200px, 75vw, 280px); height: clamp(280px, 55vh, 440px); }
          .gp-arrow.left { left: 0.5rem; }
          .gp-arrow.right { right: 0.5rem; }
        }
      `}</style>

      <section className="gp-section" id="galleria-preview">
        <div className="gp-header">
          <div>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Memories</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,2.5vw,2.5rem)', fontWeight: 300, color: '#fff' }}>
              Galleria <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Preview</em>
            </h2>
          </div>
          <div className="gp-tabs">
            {TABS.map(t => (
              <button key={t} className={`gp-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="gp-stage" ref={containerRef}>
          {/* Left arrow */}
          <button className="gp-arrow left" onClick={() => setActive(a => Math.max(a - 1, 0))}>‹</button>

          {/* Image cards */}
          {imgs.map((src, i) => {
            const offset = i + 1 - active
            const absOff = Math.abs(offset)
            if (absOff > 3) return null

            const tx = offset * 56
            const tz = -absOff * 120
            const ry = -offset * 12
            const scale = 1 - absOff * 0.12
            const opacity = 1 - absOff * 0.22
            const zIndex = 10 - absOff

            return (
              <div
                key={src + i}
                className="gp-card"
                onClick={() => offset === 0 ? null : setActive(i + 1)}
                style={{
                  transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  outline: offset === 0 ? '2px solid var(--accent)' : 'none',
                }}
              >
                <img src={src} alt="Gallery" />
              </div>
            )
          })}

          {/* CTA card */}
          {(() => {
            const offset = imgs.length + 1 - active
            const absOff = Math.abs(offset)
            if (absOff > 3) return null
            const tx = offset * 56
            const tz = -absOff * 120
            const ry = -offset * 12
            const scale = 1 - absOff * 0.12
            const opacity = 1 - absOff * 0.22
            return (
              <div
                className="gp-card-cta"
                onClick={() => offset === 0 ? navigate('/galleria') : setActive(imgs.length + 1)}
                style={{
                  position: 'absolute',
                  transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  zIndex: 10 - absOff,
                  transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s',
                  outline: offset === 0 ? '2px solid rgba(255,255,255,0.4)' : 'none',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '0.8rem' }}>
                  See Full Gallery
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Explore all our memories — trips, fleet, team and destinations.
                </p>
                <button style={{ padding: '0.6rem 1.5rem', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 24, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  View All
                </button>
              </div>
            )
          })()}

          {/* Right arrow */}
          <button className="gp-arrow right" onClick={() => setActive(a => Math.min(a + 1, imgs.length + 1))}>›</button>
        </div>

        {/* Dot navigation */}
        <div className="gp-nav">
          {[...imgs, 'cta'].map((_, i) => (
            <div key={i} className={`gp-dot ${active === i + 1 ? 'active' : ''}`} onClick={() => setActive(i + 1)} />
          ))}
        </div>
      </section>
    </>
  )
}
