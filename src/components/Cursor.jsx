import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rX = 0, rY = 0, mX = 0, mY = 0
    let rafId

    const onMove = e => {
      mX = e.clientX; mY = e.clientY
      gsap.to(dot, { x: mX, y: mY, duration: 0.08, ease: 'power2.out' })
    }

    const animRing = () => {
      rX += (mX - rX) * 0.1
      rY += (mY - rY) * 0.1
      ring.style.transform = `translate(${rX - 18}px, ${rY - 18}px)`
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)


    const grow = () => {
      gsap.to(ring, { width: 56, height: 56, duration: 0.3 })
      gsap.to(dot, { scale: 0.4, duration: 0.3 })
    }
    const shrink = () => {
      gsap.to(ring, { width: 36, height: 36, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    const targets = 'a, button, .dest-card, .test-card, .why-card, .g-tag, .theme-toggle-btn, .travel-card, .g-img-v'
    const attach = () => {
      document.querySelectorAll(targets).forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()

    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .custom-dot, .custom-ring { display: none !important; }
        }
      `}</style>
      <div ref={dotRef} className="custom-dot" style={{
        width: 10, height: 10, background: 'var(--accent)', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999999,
        transform: 'translate(-50%,-50%)'
      }} />
      <div ref={ringRef} className="custom-ring" style={{
        width: 36, height: 36, border: '1.5px solid var(--accent)', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999998,
        transition: 'width 0.3s, height 0.3s'
      }} />
    </>
  )
}