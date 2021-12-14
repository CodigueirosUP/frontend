import { useEffect, useContext } from "react"
import { ManagerContext } from "../context/ManagerContext"
import { useNavigate } from 'react-router-dom'
import CardManager from '../components/cardManager/CardManager'

const Managers = () => {

  const {getManagers, managerList} = useContext(ManagerContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getManagers();
  }, [])

  const CardManagerList = () => {
    return (
      managerList && managerList.map(manager => (
        <CardManager key= {manager.idGerente} manager={manager} attList={getManagers} />
      )))
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Gerentes</h1>
        <button onClick={()=>navigate('/criargerentes')}>Adicionar gerente</button>
        <CardManagerList />
      </div>
    </div>
  )
}

export default Managers;
