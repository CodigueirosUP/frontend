import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import CardService from '../components/cardService/CardService';
import { AuthContext } from '../context/AuthContext';
import { ServiceContext } from "../context/ServiceContext"
import { AiFillFileAdd } from 'react-icons/ai'

const Services = () => {

  const { typeUser, getType, setTabVisualization } = useContext(AuthContext);
  const { getService, getServiceAttListAdmin, listService } = useContext(ServiceContext);

  const navigate = useNavigate();

  useEffect(()=>{
    setTabVisualization('service')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    getService(typeUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getType])

  const adminOrManager = () => {
    if (typeUser.usuario === 'admin') {
      return (
        listService && listService.map(service => (
          <CardService key={service.idServico} attList={getServiceAttListAdmin} service={service} />
        ))
      );
    } else {
      return (
        typeUser.servicoDTOList && typeUser.servicoDTOList.map(service => (
          <CardService key={service.idServico} attList={getService} service={service} />
        ))
      );
    }
  }

  return (
    <div className="container">
      <div className="content contentService">
        <div className='serviceHeader'>
          <h1>Serviços</h1>
          <button onClick={() => navigate('/criarservico')}><AiFillFileAdd/></button>
        </div>
        <div className='serviceList'>
          {adminOrManager()}
        </div>
      </div>
    </div>
  )
}

export default Services;
