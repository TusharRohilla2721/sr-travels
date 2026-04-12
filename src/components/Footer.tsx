'use client'
import Link from 'next/link'
import CreatorCard from '@/components/CreatorCard'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919289694400'

const CONTACT = {
  whatsapp: WA_NUMBER,
  instagram: 'srtravels_official',
  linkedin: 'sr-travels',
  address: 'Shop No. 1, Ganpati Complex, Atul Kataria Chowk, Opposite Huda Nursery, Gurgaon',
}

export default function Footer() {
  return (
    <footer id="contact-footer" style={{ background: 'var(--bg-darkest)', padding: '6rem 4rem 3rem', borderTop: '1px solid var(--border)', transition: 'background 0.4s' }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: 'var(--text)', marginBottom: '1.2rem' }}>
            SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 320 }}>
            Reliable road travel solutions for over 25 years. From daily office shuttles to nationwide luxury tours.
          </p>
        </div>
        <div>
          <h4 className="section-label">Headquarters</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>📍 {CONTACT.address}</p>
          <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>Available 24/7</p>
        </div>
        <div>
          <h4 className="section-label">Social Connect</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="social-btn"><span>💬</span> WhatsApp Support</a>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="social-btn" style={{ flex: 1 }}><span>📸</span> Instagram</a>
              <a href={`https://linkedin.com/company/${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className="social-btn" style={{ flex: 1 }}><span>💼</span> LinkedIn</a>
            </div>
          </div>
          <br />
          <CreatorCard />
        </div>
      </div>
      <div style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
        <span>© {new Date().getFullYear()} SR TRAVELS. ALL RIGHTS RESERVED.</span>
        <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.1em' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button>
      </div>
      <style>{`
        .footer-grid { grid-template-columns: 1.5fr 1fr 1.5fr; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } footer { padding: 4.5rem 1.5rem !important; } }
      `}</style>
    </footer>
  )
}