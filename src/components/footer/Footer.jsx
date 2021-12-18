
import styles from './Footer.module.css'
import { FaCopyright } from 'react-icons/fa'
import { BiRegistered } from 'react-icons/bi'

const Footer = () => {
  return (
    <div className={styles.body}>
      <span>
        <p><FaCopyright /> 2021 Onde está wallet? <BiRegistered /> Todos os direitos reservados</p>
      </span>
    </div>
  )
}

export default Footer;