export default function Footer() {
  const CONTACT = {
    whatsapp: '919289694400',
    instagram: 'srtravels_official',
    linkedin: 'sr-travels',
    address: 'SR Travels, Office Address = Shop no. 1 Ganpati complex Atul Kataria Chowk Opposite Huda Nursery'
  }

  return (
    <footer id="contact-footer" style={{
      background: 'var(--bg-darkest)', padding: '6rem 4rem 3rem',
      borderTop: '1px solid var(--border)', transition: 'background 0.4s'
    }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '5rem' }}>

        {/* BRAND */}
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: 'var(--text)', marginBottom: '1.2rem' }}>
            SR <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Travels</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 320 }}>
            Reliable road travel solutions for over 25 years. From daily office shuttles to nationwide luxury tours.
          </p>
        </div>

        {/* HEADQUARTERS (Address) */}
        <div>
          <h4 className="section-label">Headquarters</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            📍 {CONTACT.address}
          </p>
          <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>Available 24/7</p>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h4 className="section-label">Social Connect</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="social-btn">
              <span>💬</span> WhatsApp Support
            </a>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="social-btn" style={{ flex: 1 }}>
                <span>📸</span> Instagram
              </a>
              <a href={`https://linkedin.com/company/${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className="social-btn" style={{ flex: 1 }}>
                <span>💼</span> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
        <span>© 2026 SR TRAVELS. ALL RIGHTS RESERVED.</span>
        <span style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</span>
      </div>
    </footer>
  )
}