import { useCallback, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

interface DestinationCardProps {
  imageSrc: string
  cityName: string
  description: string
  onExplore?: () => void
}

export function DestinationCard({
  imageSrc,
  cityName,
  description,
  onExplore,
}: DestinationCardProps) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const xPct = (e.clientX - rect.left) / rect.width - 0.5
      const yPct = (e.clientY - rect.top) / rect.height - 0.5
      x.set(xPct)
      y.set(yPct)
    },
    [shouldReduceMotion, x, y],
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  const tiltStyle = shouldReduceMotion
    ? {}
    : { rotateY, rotateX, transformStyle: 'preserve-3d' as const }

  return (
    <motion.article
      className="destination-card"
      role="group"
      aria-label={`${cityName} — ${description}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="destination-card__image-wrap"
        animate={shouldReduceMotion ? {} : { scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img
          src={imageSrc}
          alt={`${cityName} — ${description}`}
          loading="lazy"
          draggable={false}
        />
      </motion.div>

      <div className="destination-card__overlay" />

      <div className="destination-card__content">
        <span className="destination-card__badge">romantic escape</span>

        <h2 className="destination-card__city">{cityName}</h2>

        <p className="destination-card__desc">{description}</p>

        {onExplore && (
          <button
            className="destination-card__cta"
            onClick={onExplore}
            type="button"
          >
            <span>Подробнее</span>
            <span className="destination-card__arrow" aria-hidden="true">
              &rarr;
            </span>
          </button>
        )}
      </div>

      <div
        className="destination-card__glow"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.article>
  )
}
