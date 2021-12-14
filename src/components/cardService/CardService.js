import styles from './CardService.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import ApiWallet from '../../api'
import { useNavigate } from 'react-router-dom'


const CardService = ({ service, attList, setIdEdicao }) => {

  const navigate = useNavigate()

  const deleteServices = async (idServico) => {
    try {
      await ApiWallet.delete(`/servico/delete-servico/${idServico}`)
    } finally {
      attList()
    }
  }

  return (
    <div className={styles.pageCardService}>
      <div className={styles.containerCardService}>
        <p>Nome: {service.nome}</p>
        <p>Descrição: {service.descricao}</p>
        <p>Website: {service.webSite}</p>
        <p>Moeda: {service.moeda}</p>
        <p>Valor: {service.valor}</p>
        <p>Periodicidade: {service.periocidade}</p>
        <p>Gerente Encarregado: {service.gerente.nomeCompleto}</p>
        <button onClick={() => { navigate(`/criarservico/${service.idServico}`) }} ><FaEdit /></button>
        <button onClick={() => deleteServices(service.idServico)} ><RiDeleteBin2Fill /></button>
      </div>
    </div>
  )
}

export default CardService
