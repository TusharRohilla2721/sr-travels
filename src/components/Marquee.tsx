const MARQUEE_ITEMS = [
  '✦ Comfortable Buses',
  '✦ AC & Non-AC Available',
  '✦ On-Time Departure',
  '✦ Experienced Drivers',
  '✦ 24/7 Support',
  '✦ Safe Journeys',
  '✦ Affordable Fares',
  '✦ Multiple Routes',
]

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-8 text-sm uppercase tracking-widest font-medium shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            <span style={{ color: 'var(--accent)' }} className="mr-2">✦</span>
            {item.replace('✦ ', '')}
          </span>
        ))}
      </div>
    </div>
  )
}
