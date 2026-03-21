import { useState, useEffect } from 'react'

const THEMES  = ['warm', 'dark', 'light']
const ICONS   = { warm: '🌤', dark: '🌙', light: '☀️' }

export function useTheme() {
  const saved = () => {
    try { return localStorage.getItem('sr-theme') || 'warm' } catch { return 'warm' }
  }

  const [theme, setTheme] = useState(saved)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('sr-theme', theme) } catch {}
  }, [theme])

  const cycle = () => {
    setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  }

  return { theme, cycle, icon: ICONS[theme] }
}
