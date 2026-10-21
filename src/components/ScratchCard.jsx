import { useCallback, useEffect, useRef, useState } from 'react'

// Heart drawn in a 100 x 92 box; reused for the canvas cover and the CSS clip of the hidden content.
const HEART =
  'M50 88C20 66 4 48 4 30C4 15 15 5 28 5C38 5 46 11 50 19C54 11 62 5 72 5C85 5 96 15 96 30C96 48 80 66 50 88Z'
const VB_W = 100
const VB_H = 92
const REVEAL_AT = 0.5 // reveal fully once half the heart is scratched away

function paintCover(ctx, w, h) {
  const heart = new Path2D(HEART)
  ctx.save()
  ctx.scale(w / VB_W, h / VB_H)

  const grad = ctx.createLinearGradient(0, 0, VB_W, VB_H)
  grad.addColorStop(0, '#f0c6bf')
  grad.addColorStop(0.45, '#d99a94')
  grad.addColorStop(0.75, '#d6ad74')
  grad.addColorStop(1, '#b98d4c')
  ctx.fillStyle = grad
  ctx.fill(heart)

  // Texture: speckled foil + soft sheen, clipped to the heart.
  ctx.clip(heart)
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(120,60,50,0.12)'
    ctx.beginPath()
    ctx.arc(Math.random() * VB_W, Math.random() * VB_H, Math.random() * 0.7 + 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  const sheen = ctx.createLinearGradient(10, 10, 70, 70)
  sheen.addColorStop(0, 'rgba(255,255,255,0)')
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.35)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, VB_W, VB_H)

  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.textAlign = 'center'
  ctx.font = '13px "Great Vibes", cursive'
  ctx.fillText('Scratch here', 50, 42)
  ctx.font = '4px "Cormorant Garamond", serif'
  ctx.fillText('✦  ✦  ✦', 50, 52)
  ctx.restore()

  ctx.save()
  ctx.scale(w / VB_W, h / VB_H)
  ctx.strokeStyle = 'rgba(179,143,69,0.9)'
  ctx.lineWidth = 0.8
  ctx.stroke(heart)
  ctx.restore()
}

export default function ScratchCard({ children, onReveal }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const state = useRef({ drawing: false, last: null, started: false, total: 0, moves: 0, dpr: 1 })
  const [revealed, setRevealed] = useState(false)

  const setup = useCallback(async () => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap || state.current.started) return
    try {
      await document.fonts.load('13px "Great Vibes"')
    } catch {
      /* draw with fallback font */
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = wrap.getBoundingClientRect()
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paintCover(ctx, canvas.width, canvas.height)

    // Count the opaque pixels of the heart once, to measure progress against.
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let total = 0
    for (let i = 3; i < data.length; i += 16) if (data[i] > 128) total++
    Object.assign(state.current, { total, dpr })
  }, [])

  useEffect(() => {
    setup()
    const ro = new ResizeObserver(() => setup())
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [setup])

  const reveal = useCallback(() => {
    setRevealed(true)
    onReveal?.()
  }, [onReveal])

  const checkProgress = () => {
    const canvas = canvasRef.current
    const { total } = state.current
    if (!canvas || !total) return
    const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
    let left = 0
    for (let i = 3; i < data.length; i += 16) if (data[i] > 128) left++
    if (1 - left / total >= REVEAL_AT) reveal()
  }

  const pointAt = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const { dpr } = state.current
    return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr }
  }

  const scratch = (from, to) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = canvas.width * 0.11
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x + 0.01, to.y)
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
  }

  const onPointerDown = (e) => {
    if (revealed) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const p = pointAt(e)
    Object.assign(state.current, { drawing: true, last: p, started: true })
    scratch(p, p)
  }

  const onPointerMove = (e) => {
    const s = state.current
    if (!s.drawing || revealed) return
    const p = pointAt(e)
    scratch(s.last, p)
    s.last = p
    if (++s.moves % 12 === 0) checkProgress()
  }

  const onPointerUp = () => {
    if (!state.current.drawing) return
    state.current.drawing = false
    checkProgress()
  }

  return (
    <div className={`scratch ${revealed ? 'is-revealed' : ''}`} ref={wrapRef}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
          <path d={HEART} transform={`scale(${1 / VB_W} ${1 / VB_H})`} />
        </clipPath>
      </svg>
      <div className="scratch__content">{children}</div>
      <svg className="scratch__outline" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true">
        <path d={HEART} />
      </svg>
      <canvas
        ref={canvasRef}
        className="scratch__canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Scratch card: scratch the heart to reveal the date"
        role="img"
      />
      {!revealed && (
        <button type="button" className="scratch__skip" onClick={reveal}>
          Reveal without scratching
        </button>
      )}
    </div>
  )
}
