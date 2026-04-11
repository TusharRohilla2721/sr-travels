import Link from 'next/link'

const LINKS = {
  Company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Galleria', href: '/galleria' },
  ],
  Support: [
    { label: 'Book via WhatsApp', href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` },
    { label: 'Call Us', href: 'tel:+919876543210' },
    { label: 'Email Us', href: 'mailto:info@srtravels.in' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container-sr section py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                SR
              </div>
              <span className="font-serif text-xl" style={{ color: 'var(--text)' }}>SR Travels</span>
            </div>
            <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
              Comfortable, reliable, and affordable travel across Maharashtra and beyond.
              Your trusted partner since 2010.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4
                className="text-xs uppercase tracking-widest font-semibold mb-5"
                style={{ color: 'var(--accent)' }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200 hover:text-accent"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <p>© {new Date().getFullYear()} SR Travels. All rights reserved.</p>
          <p>Made with ❤️ for every passenger</p>
        </div>
      </div>
    </footer>
  )
}
