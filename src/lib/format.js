// Date formatting in the event's own time zone, so every guest sees the local ceremony time.

export function eventParts(iso, timeZone) {
  const date = new Date(iso)
  const fmt = (opts) => new Intl.DateTimeFormat('en-US', { timeZone, ...opts }).format(date)
  return {
    weekday: fmt({ weekday: 'long' }),
    month: fmt({ month: 'long' }),
    day: fmt({ day: 'numeric' }),
    year: fmt({ year: 'numeric' }),
    time: fmt({ hour: 'numeric', minute: '2-digit' }),
    numeric: new Intl.DateTimeFormat('en-GB', { timeZone, day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(date)
      .replace(/\//g, ' · '),
  }
}

// "2026-12-17" -> "Thursday, 17 December"
export function formatDay(isoDate) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  const fmt = (opts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(date)
  return `${fmt({ weekday: 'long' })}, ${fmt({ day: 'numeric', month: 'long' })}`
}
