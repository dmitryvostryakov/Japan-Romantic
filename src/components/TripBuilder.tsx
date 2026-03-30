import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { builderCities, reservations } from '../trip-content'

const STEPS = [...builderCities.map((c) => c.label), 'Сводка'] as const

const FX_RATE = 51.52 / 100 // ¥100 = ₽51.52

function parseJpy(raw: string): number {
  // Handle ranges like "¥621 438–¥761 438" — take the lower bound
  const match = raw.replace(/\s/g, '').match(/¥([\d,]+)/)
  if (!match) return 0
  return Number(match[1].replace(/,/g, ''))
}

function jpyToRub(jpy: number): number {
  return Math.round(jpy * FX_RATE)
}

function fmt(n: number): string {
  return n.toLocaleString('ru-RU')
}

function fmtRub(jpyStr: string): string {
  return `₽${fmt(jpyToRub(parseJpy(jpyStr)))}`
}

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

export function TripBuilder() {
  const [step, setStep] = useState(0)

  // Per-city hotel selection (first option pre-selected)
  const [selectedHotels, setSelectedHotels] = useState<Record<string, string>>(
    () => Object.fromEntries(builderCities.map((c) => [c.slug, c.hotels[0].id])),
  )

  // Per-city restaurant selection (all on by default)
  const [selectedRestaurants, setSelectedRestaurants] = useState<Set<string>>(
    () => new Set(reservations.map((r) => r.id)),
  )

  // Per-city activity selection (all on by default)
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(
    () => new Set(builderCities.flatMap((c) => c.activities.map((a) => a.id))),
  )

  const selectHotel = (citySlug: string, hotelId: string) => {
    setSelectedHotels((prev) => ({ ...prev, [citySlug]: hotelId }))
  }

  const toggleRestaurant = (id: string) => {
    setSelectedRestaurants((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Map city slug to reservations label
  const citySlugToLabel: Record<string, string> = {
    tokyo: 'Tokyo',
    kyoto: 'Kyoto',
    osaka: 'Osaka',
  }

  // Compute totals
  const hotelsJpy = builderCities.reduce((sum, city) => {
    const hotel = city.hotels.find((h) => h.id === selectedHotels[city.slug])
    return sum + (hotel ? parseJpy(hotel.jpy) : 0)
  }, 0)

  const cityRestaurants = (citySlug: string) =>
    reservations.filter(
      (r) => r.city === citySlugToLabel[citySlug] && selectedRestaurants.has(r.id),
    )

  const allChosenRestaurants = reservations.filter((r) => selectedRestaurants.has(r.id))
  const restaurantsJpy = allChosenRestaurants.reduce((sum, r) => sum + parseJpy(r.jpy), 0)

  const activitiesJpy = builderCities.reduce((sum, city) => {
    return sum + city.activities
      .filter((a) => selectedActivities.has(a.id) && a.jpy)
      .reduce((s, a) => s + parseJpy(a.jpy!), 0)
  }, 0)

  const totalJpy = hotelsJpy + restaurantsJpy + activitiesJpy
  const totalRub = jpyToRub(totalJpy)

  const isCityStep = step < builderCities.length
  const isSummary = step === builderCities.length

  return (
    <div className="builder-section">
      <div className="builder-steps">
        {STEPS.map((label, i) => (
          <button
            key={label}
            className={`builder-step-indicator${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
            onClick={() => setStep(i)}
            type="button"
          >
            <span className="builder-step-dot" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {isCityStep && (() => {
            const city = builderCities[step]
            const cityReservations = reservations.filter(
              (r) => r.city === citySlugToLabel[city.slug],
            )
            return (
              <div className="builder-city-step">
                <p className="builder-city-dates">{city.dateRange}</p>

                {/* Hotels */}
                <div className="builder-city-group">
                  <p className="mini-label">ОТЕЛЬ</p>
                  <div className="builder-cards-grid">
                    {city.hotels.map((hotel) => (
                      <button
                        key={hotel.id}
                        className={`builder-card builder-hotel-card${hotel.id === selectedHotels[city.slug] ? ' is-selected' : ''}`}
                        onClick={() => selectHotel(city.slug, hotel.id)}
                        type="button"
                      >
                        {hotel.image && (
                          <div className="builder-hotel-image">
                            <img src={hotel.image.src} alt={hotel.image.alt} loading="lazy" />
                          </div>
                        )}
                        <div className="builder-hotel-body">
                          <p className="builder-card-venue">{hotel.name}</p>
                          <p className="builder-card-mood">{hotel.mood}</p>
                          <p className="builder-card-total">
                            {fmtRub(hotel.jpy)} ({hotel.jpy}) / {hotel.nights}N
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restaurants */}
                {cityReservations.length > 0 && (
                  <div className="builder-city-group">
                    <p className="mini-label">РЕСТОРАНЫ И БРОНИРОВАНИЯ</p>
                    <div className="builder-cards-grid builder-cards-list">
                      {cityReservations.map((r) => (
                        <button
                          key={r.id}
                          className={`builder-card${selectedRestaurants.has(r.id) ? ' is-selected' : ''}`}
                          onClick={() => toggleRestaurant(r.id)}
                          type="button"
                        >
                          <div className="builder-card-row">
                            <div>
                              <p className="builder-card-venue">{r.venue}</p>
                              <p className="builder-card-mood">{r.what}</p>
                            </div>
                            <p className="builder-card-total">{fmtRub(r.jpy)} ({r.jpy})</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                <div className="builder-city-group">
                  <p className="mini-label">АКТИВНОСТИ И МЕСТА</p>
                  <div className="builder-cards-grid builder-cards-list">
                    {city.activities.map((a) => (
                      <button
                        key={a.id}
                        className={`builder-card${selectedActivities.has(a.id) ? ' is-selected' : ''}`}
                        onClick={() => toggleActivity(a.id)}
                        type="button"
                      >
                        <div className="builder-card-row">
                          <div>
                            <p className="builder-card-venue">{a.title}</p>
                            <p className="builder-card-mood">{a.description}</p>
                          </div>
                          {a.jpy && (
                            <p className="builder-card-total">{fmtRub(a.jpy)} ({a.jpy})</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}

          {isSummary && (
            <div className="builder-summary">
              {builderCities.map((city) => {
                const hotel = city.hotels.find((h) => h.id === selectedHotels[city.slug])
                const cityRests = cityRestaurants(city.slug)
                const cityActs = city.activities.filter((a) =>
                  selectedActivities.has(a.id),
                )

                const cityHotelJpy = hotel ? parseJpy(hotel.jpy) : 0
                const cityRestJpy = cityRests.reduce((s, r) => s + parseJpy(r.jpy), 0)
                const cityActJpy = cityActs.filter((a) => a.jpy).reduce((s, a) => s + parseJpy(a.jpy!), 0)
                const cityTotalJpy = cityHotelJpy + cityRestJpy + cityActJpy

                return (
                  <article key={city.slug} className="soft-panel">
                    <p className="mini-label">{city.label.toUpperCase()}</p>

                    {hotel && (
                      <div className="builder-summary-hotel">
                        {hotel.image && (
                          <img
                            className="builder-summary-hotel-img"
                            src={hotel.image.src}
                            alt={hotel.image.alt}
                            loading="lazy"
                          />
                        )}
                        <div>
                          <h3>{hotel.name}</h3>
                          <p className="builder-card-mood">
                            {hotel.nights}N — {fmtRub(hotel.jpy)} ({hotel.jpy})
                          </p>
                        </div>
                      </div>
                    )}

                    {cityRests.length > 0 && (
                      <ul className="builder-summary-list">
                        {cityRests.map((r) => (
                          <li key={r.id}>
                            <span>{r.venue} — {r.what}</span>
                            <span className="tabular">{fmtRub(r.jpy)} ({r.jpy})</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {cityActs.length > 0 && (
                      <ul className="builder-summary-list builder-summary-acts">
                        {cityActs.map((a) => (
                          <li key={a.id}>
                            <span>{a.title}</span>
                            {a.jpy && <span className="tabular">{fmtRub(a.jpy)} ({a.jpy})</span>}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="builder-city-subtotal">
                      Итого {city.label}: ₽{fmt(jpyToRub(cityTotalJpy))} (¥{fmt(cityTotalJpy)})
                    </p>
                  </article>
                )
              })}

              <article className="soft-panel builder-total-panel">
                <p className="mini-label">ИТОГО ЗА ПОЕЗДКУ</p>
                <p className="builder-grand-total">
                  ₽{fmt(totalRub)}
                </p>
                <p className="builder-grand-total-jpy">
                  ¥{fmt(totalJpy)}
                </p>
                <div className="builder-total-breakdown">
                  <span>Отели: ₽{fmt(jpyToRub(hotelsJpy))} (¥{fmt(hotelsJpy)})</span>
                  <span>Рестораны: ₽{fmt(jpyToRub(restaurantsJpy))} (¥{fmt(restaurantsJpy)})</span>
                  <span>Активности: ₽{fmt(jpyToRub(activitiesJpy))} (¥{fmt(activitiesJpy)})</span>
                </div>
                <p className="builder-fx-note">
                  Курс: ¥100 = ₽51.52
                </p>
              </article>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="builder-nav">
        {step > 0 && (
          <button
            className="builder-nav-btn"
            onClick={() => setStep(step - 1)}
            type="button"
          >
            Назад
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button
            className="builder-nav-btn builder-nav-btn-primary"
            onClick={() => setStep(step + 1)}
            type="button"
          >
            Далее
          </button>
        )}
      </div>
    </div>
  )
}
