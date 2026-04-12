'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'green' | 'warm' | 'dark'
const THEMES: Theme[] = ['green', 'warm', 'dark']
const ICONS: Record<Theme, string> = { green: '🌲', warm: '☀️', dark: '🌙' }

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  icon: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('green')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('sr-theme') as Theme | null
      if (stored && THEMES.includes(stored)) setTheme(stored)
    } catch { }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('sr-theme', theme) } catch { }
  }, [theme, mounted])

  const toggleTheme = () => setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, icon: ICONS[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}