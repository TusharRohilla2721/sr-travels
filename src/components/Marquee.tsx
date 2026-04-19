'use client'

import { useEffect, useRef } from 'react'

const ITEMS = [
  'NCR Employee Transport', 'Rajasthan Tours', 'Kerala Backwaters',
  'Ladakh Adventures', 'Goa Getaways', 'Pilgrimage Tours',
  'Corporate Travel', 'International Packages', 'Himachal Pradesh', 'Honeymoon Escapes'
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes sr-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          will-change: transform;
          animation: sr-marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div style={{ background: 'var(--bg-dark)', padding: '1.1rem 0', overflow: 'hidden', transition: 'background 0.4s', userSelect: 'none' }}>
        <div className="marquee-track">
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
    </>
  )
}