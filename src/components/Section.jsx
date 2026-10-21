import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: (delay = 0) => ({ transition: { staggerChildren: 0.13, delayChildren: delay } }),
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

// One screen-tall section framed by botanical vines; its <Item> children fade/slide in on scroll.
export default function Section({ id, className = '', delay = 0, children }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="vine vine--left" aria-hidden="true" />
      <div className="vine vine--right" aria-hidden="true" />
      <motion.div
        className="section__inner"
        variants={container}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export const Item = forwardRef(function Item({ as = 'div', className, children, ...rest }, ref) {
  const Tag = motion[as]
  return (
    <Tag ref={ref} className={className} variants={item} {...rest}>
      {children}
    </Tag>
  )
})

export function SectionTitle({ children, kicker }) {
  return (
    <>
      {kicker && (
        <Item as="p" className="kicker">
          {kicker}
        </Item>
      )}
      <Item as="h2" className="script-title">
        {children}
      </Item>
    </>
  )
}
