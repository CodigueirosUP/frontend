import styles from './CardService.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import {ApiWallet} from '../../api'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSucess } from '../../utils/toast'
import { formactCurrencyReal } from '../../utils/formactCurrency'
import moment from 'moment'



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
      attList()
    }
  }

  if(service.dataDeletado === null){
    return (
      <div className={styles.pageCardService}>
        <div className={styles.containerCardService}>
          <div className={styles.linesContainer} >
            <p><strong>Nome do serviço:</strong> {service.nome}</p>
            <p><strong>Descrição:</strong> {service.descricao}</p>
            <p><strong>Website:</strong> {service.webSite}</p>
          {service.gerente &&  <p><strong>Gerente</strong>: {service.gerente.nomeCompleto}</p>}
            <p><strong>Valor {service.moeda !== 'REAL' ? <span>({service.moeda}/REAL)</span> : null}:</strong> {formactCurrencyReal(service.valor)}</p>
            <p><strong>Moeda:</strong> {service.moeda}</p>
            <p><strong>Periodicidade:</strong> {service.periocidade}</p>
            <p><strong>Data de contrato:</strong> {moment(service.data).format('DD/MM/YYYY')}</p>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => { navigate(`/criarservico/${service.idServico}`) }} ><FaEdit className={styles.icons}/> Editar Serviço</button>
            <button onClick={() => deleteServices(service.idServico)} ><RiDeleteBin2Fill className={styles.icons}/> Excluir Serviço</button>
          </div>
        </div>
      </div>
    )
  }

  return(
    <></>
  );

 
}

export default CardService
