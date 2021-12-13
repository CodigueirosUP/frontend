import styles from './CardService.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBack2Fill } from 'react-icons/ri'
const CardService = ({ service }) => {
  return (
    <div className={styles.pageCardService}>
      <div className={styles.containerCardService}>
        <p>Nome: {service.nome}</p>
        <p>Descrição: {service.descricao}</p>

      </div>

    </div>
  )
}

export default CardService
