import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FaUserCircle } from 'react-icons/fa';

const Menu = () => {

  const { auth, typeUser } = useContext(AuthContext);

  return (
    <>
      {
        auth ?
          <nav className={styles.menu}>
            <li><Link to='/dashboard' >Dashboard</Link></li>
            <li><Link to='/gerentes'>Gerentes</Link></li>
            <li><Link to='/servicos'>Serviços</Link></li>
            <li><Link to='/sobre' >Sobre</Link></li>
            <li><Link to='/contato' >Contato</Link></li>
            {typeUser.usuario && <li><span className={styles.user}><FaUserCircle className={styles.imgUser} />{typeUser.usuario}</span></li>}
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

export default Menu
