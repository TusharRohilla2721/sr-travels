import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { waLink } from '../lib/supabase'

const EDGE_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`
  : null

const sNav = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [msg, setMsg]   = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setMsg(null)

    if (!EDGE_URL) {
      await new Promise(r => setTimeout(r, 600))
      setMsg({ type: 'success', text: "✓ Got it! We'll be in touch soon." })
      setLoading(false); return
    }

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg({ type: 'success', text: "✓ Message sent! We'll be in touch soon." })
      setForm({ name: '', phone: '', message: '' })
    } catch {
      setMsg({ type: 'error', text: '✗ Error sending. Try WhatsApp instead.' })
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.9rem', marginBottom: '0.7rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3, color: 'rgba(255,255,255,0.8)',
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none',
    transition: 'border-color 0.2s, background 0.4s'
  }

  return (
    <footer id="contact-footer" style={{
      background: 'var(--bg-darkest)', padding: '5rem 4rem 2rem', transition: 'background 0.4s'
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.5fr',
        gap: '3rem', marginBottom: '4rem'
      }}>
        {}
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
            fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '1rem'
          }}>
            SR <span style={{ color: 'var(--accent)' }}>Travels</span>
          </div>
          <p style={{
            fontSize: '0.86rem', color: 'rgba(255,255,255,0.32)',
            lineHeight: 1.85, maxWidth: 260
          }}>
            Creating affordable, reliable travel experiences across India and beyond since 2012.
            Your journey is our commitment.
          </p>
        </div>

        {}
        <div>
          <p style={{
            fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', marginBottom: '1.2rem'
          }}>Explore</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              ['About Us',      () => sNav('about-company')],
              ['Why Choose Us', () => sNav('why-us')],
              ['Tour Packages', () => navigate('/destinations')],
              ['Stories',       () => sNav('stories')],
            ].map(([label, action]) => (
              <li key={label}><a onClick={action} style={{
                color: 'rgba(255,255,255,0.5)', fontSize: '0.86rem',
                cursor: 'none', transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-lt)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{label}</a></li>
            ))}
          </ul>
        </div>

        {}
        <div>
          <p style={{
            fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', marginBottom: '1.2rem'
          }}>Services</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Employee Transport (NCR)', 'Honeymoon Tours', 'Group Travel', 'Pilgrimage Tours', 'International Packages'].map(s => (
              <li key={s}><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.86rem' }}>{s}</span></li>
            ))}
          </ul>
        </div>

        {}
        <div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
            fontWeight: 400, color: 'rgba(255,255,255,0.8)', marginBottom: '1rem'
          }}>Get in Touch</p>
          <form onSubmit={handleSubmit}>
            <input required value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="Your Name" style={inputStyle} />
            <input value={form.phone} onChange={e => set('phone', e.target.value)}
              placeholder="Phone / Email" style={inputStyle} />
            <textarea value={form.message} onChange={e => set('message', e.target.value)}
              placeholder="Your message…" rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} />
            <button type="submit" disabled={loading} style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              padding: '0.65rem 1.8rem', fontSize: '0.75rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'none', borderRadius: 2,
              fontWeight: 500, transition: 'background 0.3s',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? 'Sending…' : 'Send Message'}
            </button>
            {msg && (
              <div style={{
                marginTop: '0.6rem', fontSize: '0.78rem', padding: '0.5rem',
                borderRadius: 3, textAlign: 'center',
                background: msg.type === 'success' ? 'rgba(37,211,102,0.1)' : 'rgba(196,98,45,0.1)',
                color: msg.type === 'success' ? '#25D366' : 'var(--accent)'
              }}>{msg.text}</div>
            )}
          </form>

          <div style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
            {}
            📞 +91 XX XXXX XXXX<br />
            ✉️ info@srtravels.com<br />
            <a href={waLink('Hi SR Travels!')} target="_blank" rel="noopener"
              style={{ color: '#25D366', fontSize: '0.78rem', cursor: 'none' }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
          © 2025 SR Travels. All rights reserved.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
          Driven by Trust. Delivered with Responsibility.
        </p>
      </div>
    </footer>
  )
}
