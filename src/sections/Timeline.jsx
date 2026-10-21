import Section, { Item, SectionTitle } from '../components/Section'
import { formatDay } from '../lib/format'

export default function Timeline({ timeline }) {
  return (
    <Section id="program" className="timeline">
      <SectionTitle kicker="The Programme">{timeline.title}</SectionTitle>
      {timeline.days.map((day) => (
        <Item className="tl-day" key={day.date}>
          <h3 className="tl-day__label">{day.label}</h3>
          <p className="tl-day__date">{formatDay(day.date)}</p>
          <ol className="tl-list">
            {day.items.map((it) => (
              <li className="tl-item" key={`${it.time}-${it.title}`}>
                <span className="tl-item__time">{it.time}</span>
                <span className="tl-item__title">{it.title}</span>
                {it.note && <span className="tl-item__note">{it.note}</span>}
              </li>
            ))}
          </ol>
        </Item>
      ))}
    </Section>
  )
}
