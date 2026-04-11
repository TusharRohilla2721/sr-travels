'use client'

import { useState } from 'react'

export default function WaFloat() {
  const [hovered, setHovered] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'
  const message = encodeURIComponent('Hi SR Travels! I want to book a seat.')

  return (
    <a
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300"
      style={{ filter: 'drop-shadow(0 4px 20px rgba(37,211,102,0.4))' }}
    >
      {/* Tooltip */}
      <span
        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)' }}
      >
        Book on WhatsApp
      </span>

      {/* Button */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 ${
          hovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ background: '#25D366' }}
      >
        {/* WhatsApp SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="white"
        >
          <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.69 5.138 2.003 7.354L1 31l7.82-2.051A14.94 14.94 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.333a12.27 12.27 0 0 1-6.248-1.706l-.448-.266-4.644 1.218 1.24-4.532-.293-.464A12.267 12.267 0 0 1 3.667 16C3.667 9.189 9.189 3.667 16 3.667S28.333 9.189 28.333 16 22.811 28.333 16 28.333zm6.724-9.19c-.368-.184-2.18-1.075-2.518-1.198-.337-.123-.583-.184-.828.184-.245.368-.95 1.198-1.165 1.443-.215.245-.43.276-.798.092-.368-.184-1.554-.573-2.96-1.826-1.094-.976-1.833-2.181-2.048-2.549-.215-.368-.023-.567.162-.75.166-.165.368-.43.552-.645.184-.215.245-.368.368-.613.123-.245.061-.46-.031-.644-.092-.184-.828-1.996-1.135-2.733-.298-.717-.602-.62-.828-.63l-.705-.012c-.245 0-.644.092-.981.46-.337.368-1.288 1.259-1.288 3.07s1.319 3.559 1.503 3.804c.184.245 2.595 3.963 6.29 5.558.879.379 1.565.606 2.1.776.883.28 1.686.24 2.32.146.708-.106 2.18-.892 2.487-1.753.307-.86.307-1.598.215-1.753-.092-.153-.337-.245-.705-.43z" />
        </svg>
      </div>

      {/* Pulse ring */}
      <span
        className="absolute -inset-1 rounded-full animate-ping opacity-30"
        style={{ background: '#25D366' }}
      />
    </a>
  )
}
