export default function Footer() {
  const CONTACT = {
    whatsapp: '919812345678', // REPLACE WITH YOUR 10-DIGIT NUMBER (starting with 91)
    instagram: 'srtravels_official',
    linkedin: 'sr-travels',
    address: 'SR Travels, Main Road, Gurgaon, Haryana 122003'
  }

  return (
    <footer id="contact-footer" style={{
      background: 'var(--bg-darkest)', padding: '5rem 4rem 2rem',
      borderTop: '1px solid var(--border)', transition: 'background 0.4s'
    }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '4rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--text)' }}>SR Travels</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', lineHeight: 1.6 }}>
            25+ years of excellence on Indian roads. Trustworthy, comfortable, and affordable travel solutions for everyone.
          </p>
        </div>

        <div>
          <h4 className="section-label" style={{ fontSize: '0.65rem' }}>Social Connect</h4>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="social-btn">💬 WhatsApp</a>
            <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="social-btn">📸 Instagram</a>
            <a href={`https://linkedin.com/company/${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className="social-btn">💼 LinkedIn</a>
          </div>
        </div>

        <div>
          <h4 className="section-label" style={{ fontSize: '0.65rem' }}>Office Location</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>📍 {CONTACT.address}</p>
        </div>
      </div>
      <div style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
        © 2026 SR TRAVELS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  )
}