import styles from './CardManager.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { ApiWallet } from '../../api'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSucess } from '../../utils/toast'


const CardManager = ({ manager, attList }) => {

  const navigate = useNavigate();

  const deleteManager = async (idGerente) => {
    try {
      await ApiWallet.delete(`/gerente/${idGerente}`)
        .then(() => {
          toastSucess('Gerente removido com sucesso')
        })
        .catch(() => {
          toastError('Algo deu errado ao tentar remover')
        })
    } finally {
      attList()
    }

  }

  return (
    <div className={styles.pageCardMenager}>
      <div className={styles.containerCardMenager}>
        <div className={styles.linesContainer} >
          <p><strong>Nome:</strong> {manager.nomeCompleto} </p>
          <p><strong>Email:</strong> {manager.email} </p>
          <p><strong>Usuário:</strong> {manager.usuario.usuario} </p>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => { navigate(`/criargerentes/${manager.idGerente}`) }}><FaEdit /> Editar Gerente</button>
          <button onClick={() => deleteManager(manager.idGerente)} ><RiDeleteBin2Fill /> Excluir Gerente</button>
        </div>
      </div>
    </div>
  )
}

export default CardManager
