import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import CardService from '../components/cardService/CardService';
import { ServiceContext } from "../context/ServiceContext"

const Services = () => {

  const {getListService, listService} = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    getListService();
    
  },[])
  console.log(listService)

  return (
    <div className="container">
       <div className="content">
         <h1>Serviços</h1>
         <button onClick={()=>navigate('/criarservico')}>Adicionar serviço</button>
         {listService && listService.map(service => (
           <CardService key = {service.idServico} service = {service}/>
         ))}
       </div>
    </div>
  )
}

export default Services
