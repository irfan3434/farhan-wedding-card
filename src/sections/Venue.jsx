import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section, { Item, SectionTitle } from '../components/Section'
import { formatDay } from '../lib/format'

const mapLinks = (place) => {
  const coords = `${place.lat},${place.lng}`
  return {
    embed: `https://maps.google.com/maps?q=${coords}&z=${Math.round(place.zoom ?? 15)}&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${coords}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${coords}`,
  }
}

// One venue per event, shown one at a time behind tabs so the section stays uncluttered on phones.
export default function Venue({ venues }) {
  const { places } = venues
  const [active, setActive] = useState(0)
  // Maps load only once their tab has been opened, then stay mounted so switching back is instant.
  const [visited, setVisited] = useState(() => new Set([0]))
  const tabsRef = useRef([])
  const place = places[active]
  const links = mapLinks(place)

  const select = (i) => {
    setActive(i)
    setVisited((v) => new Set(v).add(i))
  }

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const next = (active + step + places.length) % places.length
    select(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <Section id="venue" className="venue">
      <SectionTitle kicker={venues.kicker}>{venues.title}</SectionTitle>

      <Item className="venue-tabs" role="tablist" aria-label="Event venues" onKeyDown={onKeyDown}>
        {places.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => (tabsRef.current[i] = el)}
            type="button"
            role="tab"
            id={`venue-tab-${p.id}`}
            aria-selected={i === active}
            aria-controls="venue-panel"
            tabIndex={i === active ? 0 : -1}
            className={`venue-tabs__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => select(i)}
          >
            {i === active && (
              <motion.span
                layoutId="venue-tab-pill"
                className="venue-tabs__pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="venue-tabs__label">{p.label}</span>
          </button>
        ))}
      </Item>

      <Item className="venue-card" id="venue-panel" role="tabpanel" aria-labelledby={`venue-tab-${place.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={place.id}
            className="venue-card__info"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="venue-card__when">
              <span>{formatDay(place.date)}</span>
              {place.time && <span> · {place.time}</span>}
            </p>
            <h3 className="venue-card__name">{place.name}</h3>
            <p className="venue-card__address">{place.address}</p>
          </motion.div>
        </AnimatePresence>

        <div className="map">
          {places.map(
            (p, i) =>
              visited.has(i) && (
                <iframe
                  key={p.id}
                  title={`Map of ${p.name}`}
                  src={mapLinks(p).embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  hidden={i !== active}
                />
              ),
          )}
        </div>

        <div className="venue-card__actions">
          <a className="btn btn--primary btn--sm" href={links.directions} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 21.5 12 12 21.5 2.5 12z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 13.5V11h5m-1.8-2L14 11l-1.8 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Directions
          </a>
          <a className="btn btn--ghost btn--sm" href={links.open} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Open Map
          </a>
        </div>
      </Item>
    </Section>
  )
}
