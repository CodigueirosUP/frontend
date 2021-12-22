import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Menu = () => {

  const { auth, typeUser, tabVisualization } = useContext(AuthContext);

  return (
    <>
      {
        auth ?
          <nav className={styles.menu}>
            <li><Link className={tabVisualization === 'dashboard' ? styles.menuActive : undefined} to='/dashboard' >Dashboard</Link></li>
            {typeUser.usuario === 'admin' && 
            <>
            <li><Link className={tabVisualization === 'manager' ? styles.menuActive : undefined} to='/gerentes'>Gerentes</Link></li>
            <li><Link className={tabVisualization === 'service' ? styles.menuActive : undefined} to='/servicos'>Serviços</Link></li>
            </>
            }
            <li><Link className={tabVisualization === 'about' ? styles.menuActive : undefined} to='/sobre' >Sobre</Link></li>
            <li><Link className={tabVisualization === 'contact' ? styles.menuActive : undefined} to='/contato' >Contato</Link></li>
          </nav>
          :
          <nav className={styles.menu}>
            <li><Link className={tabVisualization === 'login' ? styles.menuActive : undefined} to='/login' >Login</Link></li>
            <li><Link className={tabVisualization === 'about' ? styles.menuActive : undefined} to='/sobre' >Sobre</Link></li>
            <li><Link className={tabVisualization === 'contact' ? styles.menuActive : undefined} to='/contato' >Contato</Link></li>
          </nav>
      }
    </>
  )
}

export default Menu;
