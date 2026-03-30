import { motion, useReducedMotion } from 'framer-motion'
import japanMap from '@svg-maps/japan'

// ── Island groupings (prefecture IDs → island) ────────────────
const ISLAND_GROUPS: Record<string, string[]> = {
  hokkaido: ['hokkaido'],
  honshu: [
    'aomori', 'iwate', 'akita', 'miyagi', 'yamagata', 'fukushima',
    'ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa',
    'niigata', 'toyama', 'ishikawa', 'fukui', 'yamanashi', 'nagano',
    'gifu', 'shizuoka', 'aichi', 'mie', 'shiga', 'kyoto', 'osaka',
    'hyogo', 'nara', 'wakayama', 'tottori', 'shimane', 'okayama',
    'hiroshima', 'yamaguchi',
  ],
  shikoku: ['tokushima', 'kagawa', 'ehime', 'kochi'],
  kyushu: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima'],
}

// Build lookup: prefId → island
const prefToIsland = new Map<string, string>()
for (const [island, prefs] of Object.entries(ISLAND_GROUPS)) {
  for (const p of prefs) prefToIsland.set(p, island)
}

// Group paths by island
const islandPaths = new Map<string, string[]>()
for (const loc of japanMap.locations) {
  const island = prefToIsland.get(loc.id)
  if (!island) continue
  if (!islandPaths.has(island)) islandPaths.set(island, [])
  islandPaths.get(island)!.push(loc.path)
}

// ── City positions (in @svg-maps/japan viewBox: 0 0 438 516) ──
// Derived from bounding-box centers of each prefecture's SVG path
const cities = [
  { name: 'Токио', slug: 'tokyo', x: 315, y: 256, labelDx: 6, labelDy: -5 },
  { name: 'Киото', slug: 'kyoto', x: 239, y: 273, labelDx: 6, labelDy: -5 },
  { name: 'Осака', slug: 'osaka', x: 234, y: 281, labelDx: -40, labelDy: 4 },
] as const

// Route: Tokyo → Kyoto → Osaka (Tōkaidō Shinkansen)
const routePath =
  'M 315 256 Q 296 260 276 264 Q 260 268 250 271 ' +
  'L 239 273 Q 237 276 235 279 L 234 281'

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
        viewBox="100 10 340 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Маршрут: Токио — Киото — Осака"
      >
        {/* Japan islands — geographically accurate prefecture paths */}
        {(['hokkaido', 'honshu', 'shikoku', 'kyushu'] as const).map((island) => (
          <g key={island}>
            {(islandPaths.get(island) ?? []).map((d, i) => (
              <path
                key={i}
                d={d}
                className={
                  island === 'hokkaido' || island === 'honshu'
                    ? 'route-map__island'
                    : 'route-map__island route-map__island--minor'
                }
                strokeWidth={island === 'hokkaido' || island === 'honshu' ? '0.8' : '0.6'}
                strokeLinejoin="round"
              />
            ))}
          </g>
        ))}

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
          viewport={{ once: true, amount: 0.3 }}
        />

        {/* Shinkansen icon along route */}
        <motion.text
          x="268"
          y="256"
          className="route-map__shinkansen-label"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, transition: { delay: 2.2, duration: 0.6 } }
          }
          viewport={{ once: true, amount: 0.3 }}
        >
          🚄 Синкансэн
        </motion.text>

        {/* City dots and labels */}
        {cities.map((city, i) => (
          <g key={city.slug} className="route-map__city-group">
            {/* Outer glow ring */}
            <circle
              cx={city.x}
              cy={city.y}
              r="8"
              className="route-map__glow"
            />

            {/* Pulse ring (hover) */}
            <circle
              cx={city.x}
              cy={city.y}
              r="7"
              className="route-map__pulse"
            />

            {/* City dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="3.5"
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
        <g className="route-map__compass" transform="translate(405, 415)">
          <line x1="0" y1="-10" x2="0" y2="10" className="route-map__compass-line" />
          <line x1="-10" y1="0" x2="10" y2="0" className="route-map__compass-line" />
          <text x="0" y="-14" textAnchor="middle" className="route-map__compass-n">N</text>
        </g>
      </motion.svg>
    </div>
  )
}
