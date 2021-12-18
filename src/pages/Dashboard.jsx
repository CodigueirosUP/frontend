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
  const [dataServiceManager, setDataServiceManager] = useState([]);
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
      setDataService(data.sort((a, b) => {
        return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
      } ))
    }else{
      setDataService(user)
      setDataServiceManager(user.servicoDTOList)
    }
  }

    const identifyMoreExpansiveValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const maxService = dataService.find(service => service.valor === Math.max(...values)); 
      setMoreExpansiveService(maxService);
    }else{
      if(dataServiceManager){
        const values = dataServiceManager.map(service => service.valor);
        const maxService = dataServiceManager.find(service => service.valor === Math.max(...values)); 
        setMoreExpansiveService(maxService);
      }
    }
  }

  const identifyTotalValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0); 
      setTotalValueService(totalValueService);
    }else{
      if(dataServiceManager){
        const values = dataServiceManager.map(service => service.valor);
        const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0); 
        setTotalValueService(totalValueService);
      }
    }
  }

  const identifyForecastOfValues = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      setForecastOfValues(parseInt(values.reduce((a, b) => a + b / values.length,0)))
    }else{
      if(dataServiceManager){
        const values = dataServiceManager.map(service => service.valor);
        setForecastOfValues(parseInt(values.reduce((a, b) => a + b / values.length,0)))
      }
    }
  }

  const listServiceDashboard = (user) => {
    if (user.idUser === 1) {
      return (
        dataService &&
        dataService.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    } else {
      return (
        dataServiceManager &&
        dataServiceManager.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    }
  }

  return (
    <div className="container">
      <div className="content">
        <div>
          <div>
            <h4>{typeUser.nomeCompleto}</h4>
            {typeUser.usuario === 'admin' ?
            <>
            <FaFilter />
            <input type="text" placeholder="Nome do gerente" />
            <FaSearch />
            </>
            : null}
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
             {listServiceDashboard(typeUser)}
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