'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919289694400'
const waLink = (msg = '') => `https://wa.me/${WA_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`

const VEHICLES = [
    { key: 'price_7seater', label: '7 Seater' },
    { key: 'price_12seater', label: '12 Seater' },
    { key: 'price_16_urbania', label: '16 Seater (Premium Urbania)' },
    { key: 'price_20seater', label: '20 Seater' },
    { key: 'price_26seater', label: '26 Seater' },
    { key: 'price_42seater', label: '42 Seater' },
]

const SAMPLE_ROUTES = [
    { id: 1, from_city: 'Delhi', to_city: 'Jaipur', kilometers: 280, price_7seater: 3500, price_12seater: 5500, price_16_urbania: 7500, price_20seater: 9000, price_26seater: 12000, price_42seater: 18000 },
    { id: 2, from_city: 'Delhi', to_city: 'Agra', kilometers: 200, price_7seater: 2800, price_12seater: 4200, price_16_urbania: 5800, price_20seater: 7200, price_26seater: 9500, price_42seater: 14000 },
    { id: 3, from_city: 'Gurgaon', to_city: 'Chandigarh', kilometers: 250, price_7seater: 3200, price_12seater: 4800, price_16_urbania: 6800, price_20seater: 8200, price_26seater: 11000, price_42seater: 16500 },
    { id: 4, from_city: 'Delhi', to_city: 'Haridwar', kilometers: 220, price_7seater: 3000, price_12seater: 4500, price_16_urbania: 6200, price_20seater: 7800, price_26seater: 10200, price_42seater: 15500 },
    { id: 5, from_city: 'Delhi', to_city: 'Shimla', kilometers: 360, price_7seater: 4500, price_12seater: 7000, price_16_urbania: 9500, price_20seater: 12000, price_26seater: 15500, price_42seater: 23000 },
    { id: 6, from_city: 'Gurgaon', to_city: 'Rishikesh', kilometers: 280, price_7seater: 3800, price_12seater: 5800, price_16_urbania: 8000, price_20seater: 9800, price_26seater: 13000, price_42seater: 19500 },
    { id: 7, from_city: 'Delhi', to_city: 'Manali', kilometers: 540, price_7seater: 6500, price_12seater: 9500, price_16_urbania: 13000, price_20seater: 16000, price_26seater: 20500, price_42seater: 30000 },
    { id: 8, from_city: 'Delhi', to_city: 'Amritsar', kilometers: 450, price_7seater: 5500, price_12seater: 8000, price_16_urbania: 11000, price_20seater: 13500, price_26seater: 17500, price_42seater: 26000 },
    { id: 9, from_city: 'Gurgaon', to_city: 'Haridwar', kilometers: 260, price_7seater: 3400, price_12seater: 5200, price_16_urbania: 7200, price_20seater: 8800, price_26seater: 11500, price_42seater: 17000 },
]

type Route = typeof SAMPLE_ROUTES[0]

