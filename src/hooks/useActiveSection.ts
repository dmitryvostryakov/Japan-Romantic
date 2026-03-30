import { useEffect, useState } from 'react'

const NAV_SECTIONS = [
  'top',
  'destinations',
  'why-now',
  'frame',
  'hotels',
  'budget',
  'tokyo',
  'kyoto',
  'osaka',
  'reservations',
  'capsules',
  'packing',
  'extras',
  'links',
  'builder',
]

export function useActiveSection(): string {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    )

    for (const id of NAV_SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return active
}
