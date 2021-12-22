import { useEffect, useContext } from "react"
import { ManagerContext } from "../context/ManagerContext"
import { useNavigate } from 'react-router-dom'
import CardManager from '../components/cardManager/CardManager'
import { HiUserAdd } from 'react-icons/hi'
import { AuthContext } from "../context/AuthContext"

const Managers = () => {

  const { getManagers, managerList } = useContext(ManagerContext);
  const { setTabVisualization } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    setTabVisualization('manager')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    getManagers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
