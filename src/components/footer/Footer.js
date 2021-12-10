import styles from './Footer.module.css'
import { FaCopyright } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className={styles.body}>
      <span><FaCopyright /></span>
      <span>
        <address> AV Andarai, RS</address>
      </span>
    </div>
  )
}

export default Footer
