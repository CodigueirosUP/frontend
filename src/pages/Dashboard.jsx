import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import { formactCurrencyEuro, formactCurrencyReal } from "../utils/formactCurrency";
import Graphic from "../components/graphic/Graphic";
import ApiWallet from "../api";
import CardServiceDashboard from '../components/cardServiceDashboard/CardServiceDashboard';



const Dashboard = () => {

  const { typeUser } = useContext(AuthContext);
  const [dataService, setDataService] = useState([]);
  const [dataServiceValues, setDataServiceValues] = useState([]);
  const [moreExpansiveService, setMoreExpansiveService] = useState();
  const [totalValueService, setTotalValueService] = useState();
  const [forecastOfValues, setForecastOfValues] = useState()


  useEffect(()=>{
    if(typeUser){
      IdentifyUser(typeUser);
    }
  },[typeUser])

  useEffect(()=>{
    if(typeUser){
      identifyMoreExpansiveValue(typeUser);
      identifyTotalValue(typeUser);
      identifyForecastOfValues(typeUser);
    }
  })


  const IdentifyUser = async (user) => {
    if( user.idUser === 1){
      const { data } = await ApiWallet.get('/servico/list-servico');
      setDataService(data)
      setDataServiceValues(data)
    }else{
      setDataService(user)
      setDataServiceValues(user.servicoDTOList)
    }
  }

    const identifyMoreExpansiveValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const maxService = dataService.find(service => service.valor === Math.max(...values)); 
      setMoreExpansiveService(maxService);
    }else{
      
    }
  }

  const identifyTotalValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0); 
      setTotalValueService(totalValueService);
    }else{
      
    }
  }

  const identifyForecastOfValues = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      setForecastOfValues(parseInt(values.reduce((a, b) => a + b / values.length,0)))
    }else{
      
    }
  }

  const filterOrder = (option, user) => {
    if( user.idUser === 1){
      if(option === '0'){
        console.log(option);
        setDataService(
          dataService.sort((a, b) => {
            return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
          } )
        )
      }
      else if(option === '1'){
        console.log(option);
        setDataService(
          dataService.sort((a, b) => {
           return a.valor < b.valor ? -1 : (a.valor > b.valor) ? 1 : 0;
          } )
        )
    }
    }else{
      
    }
    
}

  return (
    <div className="container">
      <div className="content">
        <div>
          <div>
            <h4>Todos os gerentes</h4>
            <FaFilter />
            <input type="text" placeholder="Nome do gerente" />
            <FaSearch />
          </div>
          <div >
            <span>Gasto total</span>
            <h1>{formactCurrencyReal(totalValueService)}</h1>
            <span>Dezembro/21</span>
          </div>
          <div >
            <span>Estimativa de gasto</span>
            <h1>{formactCurrencyReal(forecastOfValues)}</h1>
            <span>Janeiro/21</span>
          </div>
          {moreExpansiveService ?
            <div>
              <span>Serviço mais caro</span>
              <h3>{moreExpansiveService.nome}</h3>
              <h1>{formactCurrencyEuro(moreExpansiveService.valor)}</h1>
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
           <select name="filtro" id="filtro" onChange={(e) => filterOrder(e.target.value, typeUser)}>
             <option value="0" >Maior → Menor</option>
             <option value="1" >Menor ← Maior</option>
           </select>
           <div>
             {/* {dataService &&
             dataService.map(service => (
          <CardServiceDashboard key = {service.idServico} service = {service}/>))   
             } */}
           </div>
          </div>
          <div >
            <div>
              <Graphic/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

{/* <p>{typeUser.nomeCompleto}</p> */}