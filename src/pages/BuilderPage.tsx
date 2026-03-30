import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChapterHeader } from '../components/SectionPrimitives'
import { TripBuilder } from '../components/TripBuilder'

export function BuilderPage() {
  const shouldReduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sectionReveal = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.15 },
        variants: {
          hidden: { opacity: 0, y: 44 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
          },
        },
      }

  return (
    <main>
      <div className="builder-page-header">
        <Link to="/" className="builder-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          На главную
        </Link>
      </div>
      <motion.section
        className="section section-builder"
        id="builder"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="СБОРКА"
          page="13"
          title="Соберите свою поездку"
          description="Отели, рестораны, активности — соберите идеальную комбинацию за 5 минут."
        />
        <TripBuilder />
      </motion.section>
    </main>
  )
}
