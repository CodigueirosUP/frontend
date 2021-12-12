import { useNavigate } from 'react-router-dom'

const Services = () => {

  const navigate = useNavigate();

  return (
    <div className="container">
       <div className="content">
         <h1>Serviços</h1>
         <button onClick={()=>navigate('/criarservico')}>Adicionar serviço</button>
       </div>
    </div>
  )
}

export default Services
