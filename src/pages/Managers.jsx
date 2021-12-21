import { useEffect, useContext } from "react"
import { ManagerContext } from "../context/ManagerContext"
import { useNavigate } from 'react-router-dom'
import CardManager from '../components/cardManager/CardManager'
import { HiUserAdd } from 'react-icons/hi'

const Managers = () => {

  const { getManagers, managerList } = useContext(ManagerContext);
  const navigate = useNavigate();

  useEffect(() => {
    getManagers();
  }, [])

  const CardManagerList = () => {
    return (
      managerList && managerList.map(manager => (
        <CardManager key={manager.idGerente} manager={manager} attList={getManagers} />
      )))
  }

  return (
    <div className="container">
      <div className="content contentManager">
        <div className='managerHeader '>
          <h1>Gerentes</h1>
          <button onClick={() => navigate('/criargerentes')}><HiUserAdd/></button>
        </div>
        <div className='managerList'>
          <CardManagerList />
        </div>
      </div>
    </div>
  )
}

export default Managers;
