import { motion } from 'framer-motion'
import Divider from '../components/Divider'

export default function Footer({ footer, couple }) {
  const first = (name) => name.split(' ')[0]
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1 }}
    >
      <Divider />
      <p className="footer__message">{footer.message}</p>
      <p className="footer__names">
        {first(couple.groom.name)} &amp; {first(couple.bride.name)}
      </p>
      {footer.hashtag && <p className="footer__tag">{footer.hashtag}</p>}
    </motion.footer>
  )
}
