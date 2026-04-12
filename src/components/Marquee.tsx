const ITEMS = [
  'NCR Employee Transport', 'Rajasthan Tours', 'Kerala Backwaters',
  'Ladakh Adventures', 'Goa Getaways', 'Pilgrimage Tours',
  'Corporate Travel', 'International Packages', 'Himachal Pradesh', 'Honeymoon Escapes'
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div style={{ background: 'var(--bg-dark)', padding: '1.1rem 0', overflow: 'hidden', transition: 'background 0.4s' }}>
      <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 24s linear infinite', width: 'max-content' }}>
        {DOUBLED.map((name, i) => (
          <div key={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3rem' }}>
            {name}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}