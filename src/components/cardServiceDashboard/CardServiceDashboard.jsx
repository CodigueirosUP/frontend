import styles from './CardServiceDashboard.module.css'
import { formactCurrencyReal } from '../../utils/formactCurrency';

const CardServiceDashboard = ({ service }) => {
  return (
    <div className={styles.container}>
      <strong>{service.nome}</strong>
      <p>{formactCurrencyReal(service.valor)}</p>
      {service.gerente && <p>Ger. {service.gerente.nomeCompleto}</p>}
    </div>
  )
}

export default CardServiceDashboard;
