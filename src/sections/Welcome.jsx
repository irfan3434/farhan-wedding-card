import Section, { Item, SectionTitle } from '../components/Section'
import Corners from '../components/Corners'
import Divider from '../components/Divider'

export default function Welcome({ welcome }) {
  return (
    <Section id="welcome" className="welcome">
      <Item className="frame">
        <Corners />
        <SectionTitle>{welcome.title}</SectionTitle>
        <Item>
          <Divider />
        </Item>
        <Item as="p" className="welcome__message">
          {welcome.message}
        </Item>
      </Item>
    </Section>
  )
}
