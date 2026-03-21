import { useState } from 'react'

const EDGE_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-feedback`
  : null

const FIELD = ({ label, children }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{
      display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem'
    }}>{label}</label>
    {children}
  </div>
)

const inputStyle = {
  width: '100%', padding: '0.7rem 1rem',
  background: 'var(--bg-alt)', border: '1px solid var(--border)',
  borderRadius: 3, color: 'var(--text)', fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s, background 0.4s'
}

export default function FeedbackModal({ onClose }) {
  const [form, setForm] = useState({
    name: '', city: '', state: '', journey_date: '',
    from_city: '', to_city: '', feedback: ''
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const payload = { ...form, journey_date: form.journey_date || null }

    if (!EDGE_URL) {

      await new Promise(r => setTimeout(r, 800))
      setStatus('success')
      setLoading(false)
      setTimeout(onClose, 2000)
      return
    }

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('success')
      setTimeout(onClose, 2000)
    } catch (err) {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '2.5rem', width: '100%', maxWidth: 560,
        maxHeight: '90vh', overflowY: 'auto', position: 'relative',
        transition: 'background 0.4s, border-color 0.4s'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', cursor: 'none',
          fontSize: '1.4rem', color: 'var(--text-muted)', padding: '0.3rem'
        }}>✕</button>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
          fontWeight: 300, color: 'var(--text)', marginBottom: '0.4rem'
        }}>Share Your Journey</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
          We'd love to hear about your experience with SR Travels 🚌
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FIELD label="Your Name *">
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="Rahul Verma" style={inputStyle} />
            </FIELD>
            <FIELD label="City *">
              <input required value={form.city} onChange={e => set('city', e.target.value)}
                placeholder="Delhi" style={inputStyle} />
            </FIELD>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FIELD label="State">
              <input value={form.state} onChange={e => set('state', e.target.value)}
                placeholder="Delhi NCR" style={inputStyle} />
            </FIELD>
            <FIELD label="Journey Date">
              <input type="date" value={form.journey_date}
                onChange={e => set('journey_date', e.target.value)} style={inputStyle} />
            </FIELD>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FIELD label="Travelled From">
              <input value={form.from_city} onChange={e => set('from_city', e.target.value)}
                placeholder="Gurgaon" style={inputStyle} />
            </FIELD>
            <FIELD label="Travelled To">
              <input value={form.to_city} onChange={e => set('to_city', e.target.value)}
                placeholder="Jaipur" style={inputStyle} />
            </FIELD>
          </div>
          <FIELD label="Your Feedback *">
            <textarea required value={form.feedback} onChange={e => set('feedback', e.target.value)}
              placeholder="Tell us about your experience with SR Travels..."
              style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
          </FIELD>

          <button type="submit" disabled={loading} style={{
            width: '100%', background: 'var(--accent)', color: '#fff',
            padding: '0.9rem', border: 'none', borderRadius: 3,
            fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            fontWeight: 500, cursor: 'none', transition: 'background 0.3s, transform 0.2s',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Submitting…' : 'Submit Feedback →'}
          </button>

          {status === 'success' && (
            <div style={{
              marginTop: '0.8rem', padding: '0.6rem', borderRadius: 3, textAlign: 'center',
              background: 'rgba(37,211,102,0.1)', color: '#25D366', fontSize: '0.82rem'
            }}>✓ Thank you! Your story has been shared.</div>
          )}
          {status === 'error' && (
            <div style={{
              marginTop: '0.8rem', padding: '0.6rem', borderRadius: 3, textAlign: 'center',
              background: 'rgba(196,98,45,0.1)', color: 'var(--accent)', fontSize: '0.82rem'
            }}>✗ Something went wrong. Please try again.</div>
          )}
        </form>
      </div>
    </div>
  )
}
