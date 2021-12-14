import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import CardService from '../components/cardService/CardService';
import { AuthContext } from '../context/AuthContext';
import { ServiceContext } from "../context/ServiceContext"

const Services = () => {

  const {typeUser, getType} = useContext(AuthContext);
  const {getService, listService} = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    getService(typeUser);
  }, [getType])

  return (
    <div className="container">
       <div className="content">
         <h1>Serviços</h1>
         <button onClick={()=>navigate('/criarservico')}>Adicionar serviço</button>
         {listService && listService.map(service => (
           <CardService key = {service.idServico} attList={getService} service = {service}/>
         ))}
       </div>
    </div>
  )
}

export default Services
