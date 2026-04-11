export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div
          className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
        />
        <p className="text-xs uppercase tracking-widest animate-pulse" style={{ color: 'var(--text-muted)' }}>
          Loading…
        </p>
      </div>
    </div>
  )
}
