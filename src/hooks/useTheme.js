import { useState, useEffect } from 'react'

const THEMES  = ['green', 'warm', 'dark']
const ICONS   = { green: '🌲', warm: '☀️', dark: '🌙' }

export function useTheme() {
  const saved = () => {
    try { return localStorage.getItem('sr-theme') || 'green' } catch { return 'green' }
  }

  const [theme, setTheme] = useState(saved)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('sr-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  }

  return { theme, toggleTheme, icon: ICONS[theme] }
}
