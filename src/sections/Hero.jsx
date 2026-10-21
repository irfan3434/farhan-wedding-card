import Section, { Item } from '../components/Section'
import Divider from '../components/Divider'

function Person({ person }) {
  return (
    <div className="person">
      <Item as="h1" className="person__name">
        {person.name}
      </Item>
      <Item as="p" className="person__parents">
        {person.parents}
      </Item>
      <Item as="p" className="person__meta">
        <span>{person.qualifications}</span>
        <span>{person.profession}</span>
      </Item>
    </div>
  )
}

export default function Hero({ couple, hero }) {
  return (
    <Section id="home" className="hero" delay={0.7}>
      <Item as="p" className="kicker">
        {hero.eyebrow}
      </Item>
      <Item>
        <Divider />
      </Item>
      <Person person={couple.groom} />
      <Item as="p" className="ampersand" aria-hidden="true">
        &amp;
      </Item>
      <Person person={couple.bride} />
      <Item as="a" href="#welcome" className="scroll-hint">
        Scroll <span aria-hidden="true">↓</span>
      </Item>
    </Section>
  )
}
