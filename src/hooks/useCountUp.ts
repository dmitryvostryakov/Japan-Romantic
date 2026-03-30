import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: string
}

export function useCountUp({
  end,
  duration = 1.5,
  prefix = '',
  suffix = '',
  separator = ' ',
}: UseCountUpOptions): {
  ref: React.RefObject<HTMLElement | null>
  display: string
} {
  const ref = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) {
      setValue(end)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const durationMs = duration * 1000

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / durationMs, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  const formatted =
    prefix +
    value.toLocaleString('ru-RU').replace(/\s/g, separator) +
    suffix

  return { ref, display: formatted }
}
