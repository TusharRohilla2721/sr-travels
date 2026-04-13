'use client'

import { useEffect, useRef } from 'react'

const ITEMS = [
  'NCR Employee Transport', 'Rajasthan Tours', 'Kerala Backwaters',
  'Ladakh Adventures', 'Goa Getaways', 'Pilgrimage Tours',
  'Corporate Travel', 'International Packages', 'Himachal Pradesh', 'Honeymoon Escapes'
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    // Inject keyframe directly via JS to bypass any CSS override
    const style = document.createElement('style')
    style.textContent = `
      @keyframes sr-marquee {
        0%   { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
    `
    document.head.appendChild(style)
    el.style.animation = 'sr-marquee 28s linear infinite'
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <div style={{ background: 'var(--bg-dark)', padding: '1.1rem 0', overflow: 'hidden', transition: 'background 0.4s', userSelect: 'none' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          width: 'max-content',
          willChange: 'transform',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        {DOUBLED.map((name, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 1.5rem',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
              gap: '1.5rem',
            }}
          >
            {name}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}