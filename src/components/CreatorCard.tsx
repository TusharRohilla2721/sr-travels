'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const MY_WA = '919718771255'
const TECH = [
    { cat: 'Frontend', items: ['React', 'HTML', 'CSS', 'JavaScript'] },
    { cat: 'Mobile', items: ['Flutter', 'React Native'] },
    { cat: 'Backend', items: ['Node.js', 'Express.js'] },
    { cat: 'Database', items: ['PostgreSQL', 'Supabase'] },
    { cat: 'DevOps', items: ['Railway', 'Vercel', 'GitHub'] },
    { cat: 'AI / ML', items: ['Hugging Face', 'AI Model Interfaces'] },
]
const LANGS = ['Python', 'C++', 'C', 'Java', 'JavaScript']
const PROFICIENCY = ['Website Design & Development', 'Mobile App Development', 'AI Model Integration']

export default function CreatorCard() {
    const [open, setOpen] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!overlayRef.current) return
        gsap.set(overlayRef.current, { display: 'none' })
    }, [])

    useEffect(() => {
        if (!overlayRef.current || !modalRef.current) return
        if (open) {
            gsap.set(overlayRef.current, { display: 'flex' })
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
            gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.93, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: 'back.out(1.5)' })
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: () => { gsap.set(overlayRef.current, { display: 'none' }) } })
        }
    }, [open])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <>
            <button onClick={() => setOpen(true)} style={{ padding: '0.6rem 1.2rem', background: 'rgba(22,18,14,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 25, color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'var(--accent)'; b.style.color = '#fff' }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'rgba(22,18,14,0.75)'; b.style.color = 'rgba(255,255,255,0.7)' }}>
                <span>⚡</span> Know the Creator
            </button>

            <div ref={overlayRef} onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9995, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'none', alignItems: 'center', justifyContent: 'center', padding: '1.2rem' }}>
                <div ref={modalRef} onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 'min(760px, 92vw)', maxHeight: '90vh', background: 'rgba(16,14,11,0.96)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, boxShadow: '0 32px 80px rgba(0,0,0,0.7)', overflow: 'hidden', position: 'relative', display: 'grid', gridTemplateColumns: '220px 1fr' }}>
                    <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                    <div style={{ background: 'rgba(196,98,45,0.08)', borderRight: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem 1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                        <div style={{ width: 110, height: 110, borderRadius: '50%', border: '2px solid var(--accent)', overflow: 'hidden', flexShrink: 0 }}>
                            <img src="https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774184173/WhatsApp_Image_2026-03-22_at_6.25.37_PM_aql9iu.jpg" alt="Tanishq Panwar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, color: 'rgba(255,255,255,0.92)', marginBottom: '0.25rem' }}>Tanishq Panwar</h2>
                            <p style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Developer & Creator</p>
                        </div>
                        <div style={{ width: '100%' }}>
                            <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>Languages</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {LANGS.map(l => <span key={l} style={{ padding: '0.2rem 0.55rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{l}</span>)}
                            </div>
                        </div>
                        <a href={`https://wa.me/${MY_WA}?text=${encodeURIComponent('Hi Tanishq! I saw your work on SR Travels and wanted to connect.')}`} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem', background: '#25D366', color: '#fff', borderRadius: 8, fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>
                            WhatsApp Me
                        </a>
                    </div>

                    <div style={{ padding: '2.5rem 2.2rem', overflowY: 'auto', maxHeight: '80vh' }}>
                        <div style={{ padding: '1rem 1.2rem', marginBottom: '1.5rem', background: 'rgba(196,98,45,0.08)', border: '1px solid rgba(196,98,45,0.2)', borderRadius: 8 }}>
                            <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem' }}>🎓 Education</p>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginBottom: '0.2rem' }}>B.Tech — Information Technology with Network Security</p>
                            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>Netaji Subhas University of Technology</p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>Graduation Year: 2028</p>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem' }}>⚡ Proficiency</p>
                            {PROFICIENCY.map(p => <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}><span style={{ color: 'var(--accent)', fontSize: '0.65rem' }}>→</span><span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{p}</span></div>)}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.8rem' }}>🛠 Tech Stack</p>
                            {TECH.map(({ cat, items }) => (
                                <div key={cat} style={{ marginBottom: '0.8rem' }}>
                                    <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.35rem' }}>{cat}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                        {items.map(item => <span key={item} style={{ padding: '0.25rem 0.65rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)' }}>{item}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                            Designed & built by Tanishq Panwar · SR Travels © 2025
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}