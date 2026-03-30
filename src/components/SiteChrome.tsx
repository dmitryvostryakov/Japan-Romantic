import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useActiveSection } from '../hooks/useActiveSection'

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}

type NavItem = {
  href: string
  label: string
  sections: string[]
  route?: string
}

const navItems: NavItem[] = [
  { href: '#why-now', label: 'Почему сейчас', sections: ['why-now'] },
  { href: '#frame', label: 'Маршрут', sections: ['frame', 'hotels', 'budget'] },
  { href: '#cities', label: 'Города', sections: ['tokyo', 'kyoto', 'osaka'] },
  { href: '#capsules', label: 'Стиль', sections: ['capsules', 'packing'] },
  { href: '#extras', label: 'На месте', sections: ['extras', 'links', 'reservations'] },
  { href: '/builder', label: 'Сборка', sections: ['builder'], route: '/builder' },
  { href: '#after-dark', label: 'После заката', sections: ['after-dark'] },
  { href: '#last-note', label: 'Итог', sections: ['last-note'] },
]

export function SiteChrome() {
  const { theme, toggle } = useTheme()
  const activeSection = useActiveSection()
  const location = useLocation()
  const isBuilderPage = location.pathname === '/builder'

  return (
    <>
    <a className="skip-to-content" href="#destinations">
      Перейти к содержимому
    </a>
    <header className="site-chrome">
      <Link className="site-mark" to="/">
        Japan edit / весна 2026
      </Link>
      <nav aria-label="Page sections">
        {navItems.map((item) =>
          item.route ? (
            <Link
              key={item.href}
              to={item.route}
              className={isBuilderPage ? 'is-active' : ''}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={!isBuilderPage && item.sections.includes(activeSection) ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>
      <button
        className="theme-toggle"
        onClick={toggle}
        aria-label={theme === 'light' ? 'Включить ночной режим' : 'Включить дневной режим'}
        title={theme === 'light' ? 'Ночной режим' : 'Дневной режим'}
      >
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </header>
    </>
  )
}
