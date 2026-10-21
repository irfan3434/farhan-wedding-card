import corner from '../assets/corner.svg'

// Four floral corners (one image, mirrored) around a framed card.
export default function Corners({ eager = false }) {
  return ['tl', 'tr', 'bl', 'br'].map((pos) => (
    <img
      key={pos}
      src={corner}
      className={`corner corner--${pos}`}
      alt=""
      aria-hidden="true"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  ))
}
