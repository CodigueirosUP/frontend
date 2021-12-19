import styles from './CardService.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import {ApiWallet} from '../../api'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSucess } from '../../utils/toast'
import { formactCurrencyReal } from '../../utils/formactCurrency'



const CardService = ({ service, attList }) => {

  

  const navigate = useNavigate()

  const deleteServices = async (idServico) => {
    try {
      await ApiWallet.delete(`/servico/delete-servico/${idServico}`)
      .then(() => {
        toastSucess('Serviço removido com sucesso');
    })
    .catch(() => {
      toastError('Algo deu errado ao remover');
    })
      
    } finally {
      console.log("teste da lista")
      attList()
    }
  }

  return (
    <div className={styles.pageCardService}>
      <div className={styles.containerCardService}>
        <div className={styles.linesContainer} >
          <p>Nome: {service.nome}</p>
          <p>Descrição: {service.descricao}</p>
          <p>Website: {service.webSite}</p>
          <p>Moeda: {service.moeda}</p>
          <p>Valor: {formactCurrencyReal(service.valor)}</p>
          <p>Periodicidade: {service.periocidade}</p>
        </div>
        {service.gerente &&  <p>Gerente: {service.gerente.nomeCompleto}</p>}
        <div className={styles.buttons}>
          <button onClick={() => { navigate(`/criarservico/${service.idServico}`) }} ><FaEdit className={styles.icons}/> Editar Serviço</button>
          <button onClick={() => deleteServices(service.idServico)} ><RiDeleteBin2Fill className={styles.icons}/> Excluir Serviço</button>
        </div>
      </div>
    </div>
  )
}

export default CardService
