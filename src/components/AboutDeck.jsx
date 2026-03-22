import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Card({ id, imgSrc, imgAlt, tag, title, subtitle, children }) {
  const [expanded, setExpanded] = useState(false); // Read More Toggle

  return (
    <div id={id} className="deck-card" style={{
      position: 'absolute', left: '50%', top: '50%',
      width: 'min(860px, 86vw)', height: 'min(500px, 60vh)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderRadius: 14, overflow: 'hidden',
      background: 'rgba(22,18,14,0.62)',
      backdropFilter: 'blur(24px) saturate(1.4)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
      willChange: 'transform, opacity'
    }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="deck-card-img" src={imgSrc} alt={imgAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 45%, rgba(22,18,14,0.75))'
        }} />
      </div>

      {/* Dynamic is-expanded class applied here */}
      <div className={`deck-card-text ${expanded ? 'is-expanded' : ''}`} style={{
        padding: '2.6rem 2.4rem', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', overflowY: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <span style={{
          display: 'inline-flex', padding: '0.22rem 0.65rem', alignSelf: 'flex-start',
          background: 'rgba(196,98,45,0.18)', color: 'var(--accent)',
          fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          borderRadius: 2, marginBottom: '0.9rem', fontWeight: 500,
          border: '1px solid rgba(196,98,45,0.3)'
        }}>{tag}</span>

        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.4rem, 2.3vw, 2rem)', fontWeight: 300,
          color: 'rgba(255,255,255,0.9)', lineHeight: 1.15, marginBottom: '0.35rem'
        }}>{title}</h2>

        {subtitle && (
          <p style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '0.92rem',
            fontStyle: 'italic', color: 'var(--accent-lt)', marginBottom: '1.1rem'
          }}>{subtitle}</p>
        )}

        {/* Paragraphs are wrapped in this div so we can hide them on mobile */}
        <div className="deck-card-content" style={{ fontSize: '0.84rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.58)' }}>
          {children}
        </div>

        {/* Mobile-only Read More Button */}
        <div className="read-more-wrapper">
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less ↑' : 'Read More ↓'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Deck({ name, cards, outerHeight, bgIcon }) {
  const outerRef = useRef(null)
  const stickyRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = cards.map((_, i) => document.getElementById(`${name}-c${i}`))
      const n = cardEls.length

      cardEls.forEach((c, i) => {
        if (!c) return
        c.style.transform = ''
        c.style.transition = 'none'
        gsap.set(c, {
          xPercent: -50, yPercent: -50,
          x: i === 0 ? 0 : '110vw',
          scale: i === 0 ? 1 : 0.94,
          opacity: i === 0 ? 1 : 0,
          zIndex: 50 + i
        })
      })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      for (let i = 1; i < n; i++) {
        const pos = i - 1

        tl.fromTo(cardEls[i],
          { x: '110vw', opacity: 0, scale: 0.94 },
          { x: 0, opacity: 1, scale: 1, duration: 1 }, pos)

        tl.to(cardEls[i - 1],
          { x: -260, scale: 0.88, opacity: 0.35, duration: 1 }, pos)

        for (let j = 0; j < i - 1; j++) {
          const depth = i - j
          tl.to(cardEls[j], {
            x: -260 - (depth - 1) * 36,
            scale: Math.max(0.72, 0.88 - (depth - 1) * 0.05),
            opacity: Math.max(0.08, 0.35 - (depth - 1) * 0.12),
            duration: 1
          }, pos)
        }
      }

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 0.8,
        animation: tl
      })

      return () => ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === outerRef.current) t.kill()
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={el => { outerRef.current = el; containerRef.current = el }} style={{ height: outerHeight, position: 'relative' }}>
      <div ref={stickyRef} style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: '#181410'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 420, height: 420, opacity: 0.055, pointerEvents: 'none', zIndex: 0,
          filter: 'blur(3px)', transform: 'translate(-50%,-50%)',
          animation: 'bgRotate 20s linear infinite'
        }}>
          {bgIcon}
        </div>

        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, rgba(0,0,0,0.55))'
        }} />

        {cards.map((card, i) => (
          <Card key={i} id={`${name}-c${i}`} {...card} />
        ))}

        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 30, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)'
        }} id={`${name}-counter`}>
          1 / {cards.length}
        </div>
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
    <line x1="37" y1="37" x2="87" y2="87" stroke="white" strokeWidth="4" />
    <line x1="113" y1="113" x2="163" y2="163" stroke="white" strokeWidth="4" />
    <line x1="163" y1="37" x2="113" y2="87" stroke="white" strokeWidth="4" />
    <line x1="87" y1="113" x2="37" y2="163" stroke="white" strokeWidth="4" />
  </svg>
)

const Camera = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="60" width="160" height="110" rx="10" stroke="white" strokeWidth="7" />
    <rect x="30" y="40" width="50" height="25" rx="4" stroke="white" strokeWidth="5" />
    <rect x="148" y="44" width="22" height="18" rx="3" stroke="white" strokeWidth="5" />
    <circle cx="100" cy="118" r="38" stroke="white" strokeWidth="7" />
    <circle cx="100" cy="118" r="24" stroke="white" strokeWidth="5" />
    <circle cx="100" cy="118" r="9" stroke="white" strokeWidth="4" />
  </svg>
)

