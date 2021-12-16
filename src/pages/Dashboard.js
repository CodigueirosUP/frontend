import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import grafico from '../images/exemplo-de-grafico-de-barras.jpg'
import { DashboardContext } from "../context/DashboardContext";
import CardServiceDashboard from "../components/cardServiceDashboard/CardServiceDashboard";

const Dashboard = () => {

  const { typeUser, getType } = useContext(AuthContext);
  const { IdentifyUser, identifyMaxValue, maxServiceValue, dataService, filterOrder } = useContext(DashboardContext);

  useEffect(()=>{
    getType();
    
  },[])

  useEffect(()=>{
    IdentifyUser(typeUser);
    console.log(typeUser)
  },[typeUser])

  return (
    <div className="container">
      <div className="content">
        <button onClick={()=>identifyMaxValue(typeUser)}>pegaaaa</button>
        <div>
          <div>
            <h4>Todos os gerentes</h4>
            <FaFilter />
            <input type="text" placeholder="Nome do gerente" />
            <FaSearch />
          </div>
          <div >
            <span>Gasto total</span>
            <h1>R$99.999,99</h1>
            <span>Dezembro/21</span>
          </div>
          <div >
            <span>Estimativa de gasto</span>
            <h1>R$99.999,99</h1>
            <span>Janeiro/21</span>
          </div>
          {maxServiceValue ?
            <div>
              <span>Serviço mais caro</span>
              <h3>{maxServiceValue.nome}</h3>
              <h1>{maxServiceValue.valor}</h1>
            </div> :
            <div>
              <h2>Não existem serviços cadastrados</h2>
            </div>
          }
        </div>
        <div>
          <div className="sectionListService">
            <h3>Serviços</h3>
           <FaFilter />
           <select name="filtro" id="filtro" onChange={(e) => filterOrder(e.target.value)}>
             <option value="0" >Maior → Menor</option>
             <option value="1" >Menor ← Maior</option>
           </select>
           <div>
             {dataService && dataService.map(service => (
          <CardServiceDashboard key = {service.idServico} service = {service}/>))   
             }
           </div>
          </div>
          <div >
            <div>
              <img src= {grafico} alt="grafico" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

{/* <p>{typeUser.nomeCompleto}</p> */}