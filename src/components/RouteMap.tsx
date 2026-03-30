import { motion, useReducedMotion } from 'framer-motion'

const cities = [
  { name: 'Токио', slug: 'tokyo', x: 470, y: 175 },
  { name: 'Киото', slug: 'kyoto', x: 270, y: 230 },
  { name: 'Осака', slug: 'osaka', x: 255, y: 260 },
] as const

// Simplified Honshu island outline (recognizable silhouette)
const honshuPath =
  'M 520 60 Q 540 70 545 90 Q 548 110 535 130 Q 525 145 520 160 ' +
  'Q 515 175 505 185 Q 495 195 490 210 Q 488 225 480 235 ' +
  'Q 470 248 455 255 Q 440 262 425 268 Q 405 275 385 278 ' +
  'Q 365 280 345 282 Q 325 284 305 285 Q 285 286 265 290 ' +
  'Q 245 295 230 305 Q 215 315 205 325 Q 195 335 180 340 ' +
  'Q 160 345 145 340 Q 130 335 125 320 Q 120 305 130 290 ' +
  'Q 140 278 155 270 Q 170 262 185 255 Q 200 248 215 240 ' +
  'Q 230 232 248 225 Q 265 218 280 210 Q 295 202 310 195 ' +
  'Q 325 188 340 180 Q 355 172 370 165 Q 385 158 400 150 ' +
  'Q 415 142 430 132 Q 445 120 455 108 Q 462 98 468 85 ' +
  'Q 475 72 485 62 Q 500 55 520 60 Z'

// Route path: Tokyo -> Kyoto -> Osaka (smooth curve)
const routePath =
  'M 470 175 Q 420 185 380 195 Q 340 210 310 220 Q 290 228 270 230 ' +
  'L 265 240 Q 260 250 255 260'

function handleCityClick(slug: string) {
  document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
}

export function RouteMap() {
  const shouldReduceMotion = useReducedMotion() ?? false

  const pathAnimation = shouldReduceMotion
    ? { pathLength: 1, opacity: 1 }
    : {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: { duration: 2, ease: 'easeInOut' as const },
      }

  return (
    <div className="route-map-wrapper">
      <motion.svg
        className="route-map"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Маршрут: Токио — Киото — Осака"
      >
        {/* Honshu island outline */}
        <path
          d={honshuPath}
          className="route-map__island"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Animated route line */}
        <motion.path
          d={routePath}
          className="route-map__route"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={pathAnimation}
          viewport={{ once: true, amount: 0.4 }}
        />

        {/* City dots and labels */}
        {cities.map((city, i) => (
          <g key={city.slug} className="route-map__city-group">
            {/* Pulse ring (hover) */}
            <circle
              cx={city.x}
              cy={city.y}
              r="10"
              className="route-map__pulse"
            />

            {/* City dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="4"
              className="route-map__dot"
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              whileInView={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 1.2 + i * 0.4,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
              viewport={{ once: true, amount: 0.4 }}
            />

            {/* City label */}
            <motion.text
              x={city.x + (city.slug === 'osaka' ? -40 : 12)}
              y={city.y + (city.slug === 'osaka' ? 8 : -10)}
              className="route-map__label"
              onClick={() => handleCityClick(city.slug)}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      transition: {
                        delay: 1.4 + i * 0.4,
                        duration: 0.5,
                      },
                    }
              }
              viewport={{ once: true, amount: 0.4 }}
            >
              {city.name}
            </motion.text>
          </g>
        ))}
      </motion.svg>
    </div>
  )
}
