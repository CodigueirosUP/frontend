import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Menu = () => {

  const { auth, typeUser } = useContext(AuthContext);

  return (
    <>
      {
        auth ?
          <nav className={styles.menu}>
            <li><Link to='/dashboard' >Dashboard</Link></li>
            {typeUser.usuario === 'admin' && 
            <>
            <li><Link to='/gerentes'>Gerentes</Link></li>
            <li><Link to='/servicos'>Serviços</Link></li>
            </>
            }
            <li><Link to='/sobre' >Sobre</Link></li>
            <li><Link to='/contato' >Contato</Link></li>
          </nav>
          :
          <nav className={styles.menu}>
            <li><Link to='/login' >Login</Link></li>
            <li><Link to='/sobre' >Sobre</Link></li>
            <li><Link to='/contato' >Contato</Link></li>
          </nav>
      }
    </>
  )
}

export default Menu;
