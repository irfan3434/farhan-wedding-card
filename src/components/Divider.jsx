// Gold line-and-flourish divider.
export default function Divider({ className = '' }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 12H86" />
        <path d="M154 12H236" />
        <path d="M86 12c8 0 12-8 20-8 6 0 8 5 4 8-4 3-10 0-6-4M154 12c-8 0-12-8-20-8-6 0-8 5-4 8 4 3 10 0 6-4" />
        <path d="M86 12c8 0 12 8 20 8 6 0 8-5 4-8M154 12c-8 0-12 8-20 8-6 0-8-5-4-8" opacity=".7" />
      </g>
      <path d="M120 4l5 8-5 8-5-8z" fill="currentColor" />
      <circle cx="4" cy="12" r="1.6" fill="currentColor" />
      <circle cx="236" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}
