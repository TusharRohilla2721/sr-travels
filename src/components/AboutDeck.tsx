'use client'

import { useEffect, useRef, useState } from 'react'


type CardProps = {
  id: string
  imgSrc: string
  imgAlt: string
  tag: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

function Card({ id, imgSrc, imgAlt, tag, title, subtitle, children }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div id={id} className="deck-card" style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 14, overflow: 'hidden', background: 'rgba(22,18,14,0.62)', backdropFilter: 'blur(24px) saturate(1.4)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)', transition: 'transform 0.3s', cursor: 'grab' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="deck-card-img" src={imgSrc} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 45%, rgba(22,18,14,0.75))' }} />
      </div>
      <div className={`deck-card-text${expanded ? ' is-expanded' : ''}`} style={{ padding: '2.6rem 2.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'hidden', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <span style={{ display: 'inline-flex', padding: '0.22rem 0.65rem', alignSelf: 'flex-start', background: 'rgba(196,98,45,0.18)', color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 2, marginBottom: '0.9rem', fontWeight: 500, border: '1px solid rgba(196,98,45,0.3)' }}>{tag}</span>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 2.3vw, 2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 1.15, marginBottom: '0.35rem' }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--accent-lt)', marginBottom: '1.1rem' }}>{subtitle}</p>}
        <div className="deck-card-content" style={{ fontSize: '0.84rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.58)' }}>{children}</div>
        <div className="read-more-wrapper">
          <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show Less ↑' : 'Read More ↓'}</button>
        </div>
      </div>
    </div>
  )
}

function Deck({ name, cards, bgIcon }: { name: string; cards: CardProps[]; bgIcon: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let isDown = false, startX = 0, scrollLeft = 0
    const onDown = (e: MouseEvent) => { isDown = true; el.style.cursor = 'grabbing'; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
    const onLeave = () => { isDown = false; el.style.cursor = 'grab' }
    const onUp = () => { isDown = false; el.style.cursor = 'grab' }
    const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 2 }
    el.addEventListener('mousedown', onDown); el.addEventListener('mouseleave', onLeave); el.addEventListener('mouseup', onUp); el.addEventListener('mousemove', onMove)
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseleave', onLeave); el.removeEventListener('mouseup', onUp); el.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div style={{ position: 'relative', background: '#181410', paddingBottom: '3rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 420, height: 420, opacity: 0.055, pointerEvents: 'none', zIndex: 0, filter: 'blur(3px)', transform: 'translate(-50%,-50%)', animation: 'bgRotate 20s linear infinite' }}>{bgIcon}</div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, rgba(0,0,0,0.55))' }} />
      <div className="deck-scroll" ref={containerRef} style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', cursor: 'grab', scrollBehavior: 'smooth', padding: '1rem 1.5rem 3rem 1.5rem', position: 'relative', zIndex: 2 }}>
        {cards.map((card, i) => (
          <div key={i} className="deck-card-wrapper">
            <Card {...card} id={`${name}-c${i}`} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginTop: '-1rem', userSelect: 'none', position: 'relative', zIndex: 2 }}>
        ← scroll to explore →
      </div>
    </div>
  )
}

const SteeringWheel = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="88" stroke="white" strokeWidth="8" />
    <circle cx="100" cy="100" r="18" stroke="white" strokeWidth="6" />
    <line x1="100" y1="12" x2="100" y2="82" stroke="white" strokeWidth="5" />
    <line x1="100" y1="118" x2="100" y2="188" stroke="white" strokeWidth="5" />
    <line x1="12" y1="100" x2="82" y2="100" stroke="white" strokeWidth="5" />
    <line x1="118" y1="100" x2="188" y2="100" stroke="white" strokeWidth="5" />
  </svg>
)

const Camera = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="60" width="160" height="110" rx="10" stroke="white" strokeWidth="7" />
    <rect x="30" y="40" width="50" height="25" rx="4" stroke="white" strokeWidth="5" />
    <circle cx="100" cy="118" r="38" stroke="white" strokeWidth="7" />
    <circle cx="100" cy="118" r="24" stroke="white" strokeWidth="5" />
    <circle cx="100" cy="118" r="9" stroke="white" strokeWidth="4" />
  </svg>
)

const SUNDER_CARDS: Omit<CardProps, 'id'>[] = [
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181543/WhatsApp_Image_2026-03-22_at_5.37.07_PM_xdlpsj.jpg',
    imgAlt: 'Sunder Rohilla',
    tag: 'Chapter 01 · The Visionary',
    title: 'The Heart Behind the Wheel',
    subtitle: 'A dream born from courage',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>Every great journey has a humble beginning. Sunder Rohilla — a man with 25 years of experience and a drive to build something meaningful.</p>
        <p style={{ marginBottom: '0.8rem' }}>Sunder once worked as a <strong>photographer</strong> to provide for his family. While skilled at capturing moments, he felt he was missing that real passion in daily life.</p>
        <p>When life threw a challenge his way, he knew he had to make a move. His first idea was rejected, but his ambition never faded.</p>
      </>
    ),
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181419/WhatsApp_Image_2026-03-22_at_5.37.46_PM_qs5upc.jpg',
    imgAlt: 'The Hustle',
    tag: 'Chapter 02 · The Hustle',
    title: 'Struggle, Grit & Legacy',
    subtitle: 'Building SR Travels from zero',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>Sunder moved to Gurgaon and started from scratch: <strong>By Day</strong> — drove buses for others, learning every route. <strong>By Night</strong> — continued photography to keep income flowing.</p>
        <p>In <strong>2012–2013</strong>, that hard work became SR Travels. Every profit was reinvested. The fleet grew. Today, SR Travels stands as proof that a courageous decision, backed by relentless effort, changes everything.</p>
      </>
    ),
  },
]

