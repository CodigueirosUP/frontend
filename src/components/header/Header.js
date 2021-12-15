import Menu from "../menu/Menu"
import styles from './Header.module.css'
import logo from '../../images/kisspng-where-s-wally-the-fantastic-journey-walker-books-5b04a8b051cf03.6091566215270319843351.png'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Header = () => {

  const {handleLogout, typeUser} = useContext(AuthContext);
  const navigate = useNavigate()
 
  return (
    <header >
      <div className={styles.headerContainer}>
      <div>
        <a href="/">
          <img width='50px' src={logo} alt="Logo" />
          <span>Onde está o Wallet?</span>
        </a>
        </div>
        <div className={styles.rigth}>
          <Menu />
          {typeUser.usuario && 
            <>
              <span><span className={styles.user}><FaUserCircle className={styles.imgUser} />{typeUser.usuario}</span></span>
              <button onClick={() => handleLogout(navigate)}>sair</button>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