const SUNDER_CARDS = [
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181543/WhatsApp_Image_2026-03-22_at_5.37.07_PM_xdlpsj.jpg',
    imgAlt: 'Sunder Rohilla',
    tag: 'Chapter 01 · The Visionary',
    title: 'The Heart Behind the Wheel',
    subtitle: 'A dream born from courage',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>Every great journey has a humble beginning, and SR Travels is no different. Sunder Rohilla — a man with 25 years of experience and a drive to build something meaningful.</p>
        <p style={{ marginBottom: '0.8rem' }}>Sunder once worked as a <strong>photographer</strong> to provide for his family. While skilled at capturing moments, he felt he was missing that "kick" — that real passion in daily life.</p>
        <p>When life threw a challenge his way, he knew he had to make a move. His first idea was rejected, but his ambition never faded.</p>
      </>
    )
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
    )
  }
]

const TUSHAR_CARDS = [
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774124348/CEO_1_ygojhd.jpg',
    imgAlt: 'Tushar Rohilla',
    tag: 'Chapter 01 · Introduction',
    title: 'The Heart Behind SR Travels',
    subtitle: 'A passion project since 10th grade',
    children: (
      <p>Hey there! I'm Tushar Rohilla, and my journey with SR Travels isn't just a business story — it's a passion project that started when I was just a kid in 10th grade. While most friends were gaming, I was at our parking grounds learning the travel business. Whether Saturday, Sunday, or a festival — you'd find me with our drivers.</p>
    )
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774131690/CEO_2_a5rhr0.jpg',
    imgAlt: 'Ground Level Work',
    tag: 'Chapter 02 · Ground Up',
    title: 'Why I Started From the Ground',
    subtitle: 'The backbone is the team',
    children: (
      <p>I've always believed <strong>drivers are the backbone</strong> of our business. To truly understand operations — and build a genuine bond with my team — I spent every holiday through 12th grade on the ground. It wasn't about being a "boss." It was about being <em>part of the team.</em></p>
    )
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
        <p>Eventually, I brought SR Travels online. Today I've personally handled <strong>100+ happy clients</strong> who know SR Travels through me — and me through SR Travels.</p>
      </>
    )
  },
  {
    imgSrc: 'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774131677/CEO_4_sfaigp.jpg',
    imgAlt: 'Pan-India Vision',
    tag: 'Chapter 04 · The Vision',
    title: 'Our Goal — Pan India',
    subtitle: 'From NCR to every corner of India',
    children: (
      <>
        <p style={{ marginBottom: '0.8rem' }}>We started local, but we're growing fast. Currently, SR Travels provides <strong>top-notch employee transport</strong> across the entire NCR region.</p>
        <p>With our <strong>All India Permit</strong>, we offer premium tourist services nationwide. <strong>My dream is to take SR Travels Pan-India</strong> — we're already on our way.</p>
      </>
    )
  }
]

export default function AboutDeck() {
  return (
    <>
      <style>{`
        @keyframes bgRotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        
        /* Hide Read More on Desktop */
        @media (min-width: 769px) {
          .read-more-wrapper { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .deck-card {
            width: 90vw !important;
            height: 82vh !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: 45% 55% !important;
          }
          .deck-card-img {
            object-position: center 15% !important;
          }
          .deck-card-text {
            padding: 1.5rem 1.2rem !important; 
            justify-content: flex-start !important;
          }
          
          /* READ MORE LOGIC */
          .deck-card-content { display: none; } /* Hide paragraphs initially */
          
          .read-more-btn {
            margin-top: 1rem;
            padding: 0.4rem 1rem;
            background: rgba(196,98,45,0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            border-radius: 20px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s;
            align-self: flex-start;
          }
          
          /* The Expanding Blur Overlay */
          .deck-card-text.is-expanded {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 14px !important;
            background: rgba(22, 18, 14, 0.96) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            justify-content: center !important;
            z-index: 10 !important;
          }
          
          /* Show text when expanded */
          .deck-card-text.is-expanded .deck-card-content {
            display: block;
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <div style={{ background: 'var(--bg-alt)', padding: '4rem 4rem 2rem', transition: 'background 0.4s' }}
        id="sunder-label">
        <span className="section-label">Meet the Founder</span>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          Sunder <em>Rohilla</em>
        </h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
          {['Age 41', '25+ Years Experience', 'Founder & Owner'].map(t => (
            <span key={t} style={{
              padding: '0.3rem 0.9rem', border: '1px solid var(--border)',
              borderRadius: 20, fontSize: '0.7rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--text-muted)'
            }}>{t}</span>
          ))}
        </div>
      </div>
      <Deck name="sunder" cards={SUNDER_CARDS} outerHeight="200vh" bgIcon={SteeringWheel} />

      <div style={{ background: 'var(--bg)', padding: '4rem 4rem 2rem', transition: 'background 0.4s' }}
        id="tushar-label">
        <span className="section-label">🚌 Meet the CEO</span>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          Tushar <em>Rohilla</em>
        </h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
          {['Age 21', 'Co-Founder & CEO', '100+ Happy Clients'].map(t => (
            <span key={t} style={{
              padding: '0.3rem 0.9rem', border: '1px solid var(--border)',
              borderRadius: 20, fontSize: '0.7rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--text-muted)'
            }}>{t}</span>
          ))}
        </div>
      </div>
      <Deck name="tushar" cards={TUSHAR_CARDS} outerHeight="400vh" bgIcon={Camera} />
    </>
  )
}