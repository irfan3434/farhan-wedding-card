import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section, { Item, SectionTitle } from '../components/Section'
import { eventParts } from '../lib/format'

function remaining(target) {
  const ms = Math.max(0, target - Date.now())
  const s = Math.floor(ms / 1000)
  return {
    done: ms === 0,
    units: [
      ['Days', Math.floor(s / 86400)],
      ['Hours', Math.floor((s % 86400) / 3600)],
      ['Minutes', Math.floor((s % 3600) / 60)],
      ['Seconds', s % 60],
    ],
  }
}

export default function Countdown({ countdown, event }) {
  const target = new Date(event.start).getTime()
  const [time, setTime] = useState(() => remaining(target))
  const date = eventParts(event.start, event.timeZone)

  useEffect(() => {
    if (time.done) return
    const id = setInterval(() => setTime(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target, time.done])

  return (
    <Section id="countdown" className="countdown">
      <SectionTitle kicker="Until we say “Qubool Hai”">{countdown.title}</SectionTitle>
      {time.done ? (
        <Item as="p" className="countdown__done">
          {countdown.doneMessage}
        </Item>
      ) : (
        <Item className="countdown__grid" role="timer" aria-live="off">
          {time.units.map(([label, value]) => (
            <div className="countdown__cell" key={label}>
              <span className="countdown__num">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={value}
                    initial={{ y: '-60%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '60%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {String(value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="countdown__label">{label}</span>
            </div>
          ))}
        </Item>
      )}
      <Item as="p" className="lead">
        {date.weekday}, {date.day} {date.month} {date.year} · {date.time}
      </Item>
    </Section>
  )
}
