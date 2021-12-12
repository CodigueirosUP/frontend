import styles from './CardManager.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'

const CardManager = ({manager}) => {
  return (
    <div className= {styles.pageCardMenager}>
      <div className= {styles.containerCardMenager}>
        <p>Nome: {manager.nomeCompleto} </p>
        <p>Email: {manager.email} </p>
        <p>Usuário: {manager.usuario.usuario} </p>
        <button><FaEdit /></button>
        <button><RiDeleteBin2Fill /></button>
      </div>
    </div>
  )
}

export default CardManager
