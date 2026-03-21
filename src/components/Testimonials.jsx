import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase, TESTIMONIALS_VIEW } from '../lib/supabase'
import FeedbackModal from './FeedbackModal'
gsap.registerPlugin(ScrollTrigger)

const PLACEHOLDERS = [
  { name: 'Priya Mehta',  city: 'Mumbai',    state: 'Maharashtra', from_city: 'Delhi',   to_city: 'Jaipur', feedback: 'SR Travels turned our anniversary trip into an absolute fairytale. Every detail was perfect — from pickup to drop-off.' },
  { name: 'Rajesh Kumar', city: 'Bangalore', state: 'Karnataka',   from_city: 'Gurgaon', to_city: 'Goa',    feedback: 'Booked a family trip. The itinerary was impeccably planned and our driver incredibly professional. Highly recommend!' },
  { name: 'Arjun Sharma', city: 'Delhi',     state: 'NCR',         from_city: 'Delhi',   to_city: 'Ladakh', feedback: 'Our Ladakh adventure was beyond words. SR Travels handled everything flawlessly. A bucket-list trip done right.' },
]

function TestCard({ r }) {
  return (
    <div className="test-card" style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 4, padding: '2rem', cursor: 'none',
      transition: 'transform 0.35s, box-shadow 0.35s, background 0.4s, border-color 0.4s'
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.07)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
      <div style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>★★★★★</div>
      <p style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem',
        fontStyle: 'italic', lineHeight: 1.75, color: 'var(--text)', marginBottom: '1.4rem'
      }}>"{r.feedback}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem',
          color: 'var(--accent)', fontWeight: 600, flexShrink: 0, border: '1px solid var(--border)'
        }}>{(r.name || '?')[0].toUpperCase()}</div>
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text)' }}>{r.name}</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.city}{r.state ? `, ${r.state}` : ''}</p>
          {r.from_city && r.to_city && (
            <p style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: 2 }}>
              {r.from_city} → {r.to_city}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [showModal, setShowModal] = useState(false)
  const gridRef = useRef(null)

  const load = async () => {
    setLoading(true)
    if (!supabase) { setReviews(PLACEHOLDERS); setLoading(false); return }
    const { data, error } = await supabase
      .from(TESTIMONIALS_VIEW)
      .select('*')
      .order('approved_at', { ascending: false })
      .limit(9)
    setReviews(error || !data?.length ? PLACEHOLDERS : data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
      })
    }
  }, [loading])

  return (
    <>
      <section id="stories" style={{
        padding: '7rem 4rem', background: 'var(--bg-alt)', transition: 'background 0.4s'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <div>
            <span className="section-label">What Travellers Say</span>
            <h2 className="section-title">Stories That <em>Inspire</em> Us</h2>
          </div>
          <button className="btn-outline" onClick={() => setShowModal(true)}>
            Share Your Journey ✦
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '3rem' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%',
                animation: `ldBounce 1.1s ${i * 0.18}s infinite`
              }} />
            ))}
          </div>
        ) : (
          <div ref={gridRef} style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'
          }}>
            {reviews.map((r, i) => <TestCard key={i} r={r} />)}
          </div>
        )}

        <style>{`
          @keyframes ldBounce {
            0%,80%,100% { transform: translateY(0); }
            40%          { transform: translateY(-8px); }
          }
        `}</style>
      </section>

      {showModal && <FeedbackModal onClose={() => { setShowModal(false); load() }} />}
    </>
  )
}
