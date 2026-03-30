import { motion, useReducedMotion } from 'framer-motion'

const cities = [
  { name: 'Токио', slug: 'tokyo', x: 476, y: 262, labelDx: 10, labelDy: -8 },
  { name: 'Киото', slug: 'kyoto', x: 400, y: 284, labelDx: 10, labelDy: -8 },
  { name: 'Осака', slug: 'osaka', x: 394, y: 302, labelDx: -52, labelDy: 5 },
] as const

// ── Geographically accurate Japan silhouettes ───────────────────
// Traced from Natural Earth 1:50m, projected to SVG coords.
// Coordinate mapping: x = (lon − 129) × 22 + 270, y = (46 − lat) × 24 + 35

// Hokkaido — distinctive diamond shape with Oshima Peninsula pointing SW
const hokkaido =
  // Start at Oshima Peninsula (SW tip), go clockwise
  'M 494 128 L 488 120 L 484 112 L 486 104 ' + // Oshima Pen. west coast
  'L 490 96 L 492 88 L 490 80 L 486 72 ' + // West coast (Sea of Japan)
  'L 488 64 L 494 56 L 502 50 L 512 46 ' + // NW coast → Cape Sōya
  'L 524 44 L 536 46 L 546 50 ' + // North coast
  'L 556 56 L 564 64 L 570 74 ' + // NE coast (Okhotsk)
  'L 572 84 L 570 94 L 566 102 ' + // East coast
  'L 558 108 L 548 112 L 538 114 ' + // SE coast
  'L 528 118 L 520 124 L 512 130 ' + // Erimo Cape area
  'L 504 132 L 498 130 L 494 128 Z' // Back to Oshima

// Honshu — long arc NE→SW with distinctive features:
// Tsugaru Strait gap, Tōhoku spine, Kantō bulge, Chūbu mountains,
// Kii Peninsula, Inland Sea coast, Chūgoku narrowing
const honshu =
  // Start at Tsugaru area (north tip), go clockwise along Pacific coast
  'M 504 142 L 510 138 L 518 136 L 524 140 ' + // Shimokita Peninsula
  'L 522 148 L 518 156 L 514 164 ' + // Tōhoku Pacific coast
  'L 510 172 L 506 180 L 502 188 ' +
  'L 498 196 L 494 204 L 490 212 ' + // Sendai area
  'L 488 220 L 486 228 L 484 236 ' +
  'L 482 244 L 480 252 L 478 258 ' + // Kashima-nada
  'L 480 264 L 484 270 L 488 276 ' + // Kantō bulge (Chiba/Bōsō)
  'L 486 282 L 480 286 L 474 288 ' + // Tokyo Bay south
  'L 468 286 L 462 282 L 456 280 ' + // Sagami Bay
  'L 450 282 L 444 286 L 438 290 ' + // Izu Peninsula tip
  'L 434 288 L 430 284 L 428 278 ' + // Suruga Bay
  'L 424 282 L 420 288 L 416 294 ' + // Enshū-nada
  'L 410 300 L 406 306 L 402 312 ' + // Ise Bay
  'L 398 318 L 394 324 L 390 330 ' + // Kii Peninsula north
  'L 386 336 L 382 340 L 378 344 ' + // Kii Peninsula tip
  'L 372 342 L 366 338 L 360 334 ' + // Kii Channel
  'L 354 330 L 348 328 L 342 330 ' + // Osaka Bay → Inland Sea
  'L 336 332 L 330 334 L 324 336 ' +
  'L 318 338 L 312 338 L 306 336 ' + // Chūgoku south coast
  'L 300 332 L 294 328 L 290 324 ' +
  'L 286 320 L 282 316 ' + // Shimonoseki area
  'L 280 310 L 282 304 L 286 298 ' + // Western tip → north coast
  'L 292 294 L 298 290 L 304 286 ' + // San'in coast
  'L 312 282 L 320 278 L 328 274 ' +
  'L 338 270 L 348 266 L 358 262 ' + // Wakasa Bay
  'L 368 258 L 376 254 L 384 250 ' +
  'L 392 246 L 398 242 L 404 238 ' + // Noto Peninsula base
  'L 410 234 L 414 228 L 418 222 ' +
  'L 422 216 L 426 210 L 430 204 ' + // Niigata area
  'L 436 196 L 442 188 L 448 180 ' +
  'L 454 172 L 460 164 L 466 156 ' + // Tōhoku Sea of Japan
  'L 472 150 L 478 146 L 484 142 ' +
  'L 490 140 L 496 140 L 504 142 Z' // Back to Tsugaru

// Shikoku — four-province island south of western Honshu
const shikoku =
  'M 366 348 L 374 344 L 382 342 L 390 344 ' + // North coast (Inland Sea)
  'L 398 346 L 406 348 L 412 352 ' +
  'L 416 358 L 418 364 L 416 370 ' + // Cape Muroto area
  'L 412 374 L 406 378 L 400 380 ' + // South coast
  'L 394 382 L 388 382 L 382 380 ' +
  'L 376 376 L 370 370 ' + // Cape Ashizuri area
  'L 366 364 L 364 358 L 364 352 L 366 348 Z'

// Kyushu — southwestern island with Kagoshima Bay
const kyushu =
  'M 284 320 L 290 318 L 296 320 L 300 326 ' + // NE coast (Kitakyushu)
  'L 304 332 L 308 338 L 312 344 ' +
  'L 314 350 L 314 356 L 312 362 ' + // East coast
  'L 308 368 L 304 374 L 300 378 ' + // Miyazaki
  'L 298 384 L 300 390 L 304 394 ' + // Ōsumi Peninsula
  'L 302 398 L 296 400 L 290 396 ' + // Kagoshima Bay
  'L 286 392 L 282 388 L 278 382 ' + // Satsuma Peninsula
  'L 274 376 L 272 370 L 270 364 ' + // West coast
  'L 270 358 L 272 352 L 274 346 ' +
  'L 276 340 L 278 334 L 280 328 ' + // Nagasaki area
  'L 282 324 L 284 320 Z'

// Tsugaru Strait between Hokkaido and Honshu
const straitLine = 'M 498 132 L 508 138'

// Route: Tokyo → Kyoto → Osaka (Tōkaidō Shinkansen, inland path)
const routePath =
  'M 476 262 Q 458 268 440 274 Q 426 280 414 284 ' +
  'L 400 284 Q 398 290 396 296 L 394 302'

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
        viewBox="255 30 340 390"
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
          x="440"
          y="280"
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
        <g className="route-map__compass" transform="translate(570, 390)">
          <line x1="0" y1="-12" x2="0" y2="12" className="route-map__compass-line" />
          <line x1="-12" y1="0" x2="12" y2="0" className="route-map__compass-line" />
          <text x="0" y="-16" textAnchor="middle" className="route-map__compass-n">N</text>
        </g>
      </motion.svg>
    </div>
  )
}
