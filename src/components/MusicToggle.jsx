import { motion } from 'framer-motion'

export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      type="button"
      className={`music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-label={playing ? 'Mute music' : 'Play music'}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5 }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        {playing ? (
          <g className="music-toggle__waves" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M15 9.2a4 4 0 0 1 0 5.6" />
            <path d="M17.6 6.8a7.4 7.4 0 0 1 0 10.4" />
          </g>
        ) : (
          <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        )}
      </svg>
    </motion.button>
  )
}