const TUSHAR_CARDS: Omit<CardProps, 'id'>[] = [
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774124348/CEO_1_ygojhd.jpg',
    imgAlt: 'Tushar Rohilla',
    tag: 'Chapter 01 · Introduction',
    title: 'The Heart Behind SR Travels',
    subtitle: 'A passion project since 10th grade',
    children: <p>Hey there! I&apos;m Tushar Rohilla, and my journey with SR Travels isn&apos;t just a business story — it&apos;s a passion project that started when I was just a kid in 10th grade. While most friends were gaming, I was at our parking grounds learning the travel business.</p>,
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774131690/CEO_2_a5rhr0.jpg',
    imgAlt: 'Ground Level Work',
    tag: 'Chapter 02 · Ground Up',
    title: 'Why I Started From the Ground',
    subtitle: 'The backbone is the team',
    children: <p>I&apos;ve always believed <strong>drivers are the backbone</strong> of our business. To truly understand operations — and build a genuine bond with my team — I spent every holiday through 12th grade on the ground. It wasn&apos;t about being a &quot;boss.&quot; It was about being <em>part of the team.</em></p>,
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774131722/CEO_3_xzc1oa.jpg',
    imgAlt: 'Office Work',
    tag: 'Chapter 03 · The Office',
    title: 'Moving to the Office',
    subtitle: 'Business, clients & connections',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>Once I understood operations, I moved to the business side: learning bus rates, building client relationships, attending direct meetings.</p>
        <p>Eventually, I brought SR Travels online. Today I&apos;ve personally handled <strong>100+ happy clients</strong> who know SR Travels through me — and me through SR Travels.</p>
      </>
    ),
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774131677/CEO_4_sfaigp.jpg',
    imgAlt: 'Pan-India Vision',
    tag: 'Chapter 04 · The Vision',
    title: 'Our Goal — Pan India',
    subtitle: 'From NCR to every corner of India',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>We started local, but we&apos;re growing fast. Currently, SR Travels provides <strong>top-notch employee transport</strong> across the entire NCR region.</p>
        <p>With our <strong>All India Permit</strong>, we offer premium tourist services nationwide. <strong>My dream is to take SR Travels Pan-India</strong> — we&apos;re already on our way.</p>
      </>
    ),
  },
]

export default function AboutDeck() {
  return (
    <>
      <style>{`
        .deck-scroll::-webkit-scrollbar { display: none; }
        .deck-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .deck-card-wrapper {
          flex: 0 0 clamp(640px, 56vw, 820px);
          height: clamp(400px, 50vh, 500px);
          scroll-snap-align: center;
        }
        @media (min-width: 769px) { .read-more-wrapper { display: none !important; } }
        @media (max-width: 768px) {
          .deck-card-wrapper { flex: 0 0 85vw; height: 500px !important; }
          /* Deck cards on mobile */
          .deck-card {
            width: 100% !important;
            height: 100% !important;
            min-height: auto !important;
            max-height: none !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: 54% 46% !important;
          }
          .deck-card-img {
            object-position: center top !important;
          }
          .deck-card-text {
            padding: 1.1rem 1.2rem !important;
            justify-content: flex-start !important;
            overflow-y: auto;
          }
          .deck-card-content { display: none; }
          .read-more-btn {
            margin-top: 0.8rem;
            padding: 0.35rem 0.9rem;
            background: rgba(196,98,45,0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            border-radius: 20px;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            align-self: flex-start;
          }
          .deck-card-text.is-expanded {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 14px !important;
            background: rgba(22,18,14,0.96) !important;
            backdrop-filter: blur(16px) !important;
            justify-content: flex-start !important;
            z-index: 10 !important;
            padding: 1.4rem !important;
          }
          .deck-card-text.is-expanded .deck-card-content { display: block; margin-bottom: 2rem; }
        }
      `}</style>

      <div style={{ background: 'var(--bg-alt)', padding: '4rem 1.5rem 2rem', transition: 'background 0.4s' }}>
        <span className="section-label">Meet the Founder</span>
        <h2 className="section-title">Sunder <em>Rohilla</em></h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
          {['Age 41', '25+ Years Experience', 'Founder & Owner'].map(t => (
            <span key={t} style={{ padding: '0.3rem 0.9rem', border: '1px solid var(--border)', borderRadius: 20, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
      </div>
      <Deck name="sunder" cards={SUNDER_CARDS.map((c, i) => ({ ...c, id: `sunder-c${i}` }))} bgIcon={SteeringWheel} />

      <div style={{ background: 'var(--bg)', padding: '4rem 1.5rem 2rem', transition: 'background 0.4s' }}>
        <span className="section-label">🚌 Meet the CEO</span>
        <h2 className="section-title">Tushar <em>Rohilla</em></h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
          {['Age 21', 'Co-Founder & CEO', '100+ Happy Clients'].map(t => (
            <span key={t} style={{ padding: '0.3rem 0.9rem', border: '1px solid var(--border)', borderRadius: 20, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
      </div>
      <Deck name="tushar" cards={TUSHAR_CARDS.map((c, i) => ({ ...c, id: `tushar-c${i}` }))} bgIcon={Camera} />
    </>
  )
}