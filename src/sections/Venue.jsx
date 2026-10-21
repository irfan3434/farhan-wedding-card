import Section, { Item, SectionTitle } from '../components/Section'

export default function Venue({ venue }) {
  const coords = `${venue.lat},${venue.lng}`
  const embed = `https://maps.google.com/maps?q=${coords}&z=${Math.round(venue.zoom ?? 15)}&output=embed`
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`

  return (
    <Section id="venue" className="venue">
      <SectionTitle kicker="Where to find us">{venue.title}</SectionTitle>
      <Item as="h3" className="venue__name">
        {venue.name}
      </Item>
      <Item as="p" className="venue__address">
        {venue.address}
      </Item>
      <Item className="map">
        <iframe
          title={`Map of ${venue.name}`}
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Item>
      <Item className="venue__actions">
        <a className="btn btn--primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
        <a className="btn btn--ghost" href={openUrl} target="_blank" rel="noopener noreferrer">
          Open in Maps
        </a>
      </Item>
    </Section>
  )
}
