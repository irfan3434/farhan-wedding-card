import { useCallback, useEffect, useRef, useState } from 'react'

// Looping background audio. Browsers only allow playback after a user gesture,
// so `start()` is called from the gate's "Tap to Open" handler.
export function useBackgroundMusic(src, volume = 0.5) {
  const audioRef = useRef(null)
  const wantsPlayRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(Boolean(src))

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = volume
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    // Pause while the tab is hidden; resume if the guest had music on.
    const onVisibility = () => {
      if (document.hidden) audio.pause()
      else if (wantsPlayRef.current) audio.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [src, volume])

  const start = useCallback(() => {
    wantsPlayRef.current = true
    audioRef.current?.play().catch(() => {})
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    wantsPlayRef.current = audio.paused
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }, [])

  return { start, toggle, playing, available }
}
