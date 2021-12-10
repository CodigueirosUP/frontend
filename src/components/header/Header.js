import Menu from "../menu/Menu"
import styles from './Header.module.css'
import logo from '../../images/kisspng-where-s-wally-the-fantastic-journey-walker-books-5b04a8b051cf03.6091566215270319843351.png'


const Header = () => {
  return (
    <header >
      <div className={styles.headerContainer}>
        <a href="/">
          <img width='50px' src={logo} alt="Logo" />
          <span>Onde está o Wallet?</span>
        </a>
        <Menu />
      </div>
    </header>
  )
}

export default Header
