'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const HOVER_TARGETS = [
    'a', 'button',
    '.dest-card', '.test-card', '.why-card',
    '.g-tag', '.theme-toggle-btn',
    '.travel-card', '.g-img-v',
    '.service-card', '.about-preview-card',
    '.deck-card', '.w-card',
    '.g-masonry-img', '.gp-card', '.gp-tab'
].join(', ')

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        if (isMobile) return
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mX = -200, mY = -200, rX = -200, rY = -200, rafId: number, visible = false
        gsap.set([dot, ring], { autoAlpha: 0 })

        const onMove = ({ clientX, clientY }: MouseEvent) => {
            mX = clientX; mY = clientY
            if (!visible) { gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 }); visible = true }
            gsap.to(dot, { x: mX, y: mY, duration: 0.08, ease: 'power2.out' })
        }

        const tickRing = () => {
            rX += (mX - rX) * 0.1; rY += (mY - rY) * 0.1
            ring.style.transform = `translate(${rX - 18}px, ${rY - 18}px)`
            rafId = requestAnimationFrame(tickRing)
        }
        rafId = requestAnimationFrame(tickRing)

        const hide = () => visible && gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
        const show = () => visible && gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 })
        const grow = () => { gsap.to(ring, { width: 54, height: 54, duration: 0.28, ease: 'power2.out' }); gsap.to(dot, { scale: 0.35, duration: 0.28, ease: 'power2.out' }) }
        const shrink = () => { gsap.to(ring, { width: 36, height: 36, duration: 0.28, ease: 'power2.out' }); gsap.to(dot, { scale: 1, duration: 0.28, ease: 'power2.out' }) }

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
        const observer = new MutationObserver(attachHovers)
        observer.observe(document.body, { childList: true, subtree: true })

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', hide)
        document.addEventListener('mouseenter', show)

        return () => {
            cancelAnimationFrame(rafId)
            observer.disconnect()
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', hide)
            document.removeEventListener('mouseenter', show)
        }
    }, [isMobile])

    if (isMobile) return null

    return (
        <>
            <div ref={dotRef} style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999999, transform: 'translate(-50%, -50%)', willChange: 'transform' }} />
            <div ref={ringRef} style={{ width: 36, height: 36, border: '1.5px solid var(--accent)', borderRadius: '50%', position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999998, transition: 'width 0.28s ease, height 0.28s ease', willChange: 'transform' }} />
        </>
    )
}