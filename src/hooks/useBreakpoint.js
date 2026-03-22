import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true }
    const w = window.innerWidth
    return { isMobile: w <= 768, isTablet: w > 768 && w <= 1024, isDesktop: w > 1024 }
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setBp(prev => {
        const next = { isMobile: w <= 768, isTablet: w > 768 && w <= 1024, isDesktop: w > 1024 }
        if (prev.isMobile === next.isMobile && prev.isTablet === next.isTablet) return prev
        return next
      })
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return bp
}