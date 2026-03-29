import type { ReactNode } from 'react'
import type {
  BookingLink,
  CityMoment,
  TableRow,
  WardrobeCapsule,
} from '../trip-content'
import type { AvailabilityEntry } from '../availability'

export function AvailabilityBadge({ status }: { status?: AvailabilityEntry }) {
  if (!status) return <span className="avail-badge avail-unknown">нет данных</span>
  return (
    <span className={`avail-badge ${status.available ? 'avail-yes' : 'avail-no'}`}>
      {status.available ? 'доступно' : 'занято'}
    </span>
  )
}

export function ChapterHeader({
  eyebrow,
  page,
  title,
  description,
}: {
  eyebrow: string
  page: string
  title: string
  description: string
}) {
  return (
    <header className="chapter-header">
      <div className="chapter-meta">
        <span>{eyebrow}</span>
        <span>{page}</span>
      </div>
      <div className="chapter-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  )
}

type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  align?: 'left' | 'right'
}

export function LedgerTable<T extends TableRow>({
  columns,
  data,
}: {
  columns: Column<T>[]
  data: T[]
}) {
  return (
    <div className="ledger-shell">
      <table className="ledger-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.align === 'right' ? 'align-right' : undefined}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.align === 'right' ? 'align-right' : undefined}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function GoldenHourPanel({
  title,
  items,
  tone,
  wide = false,
}: {
  title: string
  items: CityMoment[]
  tone: 'am' | 'pm' | 'neutral'
  wide?: boolean
}) {
  return (
    <article
      className={`soft-panel city-panel ${wide ? 'city-panel-wide' : ''}`}
      data-tone={tone}
    >
      <p className="mini-label">{title}</p>
      <div className="city-moment-list">
        {items.map((item) => (
          <div key={item.name} className={`city-moment${item.image ? ' has-image' : ''}`}>
            {item.image && (
              <figure className="moment-image">
                <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                <figcaption>
                  <a href={item.image.creditUrl} target="_blank" rel="noreferrer">
                    {item.image.creditLabel}
                  </a>
                </figcaption>
              </figure>
            )}
            <div className="moment-copy">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export function CapsuleStrip({
  capsules,
  activeId,
  onChange,
}: {
  capsules: WardrobeCapsule[]
  activeId: string
  onChange: (id: string) => void
}) {
  return (
    <div className="capsule-strip" role="tablist" aria-label="Wardrobe capsules">
      {capsules.map((capsule) => (
        <button
          key={capsule.id}
          aria-selected={capsule.id === activeId}
          className={`capsule-button ${
            capsule.id === activeId ? 'is-active' : ''
          }`}
          onClick={() => onChange(capsule.id)}
          onFocus={() => onChange(capsule.id)}
          onMouseEnter={() => onChange(capsule.id)}
          role="tab"
          type="button"
        >
          <div className="capsule-button-head">
            <span>{capsule.title}</span>
            <div className="capsule-inline-palette" aria-hidden="true">
              {capsule.palette.map((color) => (
                <span
                  key={`${capsule.id}-${color}`}
                  className="capsule-swatch"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <p>{capsule.preview}</p>
        </button>
      ))}
    </div>
  )
}

export function LinkIndex({ links }: { links: BookingLink[] }) {
  return (
    <div className="link-index">
      {links.map((link) => (
        <a
          key={link.label}
          className="link-index-item"
          href={link.url}
          rel="noreferrer"
          target="_blank"
        >
          <span>{link.label}</span>
          <small>{link.url.replace(/^https?:\/\//, '')}</small>
        </a>
      ))}
    </div>
  )
}
