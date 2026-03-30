import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cities } from '../trip-content'

const cityColors: Record<string, string> = {
  tokyo: '#2c5f8a',
  kyoto: '#8a4c2c',
  osaka: '#5a8a2c',
}

const cityNights: Record<string, number> = {
  tokyo: 4,
  kyoto: 3,
  osaka: 2,
}

const totalNights = Object.values(cityNights).reduce((a, b) => a + b, 0)

export function TripTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end center'],
  })
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleCityClick = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
  }

  let accumulatedFraction = 0

  return (
    <div className="trip-timeline" ref={trackRef}>
      <div className="trip-timeline__track">
        {/* Animated progress line */}
        <motion.div
          className="trip-timeline__progress"
          style={
            shouldReduceMotion
              ? { transform: 'scaleX(1)' }
              : { scaleX: lineScaleX, transformOrigin: 'left' }
          }
        />

        {/* City segments */}
        {cities.map((city) => {
          const fraction = cityNights[city.slug] / totalNights
          const startPct = accumulatedFraction * 100
          const widthPct = fraction * 100
          accumulatedFraction += fraction

          return (
            <div
              key={city.slug}
              className="trip-timeline__segment"
              style={{
                left: `${startPct}%`,
                width: `${widthPct}%`,
              }}
            >
              <div
                className="trip-timeline__segment-bg"
                style={{ background: cityColors[city.slug] }}
              />
            </div>
          )
        })}

        {/* City markers */}
        {(() => {
          let acc = 0
          return cities.map((city, i) => {
            const pct = acc * 100
            acc += cityNights[city.slug] / totalNights
            const midPct = pct + (cityNights[city.slug] / totalNights) * 50

            return (
              <motion.button
                key={city.slug}
                className="trip-timeline__marker"
                style={{ left: `${midPct}%` }}
                onClick={() => handleCityClick(city.slug)}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                type="button"
                aria-label={`Перейти к ${city.label}`}
              >
                <span className="trip-timeline__dot" />
                <span className="trip-timeline__label">{city.label}</span>
                <span className="trip-timeline__dates">{city.dateRange}</span>
                <span className="trip-timeline__nights">
                  {cityNights[city.slug]}N
                </span>
              </motion.button>
            )
          })
        })()}

        {/* Day ticks */}
        {Array.from({ length: totalNights + 1 }).map((_, i) => (
          <div
            key={i}
            className="trip-timeline__tick"
            style={{ left: `${(i / totalNights) * 100}%` }}
          >
            {i === 0 || i === totalNights ? (
              <span className="trip-timeline__tick-label">
                {i === 0 ? 'Day 1' : `Day ${totalNights}`}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
