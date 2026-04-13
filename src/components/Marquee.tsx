'use client'

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
        @keyframes marqueeRun {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeRun 24s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item {
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          gap: 1.5rem;
        }
        .marquee-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-play-state: paused; }
        }
      `}</style>
      <div style={{ background: 'var(--bg-dark)', padding: '1.1rem 0', overflow: 'hidden', transition: 'background 0.4s' }}>
        <div className="marquee-track">
          {DOUBLED.map((name, i) => (
            <div key={i} className="marquee-item">
              {name}
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}