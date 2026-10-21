import { useState } from 'react'
import { motion } from 'framer-motion'
import corner from '../assets/corner.svg'
import Divider from './Divider'
import { eventParts } from '../lib/format'

const ease = [0.65, 0, 0.35, 1]

// Closed gatefold card with a belly band + wax seal. Tapping swings both doors open.
export default function Gate({ couple, gate, event, onOpen, onDone }) {
  const [opening, setOpening] = useState(false)
  const date = eventParts(event.start, event.timeZone)
  const first = (name) => name.split(' ')[0]

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen()
  }

  const door = (side) => (
    <motion.div
      className={`gate__door gate__door--${side}`}
      initial={false}
      animate={opening ? { rotateY: side === 'left' ? -112 : 112, opacity: [1, 1, 0] } : { rotateY: 0 }}
      transition={{ duration: 1.7, ease, delay: 0.45, opacity: { duration: 1.7, delay: 0.45, times: [0, 0.75, 1] } }}
      onAnimationComplete={() => opening && side === 'right' && onDone()}
    >
      <div className="gate__door-frame" />
      <img src={corner} className="gate__corner gate__corner--top" alt="" aria-hidden="true" />
      <img src={corner} className="gate__corner gate__corner--bottom" alt="" aria-hidden="true" />
    </motion.div>
  )

  return (
    <div className="gate" onClick={open}>
      {door('left')}
      {door('right')}

      <motion.div
        className="gate__band"
        animate={opening ? { opacity: 0, scale: 0.92, y: 12 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <p className="gate__eyebrow">{gate.eyebrow}</p>
          <p className="gate__names">
            {first(couple.groom.name)} <span>&amp;</span> {first(couple.bride.name)}
          </p>
          <Divider className="gate__divider" />
        </motion.div>

        <button type="button" className="seal" onClick={(e) => { e.stopPropagation(); open() }} aria-label={gate.cta} autoFocus>
          <span className="seal__ring" />
          <span className="seal__initials">
            {couple.initials[0]}
            <i>&amp;</i>
            {couple.initials[1]}
          </span>
        </button>

        <p className="gate__cta">{gate.cta}</p>
        <p className="gate__date">
          {date.day} {date.month} {date.year}
        </p>
      </motion.div>
    </div>
  )
}
