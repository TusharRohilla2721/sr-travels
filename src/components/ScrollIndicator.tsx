'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['#our-services', '#why-us', '#about-preview']

export default function ScrollIndicator() {
    const wrapRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!wrapRef.current || !arrowRef.current) return
        gsap.set(wrapRef.current, { autoAlpha: 0, y: 12 })
        const arrowTl = gsap.timeline({ repeat: -1 })
        arrowTl
            .to(arrowRef.current, { x: 5, opacity: 1, duration: 0.6, ease: 'power1.inOut' })
            .to(arrowRef.current, { x: 0, opacity: 0.55, duration: 0.6, ease: 'power1.inOut' })

        const triggers = SECTION_IDS.map(id =>
            ScrollTrigger.create({
                trigger: id,
                start: 'top 75%',
                end: 'bottom 25%',
                onEnter: () => gsap.to(wrapRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }),
                onLeave: () => gsap.to(wrapRef.current, { autoAlpha: 0, y: 12, duration: 0.35, ease: 'power2.in' }),
                onEnterBack: () => gsap.to(wrapRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }),
                onLeaveBack: () => gsap.to(wrapRef.current, { autoAlpha: 0, y: 12, duration: 0.35, ease: 'power2.in' }),
            })
        )
        return () => { arrowTl.kill(); triggers.forEach(t => t.kill()) }
    }, [])

    return (
        <div ref={wrapRef} style={{ position: 'fixed', bottom: '2.2rem', right: '2.2rem', zIndex: 9988, display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 1rem', background: 'rgba(0,0,0,0.58)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, pointerEvents: 'none', userSelect: 'none' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: 'DM Sans, sans-serif' }}>Scroll</span>
            <span ref={arrowRef} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}>→</span>
        </div>
    )
}