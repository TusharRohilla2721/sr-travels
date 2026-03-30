const ITEMS = [
  'NCR Employee Transport', 'Rajasthan Tours', 'Kerala Backwaters',
  'Ladakh Adventures', 'Goa Getaways', 'Pilgrimage Tours',
  'Corporate Travel', 'International Packages', 'Himachal Pradesh', 'Honeymoon Escapes'
]

export default function Marquee() {
  const content = ITEMS.map((name, i) => (
    <div key={i} className="marquee-item" style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic',
      color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: '3rem'
    }}>
      {name}
      <span style={{
        width: 4, height: 4, borderRadius: '50%',
        background: 'var(--accent)', flexShrink: 0, display: 'block'
      }} />
    </div>
  ));

  return (
    <div style={{
      background: 'var(--bg-dark)', padding: '1.1rem 0',
      overflow: 'hidden', transition: 'background 0.4s',
      display: 'flex', width: '100%'
    }}>
      <div className="marquee-track" style={{ display: 'flex' }}>
         <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem', animation: 'customMarquee 24s linear infinite', width: 'max-content' }}>
           {content}
         </div>
         <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem', animation: 'customMarquee 24s linear infinite', width: 'max-content' }}>
           {content}
         </div>
      </div>
      <style>{`
        @keyframes customMarquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-100%,0,0); }
        }
        [data-theme="light"] .marquee-item { color: rgba(26,26,26,0.45); }
      `}</style>
    </div>
  )
}
