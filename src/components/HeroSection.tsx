import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { hero, tripFrame } from '../trip-content'

const revealEase = [0.22, 1, 0.36, 1] as const

const floatingKanji = [
  { char: '旅', top: '18%', left: '72%', duration: 22, delay: 0, parallaxFactor: 0.3 },
  { char: '桜', top: '55%', left: '82%', duration: 28, delay: 4, parallaxFactor: 0.5 },
  { char: '恋', top: '35%', left: '90%', duration: 25, delay: 8, parallaxFactor: 0.15 },
]

export function HeroSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 96])
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.08],
  )
  const sunY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -48])

  // Individual kanji parallax transforms (cannot use hooks in a loop)
  const kanjiY0 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -120 * floatingKanji[0].parallaxFactor])
  const kanjiY1 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -120 * floatingKanji[1].parallaxFactor])
  const kanjiY2 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -120 * floatingKanji[2].parallaxFactor])
  const kanjiYTransforms = [kanjiY0, kanjiY1, kanjiY2]

  const titleWords = hero.title.split(' ')

  return (
    <section className="hero-section" id="top" ref={ref}>
      <motion.div
        className="hero-image-wrap"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          className="hero-image"
          src={hero.image.src}
          alt={hero.image.alt}
          fetchPriority="high"
        />
      </motion.div>

      {/* Mist layer */}
      {!shouldReduceMotion && (
        <div className="hero-mist-layer" aria-hidden="true">
          <div className="hero-mist hero-mist--1" />
          <div className="hero-mist hero-mist--2" />
        </div>
      )}

      <div className="hero-overlay hero-overlay--enhanced" />

      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, scale: [1, 1.03, 1] }
        }
        className="hero-sun"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        style={{ y: sunY }}
        transition={
          shouldReduceMotion
            ? { duration: 1.1, ease: revealEase }
            : {
                opacity: { duration: 1.1, ease: revealEase },
                y: { duration: 1.1, ease: revealEase },
                scale: {
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse' as const,
                  delay: 1.2,
                },
              }
        }
      />

      {/* Floating kanji */}
      {!shouldReduceMotion &&
        floatingKanji.map((k, i) => (
          <motion.span
            key={k.char}
            className="hero-kanji"
            aria-hidden="true"
            style={{
              top: k.top,
              left: k.left,
              y: kanjiYTransforms[i],
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 + k.delay * 0.1 }}
          >
            {k.char}
          </motion.span>
        ))}

      <div className="hero-grid">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hero-copy"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
          transition={{ duration: 0.9, ease: revealEase }}
        >
          <p className="hero-edition">{hero.edition}</p>
          <h1 className={shouldReduceMotion ? '' : 'hero-title-shimmer'}>
            {shouldReduceMotion ? (
              hero.title
            ) : (
              titleWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="hero-title-word"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.18,
                    ease: revealEase,
                  }}
                >
                  {word}
                </motion.span>
              ))
            )}
          </h1>
          <p className="hero-route">{hero.route}</p>
          <p className="hero-dek">{hero.dek}</p>
          <div className="hero-actions">
            <a className="hero-cta" href="#frame">
              {hero.ctaLabel}
            </a>
            <p className="hero-meta">{hero.version}</p>
          </div>
        </motion.div>

        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="trip-card"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 44 }}
          transition={{ duration: 0.95, delay: 0.15, ease: revealEase }}
        >
          <p className="mini-label">МАРШРУТ</p>
          <ul className="trip-legs">
            {tripFrame.flights.map((flight) => (
              <li key={`${flight.date}-${flight.route}`}>
                <span>{flight.date}</span>
                <strong>{flight.route}</strong>
              </li>
            ))}
          </ul>
          <p className="trip-card-name">{tripFrame.travelers}</p>
        </motion.article>

        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="hero-note"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 48 }}
          transition={{ duration: 0.95, delay: 0.25, ease: revealEase }}
        >
          <p>{hero.note}</p>
        </motion.aside>
      </div>
    </section>
  )
}