function RouteCard({ route }: { route: Route }) {
    const [vehicle, setVehicle] = useState('')
    const [estimate, setEstimate] = useState<{ price: number; label: string } | 'onrequest' | null>(null)

    const findEstimate = () => {
        if (!vehicle) return
        const v = VEHICLES.find(v => v.key === vehicle)
        const price = (route as any)[vehicle]
        setEstimate(price != null ? { price, label: v!.label } : 'onrequest')
    }

    const waMsg = estimate && estimate !== 'onrequest'
        ? `Hi SR Travels! I want a trip from ${route.from_city} to ${route.to_city} in a ${estimate.label}. Estimate shows ₹${estimate.price.toLocaleString('en-IN')}. Please confirm.`
        : `Hi SR Travels! I want a quote for a trip from ${route.from_city} to ${route.to_city}.`

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '0.65rem 1rem', background: 'var(--bg-alt)',
        border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text)',
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', marginBottom: '1rem',
        appearance: 'none' as const
    }

    return (
        <div className="travel-card"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}>

            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: 'var(--text)' }}>{route.from_city}</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} /><span>→</span><div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </div>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: 'var(--text)' }}>{route.to_city}</span>
                </div>
                {route.kilometers && <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>📍 {route.kilometers} km</span>}
            </div>

            <div style={{ padding: '1.2rem 1.5rem 1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Select Vehicle</label>
                <select value={vehicle} onChange={e => { setVehicle(e.target.value); setEstimate(null) }} style={inputStyle}>
                    <option value="">— Choose a vehicle —</option>
                    {VEHICLES.map(v => (
                        <option key={v.key} value={v.key} disabled={(route as any)[v.key] == null}>
                            {v.label}{(route as any)[v.key] == null ? ' (on request)' : ''}
                        </option>
                    ))}
                </select>
                <button onClick={findEstimate}
                    style={{ width: '100%', padding: '0.85rem', border: '1.5px solid var(--accent)', borderRadius: 3, background: 'transparent', color: 'var(--accent)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'var(--accent)'; el.style.color = '#fff' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = 'var(--accent)' }}>
                    Find an Estimate →
                </button>

                {estimate && (
                    <div style={{ marginTop: '1rem', padding: '1rem 1.2rem', background: 'var(--tag-bg)', borderRadius: 4, border: '1px solid var(--border)', animation: 'fadeIn 0.3s ease' }}>
                        {estimate === 'onrequest' ? (
                            <>
                                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--accent)' }}>On Request</div>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Please contact us for pricing on this vehicle type.</p>
                            </>
                        ) : (
                            <>
                                <span style={{ display: 'inline-block', padding: '0.15rem 0.6rem', background: 'var(--accent)', color: '#fff', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 20, marginBottom: '0.6rem' }}>{estimate.label}</span>
                                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.3rem' }}>≈ ₹{estimate.price.toLocaleString('en-IN')}</div>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Estimate only — final price may vary. Prices are negotiable!</p>
                            </>
                        )}
                        <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
                            style={{ marginTop: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.55rem 1.2rem', borderRadius: 25, fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>
                            {estimate === 'onrequest' ? 'Ask for quote' : 'Confirm on WhatsApp'}
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function DestinationsClient() {
    const [all, setAll] = useState<Route[]>([])
    const [filtered, setFiltered] = useState<Route[]>([])
    const [fromQ, setFromQ] = useState('')
    const [toQ, setToQ] = useState('')
    const [loading, setLoading] = useState(true)
    const [isDemo, setIsDemo] = useState(false)

    useEffect(() => {
        (async () => {
            if (!supabase) { setAll(SAMPLE_ROUTES); setFiltered(SAMPLE_ROUTES); setIsDemo(true); setLoading(false); return }
            const { data, error } = await supabase.from('travel_routes').select('*').order('from_city')
            const rows = (!error && data?.length) ? data : SAMPLE_ROUTES
            if (!error && !data?.length) setIsDemo(true)
            setAll(rows); setFiltered(rows); setLoading(false)
        })()
    }, [])

    useEffect(() => {
        const f = fromQ.toLowerCase(), t = toQ.toLowerCase()
        setFiltered(all.filter(r => (!f || r.from_city.toLowerCase().includes(f)) && (!t || r.to_city.toLowerCase().includes(t))))
    }, [fromQ, toQ, all])

    const iStyle: React.CSSProperties = {
        flex: 1, minWidth: 0, padding: '0.65rem 1rem', background: 'var(--card-bg)',
        border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text)',
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem'
    }

    return (
        <>
            <style>{`
        @media (max-width: 768px) {
          .dest-page-inner { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .dest-grid { grid-template-columns: 1fr !important; }
          .dest-announce { padding-left: 1.5rem !important; padding-right: 1.5rem !important; flex-wrap: wrap; }
          .dest-announce p { font-size: 0.75rem !important; }
          .dest-hero { padding: 3.5rem 1.5rem 2rem !important; }
          .dest-hero h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
          .dest-search { padding: 1rem 1.5rem !important; }
          .dest-search > div { flex-direction: column !important; }
        }
        select:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent) !important; }
      `}</style>

            {/* paddingTop: 80px accounts for fixed navbar */}
            <div style={{ paddingTop: '80px' }}>

                {/* Announcement bar */}
                <div className="dest-announce" style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)', padding: '0.8rem 3.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💬</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1, minWidth: '200px' }}>
                        <strong style={{ color: 'var(--accent)' }}>Heads up!</strong> Prices shown are <strong style={{ color: 'var(--accent)' }}>estimates</strong> — think of them as a starting point. Final pricing depends on dates, route specifics, and vehicle availability. Everything&apos;s negotiable!
                    </p>
                    <a href={waLink('Hi! I want to get a quote for a trip.')} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.55rem 1.2rem', borderRadius: 25, fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', textDecoration: 'none', zIndex: 1, position: 'relative', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>
                        Chat on WhatsApp
                    </a>
                </div>

                {/* Hero */}
                <div className="dest-hero" style={{ padding: '4rem 3.5rem 3rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden', transition: 'background 0.4s' }}>
                    <span className="section-label">Explore Routes</span>
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '0.8rem' }}>
                        Find Your <em style={{ fontStyle: 'italic', color: 'var(--accent-lt)' }}>Perfect</em> Journey
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: 480, lineHeight: 1.75 }}>Browse routes, pick your vehicle, and get an instant estimate. Transparent pricing — no surprises.</p>
                </div>

                {/* Search bar */}
                <div className="dest-search" style={{ padding: '1.5rem 3.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)', transition: 'background 0.4s' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Search:</span>
                        <input value={fromQ} onChange={e => setFromQ(e.target.value)} placeholder="Travelling from… (e.g. Delhi)" style={iStyle} />
                        <input value={toQ} onChange={e => setToQ(e.target.value)} placeholder="Travelling to… (e.g. Jaipur)" style={iStyle} />
                        <button className="btn-ghost" style={{ padding: '0.65rem 1.2rem', fontSize: '0.78rem', whiteSpace: 'nowrap', flexShrink: 0 }} onClick={() => { setFromQ(''); setToQ('') }}>Clear ✕</button>
                    </div>
                </div>

                {/* Routes grid */}
                <section className="dest-page-inner" style={{ padding: '3rem 3.5rem 5rem', background: 'var(--bg)', transition: 'background 0.4s' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
                        Showing <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{filtered.length}</span> route{filtered.length !== 1 ? 's' : ''}
                        {isDemo && <span style={{ marginLeft: '0.8rem', color: 'var(--accent)', fontSize: '0.72rem' }}>⚠️ Demo data — connect Supabase to show real routes</span>}
                    </p>

                    {loading ? (
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '4rem' }}>
                            {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', animation: `ldBounce 1.1s ${i * 0.18}s infinite` }} />)}
                        </div>
                    ) : !filtered.length ? (
                        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text)' }}>No Matches</h3>
                            <p style={{ fontSize: '0.88rem' }}>Try a different search term.</p>
                        </div>
                    ) : (
                        <div className="dest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {filtered.map(r => <RouteCard key={r.id} route={r} />)}
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}