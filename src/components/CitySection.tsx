import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { CityChapter } from '../trip-content'
import { ChapterHeader, GoldenHourPanel } from './SectionPrimitives'
import {
  appleChild,
  appleReveal,
  appleRevealFast,
  appleScale,
  appleStagger,
  ScrollBlock,
} from './ScrollBlock'

export function CitySection({
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

        {city.hotels && city.hotels.length > 0 && (
          <ScrollBlock variants={rv}>
            <div className="city-hotels-section">
              <p className="mini-label">ОТЕЛИ</p>
              <motion.div
                className="city-hotels-grid"
                variants={shouldReduceMotion ? undefined : appleStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {city.hotels.map((hotel) => (
                  <motion.article
                    key={hotel.id}
                    className={`city-hotel-card${hotel.availability === 'sold-out' ? ' is-sold-out' : ''}${hotel.recommended ? ' is-recommended' : ''}`}
                    variants={appleChild}
                  >
                    {hotel.image && (
                      <div className="city-hotel-image">
                        <img src={hotel.image.src} alt={hotel.image.alt} loading="lazy" />
                        {hotel.availability === 'sold-out' && (
                          <span className="city-hotel-badge badge-sold-out">SOLD OUT</span>
                        )}
                        {hotel.availability === 'limited' && (
                          <span className="city-hotel-badge badge-limited">{hotel.availabilityNote ?? 'LIMITED'}</span>
                        )}
                        {hotel.recommended && hotel.availability !== 'sold-out' && (
                          <span className="city-hotel-badge badge-recommended">★ РЕКОМЕНДУЕМ</span>
                        )}
                      </div>
                    )}
                    <div className="city-hotel-body">
                      <h4 className="city-hotel-name">{hotel.name}</h4>
                      <p className="city-hotel-room">{hotel.roomType} · {hotel.nights}N</p>
                      <p className="city-hotel-mood">{hotel.mood}</p>
                      <div className="city-hotel-price">
                        <span className="city-hotel-rub">₽{Math.round(hotel.jpyNumeric * 0.5152).toLocaleString('ru-RU')}</span>
                        <span className="city-hotel-jpy">{hotel.jpy}</span>
                      </div>
                      {hotel.features && hotel.features.length > 0 && (
                        <div className="city-hotel-features">
                          {hotel.features.map((f) => (
                            <span key={f} className="city-hotel-tag">{f}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </ScrollBlock>
        )}

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
