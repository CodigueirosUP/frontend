import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import CardService from '../components/cardService/CardService';
import { AuthContext } from '../context/AuthContext';
import { ServiceContext } from "../context/ServiceContext"
import { AiFillFileAdd } from 'react-icons/ai'

const Services = () => {

  const { typeUser, getType } = useContext(AuthContext);
  const { getService, getServiceAttListAdmin, listService } = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    getService(typeUser);
  }, [getType])
  // console.log(typeUser)
  // console.log(listService)

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
      <div className="content">
        <div className='serviceHeader'>
          <h1>Serviços</h1>
          <button onClick={() => navigate('/criarservico')}><AiFillFileAdd/></button>
        </div>
        {adminOrManager()}
      </div>
    </div>
  )
}

export default Services
