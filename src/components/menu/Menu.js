import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='/gerentes'>Gerentes</Link></li>
      <li><Link to='/servicos'>Serviços</Link></li>
      <li><Link to='/sobre' >Sobre</Link></li>
      <li><Link to='/contato' >Contato</Link></li>
      <li><Link to='/login' >Login</Link></li>
    </nav>
  )
}

export default Menu
