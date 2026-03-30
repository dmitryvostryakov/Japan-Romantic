import { motion, useReducedMotion } from 'framer-motion'

const cities = [
  { name: 'Токио', slug: 'tokyo', x: 510, y: 246, labelDx: 14, labelDy: 5 },
  { name: 'Киото', slug: 'kyoto', x: 400, y: 318, labelDx: 14, labelDy: 5 },
  { name: 'Осака', slug: 'osaka', x: 396, y: 338, labelDx: -54, labelDy: 5 },
] as const

// Recognizable Japan archipelago — all four main islands
// Hokkaido (top-right, diamond-ish shape with Oshima peninsula)
const hokkaido =
  'M 528 52 Q 545 42 565 45 Q 580 50 588 62 Q 594 76 590 92 ' +
  'Q 585 106 572 114 Q 558 120 542 118 Q 530 114 522 104 ' +
  'Q 515 92 514 78 Q 515 64 528 52 Z'

// Honshu (main island — long curved shape NE to SW with Kanto bulge)
const honshu =
  'M 538 128 Q 548 122 556 130 Q 562 140 556 156 ' +
  'Q 548 172 538 186 Q 530 198 524 208 ' +
  'Q 518 218 514 230 Q 512 240 510 248 ' + // Kanto area (Tokyo)
  'Q 506 256 500 262 Q 492 270 482 278 ' +
  'Q 470 286 456 294 Q 442 300 428 306 ' +
  'Q 414 312 402 318 Q 392 324 384 330 ' + // Kansai (Kyoto/Osaka)
  'Q 374 338 362 344 Q 348 350 332 354 ' +
  'Q 316 358 302 354 Q 290 348 282 338 ' + // Western tip
  'Q 276 328 274 316 Q 274 304 280 294 ' +
  'Q 288 284 300 278 Q 314 272 328 266 ' + // South coast
  'Q 344 260 360 252 Q 376 244 390 236 ' +
  'Q 404 228 416 218 Q 430 206 442 194 ' +
  'Q 454 182 464 168 Q 474 154 486 142 ' +
  'Q 500 132 516 126 Q 530 124 538 128 Z'

// Shikoku (south of Honshu, oval-ish)
const shikoku =
  'M 382 346 Q 396 340 410 344 Q 422 350 424 362 ' +
  'Q 424 374 414 380 Q 402 386 388 382 ' +
  'Q 376 378 372 366 Q 370 354 376 346 Q 380 342 382 346 Z'

// Kyushu (southwest, larger rounded shape)
const kyushu =
  'M 304 360 Q 318 352 334 356 Q 348 362 352 376 ' +
  'Q 354 390 344 400 Q 332 408 316 406 ' +
  'Q 302 402 296 390 Q 292 376 296 366 Q 300 358 304 360 Z'

// Tsugaru Strait (gap between Hokkaido and Honshu)
const straitLine = 'M 530 118 L 542 126'

// Route path: Tokyo → Kyoto → Osaka (Shinkansen line along south coast)
const routePath =
  'M 510 246 Q 490 256 470 268 Q 450 280 430 292 Q 415 304 400 318 ' +
  'L 398 328 Q 397 334 396 338'

function handleCityClick(slug: string) {
  document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
}

export function RouteMap() {
  const shouldReduceMotion = useReducedMotion() ?? false

  const pathAnimation = shouldReduceMotion
    ? { pathLength: 1, opacity: 1 }
    : {
        pathLength: [0, 1] as [number, number],
        opacity: [0, 1] as [number, number],
        transition: { duration: 2.5, ease: 'easeInOut' as const },
      }

  return (
    <div className="route-map-wrapper">
      <p className="route-map-title">Маршрут по Японии</p>
      <motion.svg
        className="route-map"
        viewBox="240 30 380 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Маршрут: Токио — Киото — Осака"
      >
        {/* Japan islands */}
        <path d={hokkaido} className="route-map__island" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={honshu} className="route-map__island" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={shikoku} className="route-map__island route-map__island--minor" strokeWidth="0.8" strokeLinejoin="round" />
        <path d={kyushu} className="route-map__island route-map__island--minor" strokeWidth="0.8" strokeLinejoin="round" />

        {/* Strait marker */}
        <path d={straitLine} className="route-map__strait" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Animated route line */}
        <motion.path
          d={routePath}
          className="route-map__route"
          strokeWidth="2.5"
          strokeDasharray="8 5"
          strokeLinecap="round"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={pathAnimation}
          viewport={{ once: true, amount: 0.3 }}
        />

        {/* Shinkansen icon along route */}
        <motion.text
          x="460"
          y="282"
          className="route-map__shinkansen-label"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, transition: { delay: 2.2, duration: 0.6 } }
          }
          viewport={{ once: true, amount: 0.3 }}
        >
          🚄 Shinkansen
        </motion.text>

        {/* City dots and labels */}
        {cities.map((city, i) => (
          <g key={city.slug} className="route-map__city-group">
            {/* Outer glow ring */}
            <circle
              cx={city.x}
              cy={city.y}
              r="12"
              className="route-map__glow"
            />

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
              r="5"
              className="route-map__dot"
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              whileInView={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 1.0 + i * 0.5,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
              viewport={{ once: true, amount: 0.3 }}
            />

            {/* City label */}
            <motion.text
              x={city.x + city.labelDx}
              y={city.y + city.labelDy}
              className="route-map__label"
              onClick={() => handleCityClick(city.slug)}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      transition: {
                        delay: 1.2 + i * 0.5,
                        duration: 0.5,
                      },
                    }
              }
              viewport={{ once: true, amount: 0.3 }}
            >
              {city.name}
            </motion.text>
          </g>
        ))}

        {/* Compass rose */}
        <g className="route-map__compass" transform="translate(565, 380)">
          <line x1="0" y1="-12" x2="0" y2="12" className="route-map__compass-line" />
          <line x1="-12" y1="0" x2="12" y2="0" className="route-map__compass-line" />
          <text x="0" y="-16" textAnchor="middle" className="route-map__compass-n">N</text>
        </g>
      </motion.svg>
    </div>
  )
}
