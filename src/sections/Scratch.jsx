import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section, { Item, SectionTitle } from '../components/Section'
import ScratchCard from '../components/ScratchCard'
import { eventParts } from '../lib/format'

export default function Scratch({ scratch, event }) {
  const [revealed, setRevealed] = useState(false)
  const date = eventParts(event.start, event.timeZone)

  return (
    <Section id="surprise" className="scratch-section">
      <SectionTitle>{scratch.title}</SectionTitle>
      <Item as="p" className="lead">
        {scratch.hint}
      </Item>
      <Item>
        <ScratchCard onReveal={() => setRevealed(true)}>
          <p className="scratch__label">Save the Date</p>
          <p className="scratch__date">{date.numeric}</p>
          <p className="scratch__day">{date.weekday}</p>
        </ScratchCard>
      </Item>
      <AnimatePresence>
        {revealed && (
          <motion.p
            className="scratch__note"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {scratch.revealedNote}
          </motion.p>
        )}
      </AnimatePresence>
    </Section>
  )
}
