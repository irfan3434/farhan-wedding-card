import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import config from './config/wedding.json'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import Gate from './components/Gate'
import MusicToggle from './components/MusicToggle'
import Hero from './sections/Hero'
import Welcome from './sections/Welcome'
import Scratch from './sections/Scratch'
import SaveTheDate from './sections/SaveTheDate'
import Gallery from './sections/Gallery'
import Countdown from './sections/Countdown'
import Timeline from './sections/Timeline'
import Venue from './sections/Venue'
import Footer from './sections/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [gateVisible, setGateVisible] = useState(true)
  const music = useBackgroundMusic(config.music?.src, config.music?.volume)

  useEffect(() => {
    if (config.pageTitle) document.title = config.pageTitle
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', gateVisible)
  }, [gateVisible])

  const handleOpen = () => {
    window.scrollTo(0, 0)
    setOpened(true)
    music.start()
  }

  return (
    <MotionConfig reducedMotion="user">
      {opened && (
        <main>
          <Hero couple={config.couple} hero={config.hero} />
          <Welcome welcome={config.welcome} />
          <Scratch scratch={config.scratch} event={config.event} />
          <SaveTheDate event={config.event} venue={config.venue} />
          <Gallery gallery={config.gallery} />
          <Countdown countdown={config.countdown} event={config.event} />
          <Timeline timeline={config.timeline} />
          <Venue venue={config.venue} />
          <Footer footer={config.footer} couple={config.couple} />
        </main>
      )}

      {opened && music.available && <MusicToggle playing={music.playing} onToggle={music.toggle} />}

      {gateVisible && (
        <Gate couple={config.couple} gate={config.gate} event={config.event} onOpen={handleOpen} onDone={() => setGateVisible(false)} />
      )}
    </MotionConfig>
  )
}
