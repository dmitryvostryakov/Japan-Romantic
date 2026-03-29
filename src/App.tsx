import { startTransition, useMemo, useRef, useState } from 'react'
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
  variants?: {
    hidden: { opacity: number; y: number }
    visible: {
      opacity: number
      y: number
      transition: { duration: number; ease: typeof revealEase }
    }
  }
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
            viewport: { once: true, amount: 0.2 },
            variants: {
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease: revealEase },
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

function SiteChrome() {
  return (
    <header className="site-chrome">
      <a className="site-mark" href="#top">
        Japan edit / весна 2026
      </a>
      <nav aria-label="Page sections">
        <a href="#frame">Маршрут</a>
        <a href="#cities">Города</a>
        <a href="#capsules">Гардероб</a>
        <a href="#extras">Детали</a>
        <a href="#builder">Конфигуратор</a>
        <a href="#after-dark">После заката</a>
        <a href="#last-note">Финал</a>
      </nav>
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
    [shouldReduceMotion ? 0 : 40, shouldReduceMotion ? 0 : -40],
  )

  return (
    <motion.section
      className="city-section"
      id={city.slug}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
      ref={ref}
      transition={{ duration: 0.8, ease: revealEase }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      <div className="city-media-column">
        <div className="city-media-sticky">
          <motion.img
            alt={city.image.alt}
            className="city-image"
            loading="lazy"
            src={city.image.src}
            style={{ y: imageY }}
          />
          <div className="city-image-tint" />
          <div className="city-image-copy">
            <p className="city-index">{String(index + 5).padStart(2, '0')}</p>
            <h2>{city.label}</h2>
            <p>{city.theme}</p>
            <div className="city-credit">
              <span>{city.image.creditLabel}</span>
              <a href={city.image.creditUrl} target="_blank" rel="noreferrer">
                Unsplash
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="city-content-column">
        <ChapterHeader
          eyebrow={city.label}
          page={String(index + 5).padStart(2, '0')}
          title={`${city.label} / ${city.dateRange}`}
          description={`Утренний золотой час: ${city.goldenHour.am} • Вечерний золотой час: ${city.goldenHour.pm} • база: ${city.base}`}
        />

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

        <p className="city-note">{city.note}</p>
      </div>
    </motion.section>
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
