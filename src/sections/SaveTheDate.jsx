import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section, { Item, SectionTitle } from '../components/Section'
import Divider from '../components/Divider'
import { eventParts } from '../lib/format'
import { downloadIcs, googleCalendarUrl } from '../lib/calendar'

export default function SaveTheDate({ event, venue }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const date = eventParts(event.start, event.timeZone)
  const calEvent = { ...event, location: `${venue.name}, ${venue.address}` }

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false)
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <Section id="save-the-date" className="std">
      <SectionTitle kicker="Kindly join us on">Save the Date</SectionTitle>

      <Item className="std__date">
        <p className="std__month">{date.month}</p>
        <div className="std__row">
          <span className="std__side">{date.weekday}</span>
          <span className="std__day">{date.day}</span>
          <span className="std__side">{date.time}</span>
        </div>
        <p className="std__year">{date.year}</p>
      </Item>

      <Item>
        <Divider />
      </Item>

      <Item className="cal" ref={menuRef}>
        <button
          type="button"
          className="btn btn--primary"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Save the Date
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="cal__menu"
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <a
                role="menuitem"
                href={googleCalendarUrl(calEvent)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Google Calendar
              </a>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  downloadIcs(calEvent, 'wedding-invitation.ics')
                  setMenuOpen(false)
                }}
              >
                Apple / Outlook (.ics)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Item>
    </Section>
  )
}
