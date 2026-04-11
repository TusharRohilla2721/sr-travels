'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: 'var(--bg)' }}
    >
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-2xl font-serif font-light mb-3" style={{ color: 'var(--text)' }}>
        Something went wrong
      </h2>
      <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--text-muted)' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button onClick={reset} className="btn-primary">
        Try Again
      </button>
    </div>
  )
}
