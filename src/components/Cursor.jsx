import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Evaluated once at module load — no recalc on every render
const IS_TOUCH = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

// Selectors that trigger the grow effect — centralised so it's easy to extend
const HOVER_TARGETS = [
  'a', 'button',
  '.dest-card', '.test-card', '.why-card',
  '.g-tag', '.theme-toggle-btn',
  '.travel-card', '.g-img-v',
  '.service-card', '.about-preview-card',
  '.deck-card', '.w-card',
].join(', ')

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // ── Skip everything on touch / mobile ──────────────────────────────────
    if (IS_TOUCH) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // ── State ──────────────────────────────────────────────────────────────
    let mX = -200, mY = -200   // start off-screen so ring doesn't flash at 0,0
    let rX = -200, rY = -200
    let rafId
    let visible = false

    // Hide until first real mousemove — avoids the "flash at corner" bug
    gsap.set([dot, ring], { autoAlpha: 0 })

    // ── Dot: snappy follow with GSAP ───────────────────────────────────────
    const onMove = ({ clientX, clientY }) => {
      mX = clientX
      mY = clientY

      if (!visible) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 })
        visible = true
      }

      gsap.to(dot, { x: mX, y: mY, duration: 0.08, ease: 'power2.out' })
    }

    // ── Ring: smooth lag via RAF (much cheaper than GSAP ticker) ──────────
    const tickRing = () => {
      rX += (mX - rX) * 0.1
      rY += (mY - rY) * 0.1
      // translate by (pos - halfSize) so the centre of the ring tracks the cursor
      ring.style.transform = `translate(${rX - 18}px, ${rY - 18}px)`
      rafId = requestAnimationFrame(tickRing)
    }
    rafId = requestAnimationFrame(tickRing)

    // ── Fade when cursor leaves / re-enters the window ─────────────────────
    const hide = () => visible && gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
    const show = () => visible && gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 })

    // ── Grow / shrink on interactive elements ─────────────────────────────
    const grow = () => {
      gsap.to(ring, { width: 54, height: 54, duration: 0.28, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.35, duration: 0.28, ease: 'power2.out' })
    }
    const shrink = () => {
      gsap.to(ring, { width: 36, height: 36, duration: 0.28, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.28, ease: 'power2.out' })
    }

    // Keep a WeakSet so we never double-attach listeners to the same element
    const attached = new WeakSet()

    const attachHovers = () => {
      document.querySelectorAll(HOVER_TARGETS).forEach(el => {
        if (attached.has(el)) return
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
        attached.add(el)
      })
    }
    attachHovers()

    // Re-attach whenever new elements are added to the DOM (modals, lazy sections…)
    const observer = new MutationObserver(attachHovers)
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  // On touch devices render nothing — saves a small DOM footprint
  if (IS_TOUCH) return null

  return (
    <>
      {/* Dot — snappy */}
      <div
        ref={dotRef}
        className="custom-dot"
        style={{
          width: 10, height: 10,
          background: 'var(--accent)',
          borderRadius: '50%',
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Ring — laggy */}
      <div
        ref={ringRef}
        className="custom-ring"
        style={{
          width: 36, height: 36,
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 999998,
          transition: 'width 0.28s ease, height 0.28s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
