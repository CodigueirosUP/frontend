import { useMemo, useState } from 'react';
import styles from './CardManagerDashboard.module.css'


const CardManagerListDashboard = ({manager, attList}) => {
    console.log(manager)
    const [busca, setBusca] = useState('')

    const filteredManager = useMemo(() => {
    const buscaMinuscula = busca.toLocaleLowerCase();

    return manager.filter((manager) => manager.nomeCompleto.toLowerCase().includes(buscaMinuscula))
  },[busca])
  
  
  return (
    <div>
      <div className={styles.boxPesquisa}>
          <h5>Pesquisar Nome</h5>
          <input type='text' value={busca} onChange={(ev) => setBusca(ev.target.value)} ></input>
        </div>
      <div className= {styles.pageCardMenager}>
        {filteredManager.map((manager) => 
          <div className= {styles.containerCardMenager}>
            <p>Nome: {manager.nomeCompleto} </p>
            <p>Email: {manager.email} </p>
            <p>Usuário: {manager.usuario.usuario} </p>
          </div>
        )}
    </div>
      
    </div>
  )

}

export default CardManagerListDashboard

