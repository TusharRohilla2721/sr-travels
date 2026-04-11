'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { ApprovedTestimonial } from '@/types/database.types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fallback static testimonials
const FALLBACK: ApprovedTestimonial[] = [
  { id: 1, created_at: '', name: 'Rahul Sharma', review: 'Excellent service! The bus was clean and departed on time. Will definitely book again with SR Travels.', rating: 5, location: 'Mumbai', avatar_url: null },
  { id: 2, created_at: '', name: 'Priya Mehta', review: 'Very comfortable journey. The driver was professional and the AC was working perfectly.', rating: 5, location: 'Pune', avatar_url: null },
  { id: 3, created_at: '', name: 'Akash Patel', review: 'Best travel experience! Affordable prices and great service. Highly recommended.', rating: 4, location: 'Nashik', avatar_url: null },
  { id: 4, created_at: '', name: 'Sneha Kulkarni', review: 'SR Travels has been my go-to for years. Always reliable and the staff is very helpful.', rating: 5, location: 'Aurangabad', avatar_url: null },
  { id: 5, created_at: '', name: 'Vijay Desai', review: 'Booked on WhatsApp in 2 minutes flat. The journey was smooth and the seats comfortable.', rating: 5, location: 'Nagpur', avatar_url: null },
  { id: 6, created_at: '', name: 'Anita Singh', review: 'Great value for money. Clean bus, on-time departure, and friendly crew.', rating: 4, location: 'Solapur', avatar_url: null },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < rating ? 'var(--accent)' : 'var(--border)'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<ApprovedTestimonial[]>(FALLBACK)
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    supabase
      .from('approved_testimonials')
      .select('*')
      .limit(9)
      .then(({ data }) => {
        if (data && data.length > 0) setReviews(data)
      })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reviews])

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container-sr">
        <p className="section-subtitle">What Passengers Say</p>
        <div className="accent-line" />
        <h2 className="section-title">Testimonials</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {reviews.slice(0, 6).map((r) => (
            <div key={r.id} className="review-card card-sr p-6 flex flex-col gap-4">
              <StarRating rating={r.rating} />
              <p className="text-sm leading-relaxed flex-1 italic" style={{ color: 'var(--text-muted)' }}>
                &ldquo;{r.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{r.name}</p>
                  {r.location && (
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Feedback CTA */}
        <div className="text-center mt-12">
          <button onClick={() => setModalOpen(true)} className="btn-outline">
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {modalOpen && <FeedbackModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}

// ── Inline Feedback Modal ────────────────────────────────────
function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', location: '', review: '', rating: 5 })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.review) return
    setStatus('submitting')
    const { error } = await supabase.from('testimonials').insert([{ ...form, approved: false }])
    setStatus(error ? 'error' : 'success')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="card-sr w-full max-w-md p-8 relative" style={{ background: 'var(--surface)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/10 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-5xl mb-4">🎉</p>
            <h3 className="font-serif text-2xl mb-2" style={{ color: 'var(--text)' }}>Thank You!</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Your review will be published after approval.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-2xl mb-6" style={{ color: 'var(--text)' }}>Share Your Review</h3>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
              <input
                type="text"
                placeholder="City / Location"
                value={form.location}
                onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
              <textarea
                placeholder="Your review *"
                rows={4}
                value={form.review}
                onChange={(e) => setForm(p => ({ ...p, review: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
              {/* Star picker */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setForm(p => ({ ...p, rating: i + 1 }))}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    <span style={{ color: i < form.rating ? 'var(--accent)' : 'var(--border)' }}>★</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className="btn-primary justify-center mt-2"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit Review'}
              </button>
              {status === 'error' && (
                <p className="text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
