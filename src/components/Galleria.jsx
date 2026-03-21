import { useState, useRef, useEffect } from 'react'

const GALLERY_DATA = {
  all: [
    'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=500&q=75',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=75',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=75',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=75',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=75',
    'https://images.unsplash.com/photo-1597671500819-55e7e74c7f22?w=500&q=75',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=75',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=75',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=75',
    'https://images.unsplash.com/photo-1576016776958-dfa9d853d2f8?w=500&q=75',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75',
    'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=500&q=75',
  ],
  fleet: [
    'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=500&q=75',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=75',
    'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=500&q=75',
  ],
  services: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=75',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=75',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=75',
    'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=500&q=75',
  ],
  festivals: [
    'https://images.unsplash.com/photo-1576016776958-dfa9d853d2f8?w=500&q=75',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=75',
    'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=500&q=75',
    'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&q=75',
  ],
  destination: [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=75',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=75',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=75',
    'https://images.unsplash.com/photo-1597671500819-55e7e74c7f22?w=500&q=75',
  ],
  staff: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=75',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=75',
    'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=500&q=75',
  ],
}

const TABS = ['all', 'fleet', 'services', 'festivals', 'destination', 'staff']
const WIDTHS = ['12%', '19%', '15%', '22%', '16%', '16%']
const RATIOS = ['2/3', '4/5', '1/1', '3/4', '4/5', '2/3']
const SPEEDS = [24, 19, 22, 17, 25, 20]
const DIRS = ['gdn', 'gup', 'gdn', 'gup', 'gdn', 'gup']

function buildStrip(imgs) {
  const set = Array.from({ length: 20 }, (_, j) => imgs[j % imgs.length])
  return [...set, ...set]
}

export default function Galleria() {
  const [cat, setCat] = useState('all')
  const [dissolve, setDissolve] = useState(false)
  const [imgs, setImgs] = useState(() => buildStrip(GALLERY_DATA.all))
  const [lb, setLb] = useState(null)
  const stripsRef = useRef(null)
  const wrapRef = useRef(null)

  const changeCat = (next) => {
    if (next === cat) return
    setDissolve(true)
    setTimeout(() => {
      setImgs(buildStrip(GALLERY_DATA[next] || GALLERY_DATA.all))
      setCat(next)
      setTimeout(() => setDissolve(false), 50)
    }, 280)
  }


  useEffect(() => {
    const wrap = wrapRef.current
    const strips = stripsRef.current
    if (!wrap || !strips) return
    const onMove = e => {
      const r = wrap.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      strips.style.transform = `rotateX(${ny * -6}deg) rotateY(${nx * 6}deg)`
    }
    const onLeave = () => { strips.style.transform = 'rotateX(0deg) rotateY(0deg)' }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => { wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave) }
  }, [])


  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <style>{`
        @keyframes gdn { from { transform: translateY(-50%); } to { transform: translateY(0%); } }
        @keyframes gup { from { transform: translateY(0%);   } to { transform: translateY(-50%); } }
        @keyframes lbIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        .gin-dissolve { opacity: 0 !important; transition: opacity 0.28s !important; }
        .gin-show { opacity: 1 !important; transition: opacity 0.32s !important; }
        @media (hover: hover) and (pointer: fine) {
          .gin-wrap:hover .gin {
            animation-play-state: paused !important;
          }
        }
      `}
      </style>

      <section id="galleria" style={{
        height: '100vh', overflow: 'hidden', background: 'var(--bg-darkest)',
        position: 'relative', display: 'flex', flexDirection: 'column',
        transition: 'background 0.4s'
      }}>
        { }
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.6rem 3rem',
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.88) 0%, transparent 100%)',
          pointerEvents: 'none'
        }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem,2vw,1.9rem)',
            fontWeight: 300, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em',
            pointerEvents: 'auto'
          }}>
            <em style={{ fontStyle: 'italic' }}>Galleria</em> — SR Travels
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => changeCat(t)} style={{
                padding: '0.32rem 0.85rem',
                border: `1px solid ${t === cat ? 'var(--accent)' : 'rgba(255,255,255,0.15)'}`,
                background: t === cat ? 'var(--accent)' : 'rgba(0,0,0,0.35)',
                color: t === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'none', borderRadius: 20, backdropFilter: 'blur(8px)',
                transition: 'all 0.3s', fontFamily: 'DM Sans, sans-serif'
              }}>{t}</button>
            ))}
          </div>
        </div>

        { }
        <div ref={wrapRef} style={{
          flex: 1, perspective: '900px', perspectiveOrigin: '50% 50%',
          padding: '20px', overflow: 'hidden'
        }}>
          <div ref={stripsRef} style={{
            display: 'flex', width: '100%', height: '100%', gap: '20px',
            transformStyle: 'preserve-3d', transition: 'transform 0.14s ease-out',
            willChange: 'transform'
          }}>
            {WIDTHS.map((w, si) => (
              <div key={si} className="gin-wrap" style={{
                overflow: 'hidden', height: '100%', borderRadius: 8,
                flexShrink: 0, width: w, position: 'relative'
              }}>
                <div className={`gin ${dissolve ? 'gin-dissolve' : 'gin-show'}`} style={{
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  animationName: DIRS[si],
                  animationDuration: `${SPEEDS[si]}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}>
                  {imgs.map((src, ii) => (
                    <img key={ii} src={src} alt="SR Travels Gallery" loading="lazy"
                      onClick={() => setLb(src)}
                      style={{
                        width: '100%', objectFit: 'cover', borderRadius: 6,
                        flexShrink: 0, display: 'block',
                        aspectRatio: RATIOS[si],
                        border: '1px solid rgba(255,255,255,0.04)',
                        cursor: 'none', transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }
      {lb && (
        <div onClick={() => setLb(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <button onClick={() => setLb(null)} style={{
            position: 'fixed', top: '1.2rem', right: '1.4rem', zIndex: 3,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none', transition: 'background 0.2s'
          }}>✕</button>
          <img src={lb} alt="Gallery fullscreen" onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh', borderRadius: 8,
              objectFit: 'contain', boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              position: 'relative', zIndex: 2, animation: 'lbIn 0.28s cubic-bezier(0.22,1,0.36,1)'
            }} />
        </div>
      )}
    </>
  )
}
