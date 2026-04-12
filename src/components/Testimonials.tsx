'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createClient } from '@supabase/supabase-js'
gsap.registerPlugin(ScrollTrigger)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919289694400'

const PLACEHOLDERS = [
  { name: 'Priya Mehta', city: 'Mumbai', state: 'Maharashtra', from_city: 'Delhi', to_city: 'Jaipur', feedback: 'SR Travels turned our anniversary trip into an absolute fairytale. Every detail was perfect — from pickup to drop-off.' },
  { name: 'Rajesh Kumar', city: 'Bangalore', state: 'Karnataka', from_city: 'Gurgaon', to_city: 'Goa', feedback: 'Booked a family trip. The itinerary was impeccably planned and our driver incredibly professional. Highly recommend!' },
  { name: 'Arjun Sharma', city: 'Delhi', state: 'NCR', from_city: 'Delhi', to_city: 'Ladakh', feedback: 'Our Ladakh adventure was beyond words. SR Travels handled everything flawlessly. A bucket-list trip done right.' },
]

type Review = { name: string; city: string; state?: string; from_city?: string; to_city?: string; feedback: string }

function TestCard({ r }: { r: Review }) {
  return (
    <div className="test-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 4, padding: '2rem', cursor: 'default', transition: 'transform 0.35s, box-shadow 0.35s, background 0.4s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 40px rgba(0,0,0,0.07)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}>
      <div style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>★★★★★</div>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--text)', marginBottom: '1.4rem' }}>&ldquo;{r.feedback}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: 'var(--accent)', fontWeight: 600, flexShrink: 0, border: '1px solid var(--border)' }}>{(r.name || '?')[0].toUpperCase()}</div>
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text)' }}>{r.name}</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.city}{r.state ? `, ${r.state}` : ''}</p>
          {r.from_city && r.to_city && <p style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: 2 }}>{r.from_city} → {r.to_city}</p>}
        </div>
      </div>
    </div>
  )
}

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', city: '', state: '', from_city: '', to_city: '', journey_date: '', feedback: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    if (!supabase) { setStatus('success'); setTimeout(onClose, 2000); return }
    const { error } = await supabase.from('testimonials').insert([{ ...form, journey_date: form.journey_date || null, approved: false, rejected: false }] as any)
    setStatus(error ? 'error' : 'success')
    if (!error) setTimeout(onClose, 2000)
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none' }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '2.5rem', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-muted)' }}>✕</button>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.4rem' }}>Share Your Journey</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>We&apos;d love to hear about your experience with SR Travels 🚌</p>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉</p>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Thank You!</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Your story has been shared and is pending review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Your Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Verma" style={inputStyle} /></div>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>City *</label><input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="Delhi" style={inputStyle} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>State</label><input value={form.state} onChange={e => set('state', e.target.value)} placeholder="Delhi NCR" style={inputStyle} /></div>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Journey Date</label><input type="date" value={form.journey_date} onChange={e => set('journey_date', e.target.value)} style={inputStyle} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Travelled From</label><input value={form.from_city} onChange={e => set('from_city', e.target.value)} placeholder="Gurgaon" style={inputStyle} /></div>
              <div><label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Travelled To</label><input value={form.to_city} onChange={e => set('to_city', e.target.value)} placeholder="Jaipur" style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Your Feedback *</label>
              <textarea required value={form.feedback} onChange={e => set('feedback', e.target.value)} placeholder="Tell us about your experience..." style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
            </div>
            <button type="submit" disabled={status === 'submitting'} style={{ width: '100%', background: 'var(--accent)', color: '#fff', padding: '0.9rem', border: 'none', borderRadius: 3, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', opacity: status === 'submitting' ? 0.7 : 1 }}>
              {status === 'submitting' ? 'Submitting…' : 'Submit Feedback →'}
            </button>
            {status === 'error' && <p style={{ color: 'red', textAlign: 'center', marginTop: '0.8rem', fontSize: '0.82rem' }}>Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const load = async () => {
    setLoading(true)
    if (!supabase) { setReviews(PLACEHOLDERS); setLoading(false); return }
    const { data, error } = await supabase.from('approved_testimonials').select('*').order('approved_at', { ascending: false }).limit(9)
    setReviews(error || !data?.length ? PLACEHOLDERS : data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!loading && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(Array.from(gridRef.current!.children), { opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 85%' } })
      }, gridRef)
      return () => ctx.revert()
    }
  }, [loading])

  return (
    <>
      <section id="stories" style={{ padding: '7rem 4rem', background: 'var(--bg-alt)', transition: 'background 0.4s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label">What Travellers Say</span>
            <h2 className="section-title">Stories That <em>Inspire</em> Us</h2>
          </div>
          <button className="btn-outline" onClick={() => setShowModal(true)}>Share Your Journey ✦</button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '3rem' }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', animation: `ldBounce 1.1s ${i * 0.18}s infinite` }} />)}
          </div>
        ) : (
          <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {reviews.map((r, i) => <TestCard key={i} r={r} />)}
          </div>
        )}

        <style>{`
          @media (max-width: 900px) { #stories > div:last-of-type { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px) { #stories > div:last-of-type { grid-template-columns: 1fr !important; } }
          @media (max-width: 768px) { #stories { padding: 4.5rem 1.5rem !important; } }
        `}</style>
      </section>
      {showModal && <FeedbackModal onClose={() => { setShowModal(false); load() }} />}
    </>
  )
}