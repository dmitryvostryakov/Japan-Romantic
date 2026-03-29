import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import './App.css'
import {
  afterDark,
  bookingLinks,
  budgetRows,
  cities,
  extras,
  hero,
  hotelTiers,
  imageCredits,
  lastNote,
  packingPolish,
  recommendedTier,
  reservationTimeline,
  reservations,
  tripFrame,
  versionNotes,
  wardrobeCapsules,
  whyNow,
  type CityChapter,
} from './trip-content'
import {
  CapsuleStrip,
  ChapterHeader,
  GoldenHourPanel,
  LedgerTable,
  LinkIndex,
} from './components/SectionPrimitives'
import { TripBuilder } from './components/TripBuilder'

const revealEase = [0.22, 1, 0.36, 1] as const

type SectionRevealProps = {
  initial?: string
  whileInView?: string
  viewport?: { once: boolean; amount: number }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants?: any
}

function App() {
  const shouldReduceMotion = useReducedMotion() ?? false
  const [activeCapsuleId, setActiveCapsuleId] = useState(wardrobeCapsules[0].id)

  const sectionReveal = useMemo<SectionRevealProps>(
    () =>
      shouldReduceMotion
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true, amount: 0.15 },
            variants: {
              hidden: { opacity: 0, y: 44 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              },
            },
          },
    [shouldReduceMotion],
  )

  const activeCapsule =
    wardrobeCapsules.find((capsule) => capsule.id === activeCapsuleId) ??
    wardrobeCapsules[0]

  const handleCapsuleChange = (capsuleId: string) => {
    startTransition(() => {
      setActiveCapsuleId(capsuleId)
    })
  }

  return (
    <div className="page-shell">
      <SiteChrome />
      <main>
        <HeroSection shouldReduceMotion={shouldReduceMotion} />

        <motion.section
          className="section section-why-now"
          id="why-now"
          {...sectionReveal}
        >
          <ChapterHeader
            eyebrow={whyNow.eyebrow}
            page="01"
            title={whyNow.title}
            description="Несколько причин, почему именно весна 2026 — лучший момент для этой поездки."
          />
          <div className="why-now-grid">
            {whyNow.points.map((point) => (
              <article key={point.title} className="soft-panel why-now-card">
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section section-frame"
          id="frame"
          {...sectionReveal}
        >
          <ChapterHeader
            eyebrow="МАРШРУТ"
            page="02"
            title="Меньше чеклистов, больше атмосферы"
            description="Это не список «успеть всё». Это красиво поставленная поездка: мало лишних переездов, правильный свет, хорошие столы и одежда, которая не спорит с локацией."
          />

          <div className="frame-grid">
            <article className="soft-panel frame-story">
              <p className="lede">{versionNotes.feel}</p>
              <div>
                <p className="mini-label">ПАРАМЕТРЫ</p>
                <dl className="essentials-list">
                  {tripFrame.essentials.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>

            <figure className="support-visual">
              <img
                src={hero.secondaryImage.src}
                alt={hero.secondaryImage.alt}
                loading="lazy"
              />
              <figcaption>
                <span>{hero.secondaryImage.creditLabel}</span>
                <a
                  href={hero.secondaryImage.creditUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Unsplash
                </a>
              </figcaption>
            </figure>
          </div>
        </motion.section>

        <motion.section
          className="section section-proof"
          id="proof"
          {...sectionReveal}
        >
          <ChapterHeader
            eyebrow="ОТЕЛИ"
            page="03"
            title="Отели: уровни, настроение и расходы"
            description="Подбор собран не по логике «дороже = лучше», а по вкусу, атмосфере, романтике, фотогеничности и отсутствию грубого шума роскоши."
          />

          <div className="section-stack">
            <p className="lede">{versionNotes.hotelPick}</p>

            <div className="hotel-tier-grid">
              {hotelTiers.map((tier) => (
                <article key={tier.id} className="hotel-tier-card">
                  {tier.image && (
                    <div className="hotel-tier-image">
                      <img
                        src={tier.image.src}
                        alt={tier.image.alt}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="hotel-tier-body">
                    <p className="mini-label">{tier.tier}</p>
                    <h3 className="hotel-tier-stack">{tier.stack}</h3>
                    <p className="hotel-tier-mood">{tier.mood}</p>
                    <p className="hotel-tier-total tabular">{tier.subtotal}</p>
                    {tier.bookingUrl && (
                      <a
                        className="hotel-tier-link"
                        href={tier.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Бронировать
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="dual-soft-panels">
              <article className="soft-panel quote-panel">
                <p className="mini-label">РЕКОМЕНДАЦИЯ</p>
                <h3>{recommendedTier.title}</h3>
                <p>{recommendedTier.why}</p>
                <p className="panel-total">{recommendedTier.subtotal}</p>
                <p className="muted-note">{recommendedTier.atmosphereNote}</p>
              </article>

              <article className="soft-panel quote-panel">
                <p className="mini-label">ПОРЯДОК БРОНИ</p>
                <ol className="ordered-list">
                  {recommendedTier.bookingOrder.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </motion.section>

        <motion.section className="section" id="budget" {...sectionReveal}>
          <ChapterHeader
            eyebrow="БЮДЖЕТ"
            page="04"
            title="Таблица расходов: всё, что имеет цену в иенах, теперь с рублями"
            description="Плановый FX для этой версии: ¥100 = ₽51.52. Фактическое списание по карте и курсу банка будет плавать, но планировать так уже удобно."
          />

          <div className="table-wrap">
            <LedgerTable
              columns={[
                {
                  key: 'item',
                  header: 'Статья',
                  render: (row) => <span>{row.item}</span>,
                },
                {
                  key: 'jpy',
                  header: 'JPY',
                  align: 'right',
                  render: (row) => <span className="tabular">{row.jpy}</span>,
                },
                {
                  key: 'rub',
                  header: 'RUB',
                  align: 'right',
                  render: (row) => <span className="tabular">{row.rub}</span>,
                },
                {
                  key: 'note',
                  header: 'Заметки',
                  render: (row) => <span>{row.note}</span>,
                },
              ]}
              data={budgetRows}
            />
          </div>
        </motion.section>

        <section className="city-sequence" id="cities">
          {cities.map((city, index) => (
            <CitySection
              key={city.slug}
              city={city}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </section>

        <motion.section
          className="section"
          id="reserve-now"
          {...sectionReveal}
        >
          <ChapterHeader
            eyebrow="БРОНИРОВАНИЯ"
            page="08"
            title="Что бронировать и сколько закладывать"
            description="Это book-first shortlist, который сильнее всего влияет на ощущение поездки."
          />

          <div className="table-wrap">
            <LedgerTable
              columns={[
                {
                  key: 'city',
                  header: 'Город',
                  render: (item) => <span>{item.city}</span>,
                },
                {
                  key: 'venue',
                  header: 'Место',
                  render: (item) => <span>{item.venue}</span>,
                },
                {
                  key: 'what',
                  header: 'Что',
                  render: (item) => <span>{item.what}</span>,
                },
                {
                  key: 'jpy',
                  header: 'JPY',
                  align: 'right',
                  render: (item) => <span className="tabular">{item.jpy}</span>,
                },
                {
                  key: 'rub',
                  header: 'RUB',
                  align: 'right',
                  render: (item) => <span className="tabular">{item.rub}</span>,
                },
                {
                  key: 'note',
                  header: 'Зачем',
                  render: (item) => <span>{item.note}</span>,
                },
              ]}
              data={reservations}
            />
          </div>

          <div className="dual-soft-panels">
            <article className="soft-panel quote-panel">
              <p className="mini-label">ЛОГИКА БРОНИ</p>
              <ul className="bullet-list">
                {recommendedTier.bookingLogic.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="soft-panel quote-panel">
              <p className="mini-label">ПРИЯТНЫЕ ОПЦИИ</p>
              <ul className="bullet-list">
                {recommendedTier.optionalSplurges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section className="section" id="capsules" {...sectionReveal}>
          <ChapterHeader
            eyebrow="ГАРДЕРОБ"
            page="09"
            title="Стильные капсулы одежды для фото, прогулок и ужинов"
            description="Май в Японии любит лёгкие слои, мягкие ткани и чистую палитру. Самый простой способ выглядеть дорого на фото — не спорить одеждой с фоном."
          />

          <div className="capsule-layout">
            <CapsuleStrip
              capsules={wardrobeCapsules}
              activeId={activeCapsule.id}
              onChange={handleCapsuleChange}
            />

            <div className="soft-panel capsule-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapsule.id}
                  animate={{ opacity: 1, y: 0 }}
                  className="capsule-detail-inner"
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  transition={{ duration: 0.45, ease: revealEase }}
                >
                  <div className="capsule-detail-head">
                    <div>
                      <p className="mini-label">{activeCapsule.kicker}</p>
                      <h3>{activeCapsule.title}</h3>
                    </div>
                    <div className="capsule-palette" aria-hidden="true">
                      {activeCapsule.palette.map((color) => (
                        <span
                          key={color}
                          className="capsule-swatch"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="split-columns">
                    <div>
                      <p className="mini-label">Для неё</p>
                      <p>{activeCapsule.forHer}</p>
                    </div>
                    <div>
                      <p className="mini-label">Для него</p>
                      <p>{activeCapsule.forHim}</p>
                    </div>
                  </div>

                  <div className="capsule-tags">
                    {activeCapsule.worksBestFor.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="rule-of-thumb">
            Простое правило: никаких кричащих логотипов, пёстрых принтов, толстых
            спортивных подошв на ужине и раздутых рюкзаков в кадре. Одна красивая
            сумка и одна чистая пара обуви на каждое настроение побеждают десять
            лишних нарядов.
          </p>
        </motion.section>

        <motion.section className="section" id="packing" {...sectionReveal}>
          <ChapterHeader
            eyebrow="СБОРЫ"
            page="10"
            title="Что собрать, как выглядеть и мелочи, которые спасают кадры"
            description="Негламурные детали часто работают сильнее, чем ещё одна нарядная вещь."
          />

          <div className="triple-panel-grid">
            <article className="soft-panel note-panel">
              <p className="mini-label">СОБРАТЬ</p>
              <ul className="bullet-list">
                {packingPolish.packThis.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="soft-panel note-panel">
              <p className="mini-label">ФОТО-ДЕТАЛИ</p>
              <ul className="bullet-list">
                {packingPolish.photoPolish.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="soft-panel note-panel wide-panel">
              <p className="mini-label">ПАРНЫЕ ОБРАЗЫ</p>
              <ul className="bullet-list">
                {packingPolish.coupleLooks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section className="section" id="extras" {...sectionReveal}>
          <ChapterHeader
            eyebrow="ЧТО ЕЩЁ"
            page="11"
            title="Что вы, скорее всего, ещё упускаете"
            description="Эти вещи не выглядят эффектно, но именно они делают поездку гладкой, а кадры — чистыми."
          />

          <div className="extras-grid">
            <div className="soft-panel extras-list">
              {extras.map((item) => (
                <article key={item.title} className="extra-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="soft-panel timeline-panel">
              <p className="mini-label">ТАЙМИНГ БРОНИ</p>
              <div className="timeline-grid">
                {reservationTimeline.map((step) => (
                  <article key={step.label} className="timeline-step">
                    <h3>{step.label}</h3>
                    <ul className="bullet-list">
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="section" id="links" {...sectionReveal}>
          <ChapterHeader
            eyebrow="ССЫЛКИ"
            page="12"
            title="Полезные ссылки: бронировать, проверять, перепроверять"
            description="Это не весь интернет — только то, что реально нужно открыть."
          />
          <LinkIndex links={bookingLinks} />
        </motion.section>

        <motion.section className="section" id="builder" {...sectionReveal}>
          <ChapterHeader
            eyebrow="КОНФИГУРАТОР"
            page="13"
            title="Соберите свою поездку"
            description="Выберите отель, рестораны и активности — получите сводку с ценами."
          />
          <TripBuilder />
        </motion.section>

        <AfterDarkSection shouldReduceMotion={shouldReduceMotion} />
        <FinalNote shouldReduceMotion={shouldReduceMotion} />
      </main>
    </div>
  )
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}

function SiteChrome() {
  const { theme, toggle } = useTheme()

  return (
    <header className="site-chrome">
      <a className="site-mark" href="#top">
        Japan edit / весна 2026
      </a>
      <nav aria-label="Page sections">
        <a href="#why-now">Почему сейчас</a>
        <a href="#frame">Маршрут</a>
        <a href="#cities">Города</a>
        <a href="#capsules">Гардероб</a>
        <a href="#extras">Детали</a>
        <a href="#builder">Конфигуратор</a>
        <a href="#after-dark">После заката</a>
        <a href="#last-note">Финал</a>
      </nav>
      <button
        className="theme-toggle"
        onClick={toggle}
        aria-label={theme === 'light' ? 'Включить ночной режим' : 'Включить дневной режим'}
        title={theme === 'light' ? 'Ночной режим' : 'Дневной режим'}
      >
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </header>
  )
}

function HeroSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
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
      <div className="hero-overlay" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="hero-sun"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        style={{ y: sunY }}
        transition={{ duration: 1.1, ease: revealEase }}
      />

      <div className="hero-grid">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hero-copy"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
          transition={{ duration: 0.9, ease: revealEase }}
        >
          <p className="hero-edition">{hero.edition}</p>
          <h1>{hero.title}</h1>
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

/* ── Apple-style scroll reveal block ─────────────────────── */
const appleEase = [0.16, 1, 0.3, 1] as const

const appleReveal = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: appleEase },
  },
}

const appleRevealFast = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: appleEase },
  },
}

const appleStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const appleChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: appleEase },
  },
}

const appleScale = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: appleEase },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScrollBlock({
  children,
  variants,
  className,
  delay,
}: {
  children: React.ReactNode
  variants?: any
  className?: string
  delay?: number
}) {
  const base = variants || appleReveal
  const v = delay
    ? {
        ...base,
        visible: {
          ...base.visible,
          transition: { ...base.visible.transition, delay },
        },
      }
    : base
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={v}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CitySection({
  city,
  index,
  shouldReduceMotion,
}: {
  city: CityChapter
  index: number
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : 60, shouldReduceMotion ? 0 : -60],
  )
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1.08, 1],
  )

  const rv = shouldReduceMotion ? undefined : appleReveal
  const rvf = shouldReduceMotion ? undefined : appleRevealFast
  const sc = shouldReduceMotion ? undefined : appleScale

  return (
    <section
      className="city-section"
      id={city.slug}
      ref={ref}
    >
      <div className="city-media-column">
        <div className="city-media-sticky">
          <motion.img
            alt={city.image.alt}
            className="city-image"
            loading="lazy"
            src={city.image.src}
            style={shouldReduceMotion ? undefined : { y: imageY, scale: imageScale }}
          />
          <div className="city-image-tint" />
          <motion.div
            className="city-image-copy"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="city-index">{String(index + 5).padStart(2, '0')}</p>
            <h2>{city.label}</h2>
            <p>{city.theme}</p>
            <div className="city-credit">
              <span>{city.image.creditLabel}</span>
              <a href={city.image.creditUrl} target="_blank" rel="noreferrer">
                Unsplash
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="city-content-column">
        <ScrollBlock variants={rv}>
          <ChapterHeader
            eyebrow={city.label}
            page={String(index + 5).padStart(2, '0')}
            title={`${city.label} / ${city.dateRange}`}
            description={`Утренний золотой час: ${city.goldenHour.am} • Вечерний золотой час: ${city.goldenHour.pm} • база: ${city.base}`}
          />
        </ScrollBlock>

        {city.suggestedDays && city.suggestedDays.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="suggested-days-section">
              <p className="mini-label">РЕКОМЕНДОВАННЫЙ МАРШРУТ</p>
              <motion.div
                className="suggested-days-grid"
                variants={shouldReduceMotion ? undefined : appleStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {city.suggestedDays.map((day) => (
                  <motion.article key={day.label} className="soft-panel suggested-day-card" variants={appleChild}>
                    <div className="suggested-day-header">
                      <h4>{day.label}</h4>
                      <span className="suggested-day-theme">{day.theme}</span>
                    </div>
                    <ul className="suggested-day-flow">
                      {day.flow.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </ScrollBlock>
        )}

        <ScrollBlock variants={sc}>
          <div className="city-panel-grid">
            <GoldenHourPanel title="УТРЕННИЙ СВЕТ" tone="am" items={city.am} />
            <GoldenHourPanel title="ВЕЧЕРНИЙ СВЕТ" tone="pm" items={city.pm} />
            <GoldenHourPanel
              title="КОФЕ / ЕДА / УЖИНЫ"
              tone="neutral"
              items={city.dining}
              wide
            />
          </div>
        </ScrollBlock>

        {city.foodNotes && city.foodNotes.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="food-notes-section">
              <p className="mini-label">ГАСТРОНОМИЧЕСКИЕ ЗАМЕТКИ</p>
              <div className="food-notes-grid">
                {city.foodNotes.map((note, i) => (
                  <ScrollBlock key={note.title} variants={rvf} delay={i * 0.15}>
                    <article className="soft-panel food-note-card">
                      <h4>{note.title}</h4>
                      <p>{note.body}</p>
                      {note.priceHint && (
                        <p className="food-note-price">{note.priceHint}</p>
                      )}
                    </article>
                  </ScrollBlock>
                ))}
              </div>
            </div>
          </ScrollBlock>
        )}

        {city.photoWalks && city.photoWalks.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="photo-walks-section">
              <p className="mini-label">ФОТОПРОГУЛКИ</p>
              <div className="photo-walks-grid">
                {city.photoWalks.map((walk, i) => (
                  <ScrollBlock key={walk.title} variants={rvf} delay={i * 0.12}>
                    <article className="soft-panel photo-walk-card">
                      <div className="photo-walk-header">
                        <h4>{walk.title}</h4>
                        <div className="photo-walk-meta">
                          <span>{walk.duration}</span>
                          <span className="photo-walk-time">{walk.bestTime}</span>
                        </div>
                      </div>
                      <ol className="photo-walk-stops">
                        {walk.stops.map((stop) => (
                          <li key={stop.spot}>
                            <strong>{stop.spot}</strong>
                            <span>{stop.tip}</span>
                          </li>
                        ))}
                      </ol>
                    </article>
                  </ScrollBlock>
                ))}
              </div>
            </div>
          </ScrollBlock>
        )}

        {city.photoInspo && city.photoInspo.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="photo-inspo-section">
              <div className="photo-inspo-section-header">
                <p className="mini-label">ВДОХНОВЕНИЕ ДЛЯ СЪЁМОК</p>
                <p className="photo-inspo-tagline">mood board / reference shots</p>
              </div>
              {city.photoInspo.map((inspo, i) => (
                <ScrollBlock key={inspo.title} variants={sc} delay={i * 0.18}>
                  <div className="photo-inspo-theme">
                    <div className="photo-inspo-theme-header">
                      <span className="photo-inspo-theme-tag">{inspo.title}</span>
                      <span className="photo-inspo-mood">{inspo.mood}</span>
                    </div>
                    <div className="photo-inspo-masonry">
                      {inspo.spots.map((s, si) => (
                        <ScrollBlock
                          key={s.location}
                          variants={sc}
                          delay={si * 0.08}
                        >
                          <figure className="photo-inspo-figure">
                            {s.image && (
                              <div className="photo-inspo-img-wrap">
                                <img
                                  src={s.image.src}
                                  alt={s.image.alt}
                                  loading="lazy"
                                  decoding="async"
                                />
                                <div className="photo-inspo-grain" />
                                <div className="photo-inspo-overlay">
                                  <span className="photo-inspo-loc">
                                    {s.location}
                                  </span>
                                  <span className="photo-inspo-idea">
                                    {s.idea}
                                  </span>
                                </div>
                              </div>
                            )}
                            <figcaption className="photo-inspo-caption">
                              {!s.image && (
                                <>
                                  <strong>{s.location}</strong>
                                  <span>{s.idea}</span>
                                </>
                              )}
                              {s.image && (
                                <span className="photo-inspo-credit-line">
                                  <span className="photo-inspo-spot-name">{s.location}</span>
                                  <a
                                    href={s.image.creditUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="photo-inspo-credit"
                                  >
                                    {s.image.creditLabel}
                                  </a>
                                </span>
                              )}
                            </figcaption>
                          </figure>
                        </ScrollBlock>
                      ))}
                    </div>
                  </div>
                </ScrollBlock>
              ))}
            </div>
          </ScrollBlock>
        )}

        {city.sightseeing.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="sightseeing-section">
              <p className="mini-label">ЧТО ПОСМОТРЕТЬ</p>
              <motion.div
                className="sightseeing-grid"
                variants={shouldReduceMotion ? undefined : appleStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
              >
                {city.sightseeing.map((cat) => (
                  <motion.div key={cat.label} className="sightseeing-category" variants={appleChild}>
                    <h4 className="sightseeing-cat-label">{cat.label}</h4>
                    <ul className="sightseeing-list">
                      {cat.spots.map((spot) => (
                        <li key={spot.name} className="sightseeing-spot">
                          <strong>{spot.name}</strong>
                          <span>{spot.description}</span>
                          {spot.station && (
                            <small className="sightseeing-station">
                              {spot.station}
                            </small>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollBlock>
        )}

        {city.mustSee.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="must-see-section">
              <p className="mini-label">MUST SEE</p>
              <motion.ol
                className="must-see-list"
                variants={shouldReduceMotion ? undefined : appleStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {city.mustSee.map((item) => (
                  <motion.li key={item.name} className="must-see-item" variants={appleChild}>
                    <strong>{item.name}</strong>
                    <span>{item.why}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </ScrollBlock>
        )}

        {city.crowdHacks.length > 0 && (
          <ScrollBlock variants={rvf}>
            <div className="crowd-hacks-section">
              <p className="mini-label">КАК ИЗБЕЖАТЬ ТОЛП</p>
              <ul className="crowd-hacks-list">
                {city.crowdHacks.map((hack, i) => (
                  <li key={i} className="crowd-hack-item">
                    {hack.tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollBlock>
        )}

        {city.dayTrips && city.dayTrips.length > 0 && (
          <ScrollBlock variants={sc}>
            <div className="day-trips-section">
              <p className="mini-label">ОДНОДНЕВНАЯ ПОЕЗДКА</p>
              {city.dayTrips.map((trip) => (
                <article key={trip.destination} className="soft-panel day-trip-card">
                  <div className="day-trip-header">
                    <h4>{trip.destination}</h4>
                    <span className="day-trip-duration">{trip.duration}</span>
                  </div>
                  <ul className="day-trip-highlights">
                    {trip.highlights.map((h) => (
                      <li key={h.name}>
                        <strong>{h.name}</strong>
                        <span>{h.description}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ScrollBlock>
        )}

        <ScrollBlock variants={rvf}>
          <p className="city-note">{city.note}</p>
        </ScrollBlock>
      </div>
    </section>
  )
}

function AfterDarkSection({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.06, shouldReduceMotion ? 1.06 : 1],
  )

  return (
    <section className="after-dark" id="after-dark" ref={ref}>
      <motion.img
        alt={afterDark.image.alt}
        className="after-dark-image"
        loading="lazy"
        src={afterDark.image.src}
        style={{ scale: imageScale }}
      />
      <div className="after-dark-content">
        <ChapterHeader
          eyebrow="ПОСЛЕ ЗАКАТА"
          page="14"
          title="Когда город засыпает — вы только начинаете"
          description="Интимная часть поездки. Без расписания, без камер, без свидетелей. Всё, что здесь — только для вас двоих."
        />

        <p className="after-dark-intro">{afterDark.intro}</p>

        <div className="after-dark-grid">
          {afterDark.moments.map((moment) => (
            <motion.article
              key={moment.title}
              className="after-dark-card"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
            >
              <h3>{moment.title}</h3>
              <div className="after-dark-divider" />
              <p>{moment.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalNote({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.04, shouldReduceMotion ? 1.04 : 1],
  )

  return (
    <section className="final-note" id="last-note" ref={ref}>
      <motion.img
        alt={lastNote.image.alt}
        className="final-note-image"
        loading="lazy"
        src={lastNote.image.src}
        style={{ scale: imageScale }}
      />
      <div className="final-note-overlay" />
      <div className="final-note-content">
        <p className="hero-edition">{lastNote.eyebrow}</p>
        <h2>{lastNote.title}</h2>
        <p>{lastNote.body}</p>
        <a className="hero-cta final-note-cta" href="#top">
          Наверх
        </a>
        <div className="credits-strip">
          {imageCredits.map((image) => (
            <a
              key={image.src}
              href={image.creditUrl}
              rel="noreferrer"
              target="_blank"
            >
              {image.creditLabel}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default App
