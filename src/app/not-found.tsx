import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: 'var(--bg)' }}
    >
      <p className="text-8xl font-serif mb-4" style={{ color: 'var(--accent)' }}>404</p>
      <h1 className="text-3xl font-serif font-light mb-3" style={{ color: 'var(--text)' }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--text-muted)' }}>
        Looks like this route doesn't exist. Let's get you back on track.
      </p>
      <Link href="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  )
}
