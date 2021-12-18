import styles from './CardServiceDashboard.module.css'

const CardServiceDashboard = ({service}) => {
  return (
    <div className={styles.container}>
       <p>Nome: {service.nome}</p>
        <p>Valor: {service.valor}</p>
        {service.gerente &&  <p>Ger. {service.gerente.nomeCompleto}</p>}
    </div>
  )
}

export default CardServiceDashboard;
