import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav>
      <li><Link to='/'>Gerentes</Link></li>
      <li><Link to='/'>Serviços</Link></li>
      <li><Link to='/login' >Login</Link></li>
      <li><Link to='/sobre' >Sobre</Link></li>
      <li><Link to='/contato' >Contato</Link></li>
    </nav>
  )
}

export default Menu
