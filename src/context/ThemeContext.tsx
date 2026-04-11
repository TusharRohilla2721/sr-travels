'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'green' | 'black'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isGreen: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('green')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sr-theme') as Theme | null
    if (stored === 'green' || stored === 'black') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('theme-green', 'theme-black')
    root.classList.add(`theme-${theme}`)
    localStorage.setItem('sr-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'green' ? 'black' : 'green'))
  }

  // Prevent flash of wrong theme
  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isGreen: theme === 'green' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}
