import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Pre-defined set of preview images
const PREVIEW_DATA = [
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178471/IMG_20260104_180211_qu856s.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178470/IMG_20260104_170951_fawbjj.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177879/IMG_20260104_085406_lxpmfw.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178602/IMG_20260104_090144_qaala3.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178600/IMG_20260104_085020_v87sfb.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178515/IMG_20250610_155004_s3xyrp.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178497/IMG_20260104_085059_nuj6zm.jpg',
  'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178486/20260104_092638_tkqwbo.jpg',
]

const WIDTHS = ['12%', '19%', '15%', '22%', '16%', '16%']
const RATIOS = ['2/3', '4/5', '1/1', '3/4', '4/5', '2/3']
const SPEEDS = [24, 19, 22, 17, 25, 20]
const DIRS = ['gdn', 'gup', 'gdn', 'gup', 'gdn', 'gup']

function buildStrip(imgs) {
  const set = Array.from({ length: 20 }, (_, j) => imgs[j % imgs.length])
  return [...set, ...set]
}

export default function GalleriaPreview() {
  const navigate = useNavigate()
  const [imgs] = useState(() => buildStrip(PREVIEW_DATA))
  const stripsRef = useRef(null)
  const wrapRef = useRef(null)

  // Desktop Mouse move parallax
  useEffect(() => {
    const wrap = wrapRef.current
    const strips = stripsRef.current
    if (!wrap || !strips) return
    const onMove = e => {
      if (window.innerWidth <= 768) return
      const r = wrap.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      strips.style.transform = `rotateX(${ny * -6}deg) rotateY(${nx * 6}deg)`
    }
    const onLeave = () => { 
      if (window.innerWidth <= 768) return
      strips.style.transform = 'rotateX(0deg) rotateY(0deg)' 
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => { wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes gdn { from { transform: translateY(-50%); } to { transform: translateY(0%); } }
        @keyframes gup { from { transform: translateY(0%);   } to { transform: translateY(-50%); } }
        .slider-track { display: flex; gap: 1rem; padding: 1rem; width: max-content; }
        @keyframes slideX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        
        .section-header { padding: 2.5rem 4rem; }
        
        @media (max-width: 768px) {
          .section-header { padding: 2rem 1.5rem; }
          .desktop-grid { display: none !important; }
          .mobile-slider { display: flex !important; margin-bottom: 2rem; }
          .slider-track { padding: 0 !important; }
        }
      `}</style>

      <section id="galleria-preview" style={{
        height: '80vh', overflow: 'hidden', background: 'var(--bg-darkest)',
        position: 'relative', display: 'flex', flexDirection: 'column',
        transition: 'background 0.4s'
      }}>
        <div className="section-header" style={{
          zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'transparent', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Memories</span>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,2.5vw,2.5rem)',
              fontWeight: 300, color: '#fff', letterSpacing: '0.02em'
            }}>
              Galleria <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Preview</em>
            </h2>
          </div>
          <button className="btn-outline" style={{ background: 'var(--accent)', color: '#fff', border: 'none' }} onClick={() => navigate('/galleria')}>
            View All ✦
          </button>
        </div>

        {/* DESKTOP 3D GRID */}
        <div className="desktop-grid" ref={wrapRef} style={{
          flex: 1, minHeight: 0, perspective: '900px', perspectiveOrigin: '50% 50%',
          padding: '20px', overflow: 'hidden', display: 'flex'
        }}>
          <div ref={stripsRef} style={{
            display: 'flex', width: '100%', height: '100%', gap: '20px',
            transformStyle: 'preserve-3d', transition: 'transform 0.14s ease-out',
            willChange: 'transform'
          }}>
            {WIDTHS.map((w, si) => (
              <div key={si} className="gin-wrap" style={{ overflow: 'hidden', height: '100%', borderRadius: 8, flexShrink: 0, width: w, position: 'relative' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  animationName: DIRS[si], animationDuration: `${SPEEDS[si]}s`,
                  animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                }}>
                  {imgs.map((src, ii) => (
                    <img key={ii} src={src} alt="Gallery" loading="lazy" style={{
                      width: '100%', objectFit: 'cover', borderRadius: 6, flexShrink: 0, display: 'block',
                      aspectRatio: RATIOS[si], border: '1px solid rgba(255,255,255,0.04)',
                      transition: 'opacity 0.2s'
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE INFINITE 3D SLIDER */}
        <div className="mobile-slider" style={{
          display: 'none', flex: 1, alignItems: 'center', overflow: 'hidden', position: 'relative'
        }}>
          <div className="slider-track" style={{ animation: 'slideX 20s linear infinite' }}>
             {/* Duplicate images for infinite scroll effect */}
             {[...PREVIEW_DATA, ...PREVIEW_DATA].map((src, i) => (
                <img key={i} src={src} alt="Mobile Gallery" style={{
                  height: '35vh', width: 'auto', borderRadius: 12, objectFit: 'cover',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
                }} />
             ))}
          </div>
        </div>

      </section>
    </>
  )
}
