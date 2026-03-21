import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const srRef     = useRef(null)
  const lettersRef = useRef([])
  const lineRef   = useRef(null)
  const wrapRef   = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wrapRef.current, { display: 'none' })
        onComplete?.()
      }
    })
    tl
      .to(srRef.current,          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      .to(lettersRef.current,     { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to(lineRef.current,        { width: '280px', duration: 0.7, ease: 'power2.inOut' }, '-=0.2')
      .to(wrapRef.current,        { yPercent: -100, duration: 1.1, ease: 'power4.inOut', delay: 0.5 })
  }, [])

  const letters = 'TRAVELS'.split('')

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999, background: 'var(--loader-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div ref={srRef} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(6rem, 14vw, 11rem)',
          fontWeight: 300, color: 'var(--loader-txt)',
          lineHeight: 1, opacity: 0, transform: 'translateY(24px)'
        }}>SR</div>
        <div style={{ display: 'flex', gap: '0.08em', justifyContent: 'center',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.1rem, 2.8vw, 2.2rem)',
          letterSpacing: '0.45em', fontWeight: 300,
          color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginTop: '0.2rem'
        }}>
          {letters.map((l, i) => (
            <span key={i} ref={el => lettersRef.current[i] = el}
              style={{ display: 'inline-block', opacity: 0, transform: 'translateY(8px)' }}>
              {l}
            </span>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', overflow: 'hidden', height: 1 }}>
          <div ref={lineRef} style={{
            height: 1, background: 'rgba(255,255,255,0.3)', width: 0
          }} />
        </div>
      </div>
    </div>
  )
}
