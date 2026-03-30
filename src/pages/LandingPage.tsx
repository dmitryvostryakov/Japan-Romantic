import { startTransition, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  bookingLinks,
  budgetRows,
  cities,
  extras,
  hero,
  packingPolish,
  recommendedTier,
  reservationTimeline,
  reservations,
  tripFrame,
  versionNotes,
  wardrobeCapsules,
  whyNow,
} from '../trip-content'
import {
  CapsuleStrip,
  ChapterHeader,
  LedgerTable,
  LinkIndex,
} from '../components/SectionPrimitives'
import { DestinationCard } from '../components/DestinationCard'
import { HeroSection } from '../components/HeroSection'
import { CitySection } from '../components/CitySection'
import { AfterDarkSection } from '../components/AfterDarkSection'
import { FinalNote } from '../components/FinalNote'
import { RouteMap } from '../components/RouteMap'
import { TripTimeline } from '../components/TripTimeline'

type SectionRevealProps = {
  initial?: string
  whileInView?: string
  viewport?: { once: boolean; amount: number }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants?: any
}

export function LandingPage() {
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
    <main>
      <HeroSection shouldReduceMotion={shouldReduceMotion} />

      <motion.section
        className="section section-destinations"
        id="destinations"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="НАПРАВЛЕНИЯ"
          page="00"
          title="Три города, одна история"
          description="Каждый город — отдельная глава вашего путешествия. Токио задаёт ритм, Киото замедляет время, Осака добавляет вкус."
        />
        <motion.div
          className="destination-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {cities.map((city) => (
            <motion.div
              key={city.slug}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
                },
              }}
            >
              <DestinationCard
                imageSrc={city.image.src}
                cityName={city.label}
                description={city.theme}
                onExplore={() => {
                  document.getElementById(city.slug)?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        <RouteMap />
      </motion.section>

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
        <TripTimeline />
      </motion.section>

      <motion.section
        className="section section-hotels"
        id="hotels"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="ОТЕЛИ"
          page="03"
          title={recommendedTier.title}
          description={recommendedTier.why}
        />
        <div className="hotel-tier-grid">
          <article className="soft-panel">
            <p className="mini-label">ПОДИТОГ</p>
            <p>{recommendedTier.subtotal}</p>
            <p className="muted">{recommendedTier.atmosphereNote}</p>
          </article>
        </div>
      </motion.section>

      <motion.section
        className="section section-budget"
        id="budget"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="БЮДЖЕТ"
          page="04"
          title="Деньги, которые стоит потратить"
          description="Ориентировочный бюджет на двоих. Курс: ¥100 ≈ ₽51.52"
        />
        <LedgerTable
          columns={[
            { key: 'item', header: 'Позиция', render: (r) => r.item },
            {
              key: 'rub',
              header: '₽ (RUB)',
              render: (r) => r.rub,
              align: 'right',
            },
            {
              key: 'jpy',
              header: '¥ (JPY)',
              render: (r) => <span className="muted">{r.jpy}</span>,
              align: 'right',
            },
            { key: 'note', header: 'Заметки', render: (r) => r.note },
          ]}
          data={budgetRows}
        />
      </motion.section>

      <div id="cities">
        {cities.map((city, i) => (
          <CitySection
            key={city.slug}
            city={city}
            index={i}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      <motion.section
        className="section section-reservations"
        id="reservations"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="БРОНИРОВАНИЯ"
          page="08"
          title="Забронировать в первую очередь"
          description="Места, которые требуют предварительной записи. Чем раньше — тем лучше."
        />
        <LedgerTable
          columns={[
            { key: 'city', header: 'Город', render: (r) => r.city },
            { key: 'venue', header: 'Место', render: (r) => r.venue },
            { key: 'what', header: 'Что', render: (r) => r.what },
            {
              key: 'rub',
              header: '₽ (RUB)',
              render: (r) => r.rub,
              align: 'right',
            },
            { key: 'note', header: 'Заметки', render: (r) => r.note },
          ]}
          data={reservations}
        />
      </motion.section>

      <motion.section
        className="section section-capsules"
        id="capsules"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="ГАРДЕРОБ"
          page="09"
          title="Капсулы, которые работают везде"
          description="Три капсулы — три настроения. Каждая работает автономно и в паре."
        />
        <CapsuleStrip
          capsules={wardrobeCapsules}
          activeId={activeCapsuleId}
          onChange={handleCapsuleChange}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCapsule.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="capsule-detail"
          >
            <div className="capsule-palette">
              {activeCapsule.palette.map((hex) => (
                <span
                  key={hex}
                  className="capsule-swatch"
                  style={{ background: hex }}
                  title={hex}
                />
              ))}
            </div>
            <div className="split-columns">
              <div>
                <p className="mini-label">ДЛЯ НЕЁ</p>
                <p>{activeCapsule.forHer}</p>
              </div>
              <div>
                <p className="mini-label">ДЛЯ НЕГО</p>
                <p>{activeCapsule.forHim}</p>
              </div>
            </div>
            <div className="capsule-tags">
              {activeCapsule.worksBestFor.map((tag) => (
                <span key={tag} className="capsule-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      <motion.section
        className="section section-packing"
        id="packing"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="ЧЕМОДАН"
          page="10"
          title="Что положить — и что оставить"
          description="Минимализм, который работает на две недели."
        />
        <div className="dual-soft-panels">
          <article className="soft-panel">
            <p className="mini-label">MUST PACK</p>
            <ul className="packing-list">
              {packingPolish.packThis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="soft-panel">
            <p className="mini-label">PHOTO POLISH</p>
            <ul className="packing-list">
              {packingPolish.photoPolish.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        {packingPolish.coupleLooks && (
          <article className="soft-panel couple-looks-panel">
            <p className="mini-label">ПАРА: КООРДИНАЦИЯ БЕЗ MATCHING</p>
            <ul className="packing-list">
              {packingPolish.coupleLooks.map((look) => (
                <li key={look}>{look}</li>
              ))}
            </ul>
          </article>
        )}
      </motion.section>

      <motion.section
        className="section section-extras"
        id="extras"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="ДЕТАЛИ"
          page="11"
          title="Мелочи, которые имеют значение"
          description="Всё, что может пригодиться: от такси до конвертации валют."
        />
        <div className="extras-grid">
          {extras.map((item) => (
            <article key={item.title} className="soft-panel extras-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="timeline-panel">
          <p className="mini-label">КОГДА БРОНИРОВАТЬ</p>
          <div className="timeline-grid">
            {reservationTimeline.map((step) => (
              <article key={step.label} className="timeline-step">
                <h3>{step.label}</h3>
                <ul>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section section-links"
        id="links"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="ССЫЛКИ"
          page="12"
          title="Полезные ресурсы"
          description="Бронирование, маршруты, справочники."
        />
        <LinkIndex links={bookingLinks} />
      </motion.section>

      <motion.section
        className="section section-builder-cta"
        id="builder"
        {...sectionReveal}
      >
        <ChapterHeader
          eyebrow="КОНФИГУРАТОР"
          page="13"
          title="Соберите свою поездку"
          description="Выберите отель, рестораны и активности — получите сводку с ценами."
        />
        <div className="builder-cta-card soft-panel">
          <p className="builder-cta-text">
            Интерактивный конфигуратор поможет собрать поездку под ваш бюджет и вкус.
            Выбирайте отели, рестораны и активности по каждому городу — и получите
            готовую сводку.
          </p>
          <Link to="/builder" className="builder-cta-link">
            Открыть конфигуратор
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </motion.section>

      <AfterDarkSection shouldReduceMotion={shouldReduceMotion} />
      <FinalNote shouldReduceMotion={shouldReduceMotion} />
    </main>
  )
}
