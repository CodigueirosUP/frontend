import styles from './CardManager.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import ApiWallet from '../../api'

const CardManager = ({manager, attList, setIdEdicao}) => {


  const deleteManager = async (idGerente) => {
    try {
      await ApiWallet.delete(`/gerente/${idGerente}`);    
    } finally {
      attList()
    }
  }
  
  return (
    <div className= {styles.pageCardMenager}>
      <div className= {styles.containerCardMenager}>
        <p>Nome: {manager.nomeCompleto} </p>
        <p>Email: {manager.email} </p>
        <p>Usuário: {manager.usuario.usuario} </p>
        <button onClick={() => setIdEdicao(manager.idGerente)}><FaEdit /></button>
        <button  onClick={() => deleteManager(manager.idGerente)} ><RiDeleteBin2Fill /></button>
      </div>
    </div>
  )
}

export default CardManager
