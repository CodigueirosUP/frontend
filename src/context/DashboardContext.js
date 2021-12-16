import { createContext, useState } from "react";
import ApiWallet  from "../api";

const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

  const [dataService, setDataService] = useState([]);
  const [moreExpansiveService, setMoreExpansiveService] = useState();
  const [totalValueService, setTotalValueService] = useState();


  const IdentifyUser = async (user) => {
    if( user.idUser === 1){
      const { data } = await ApiWallet.get('/servico/list-servico');
      setDataService(data)
    }else{
      setDataService(user)
    }
  }
 
  const identifyMoreExpansiveValue = () => {
    const values = dataService.map(service => service.valor);
    const maxService = dataService.find(service => service.valor === Math.max(...values)); 
    setMoreExpansiveService(maxService);
  }

  const identifyTotalValue = () => {
    const values = dataService.map(service => service.valor);
    const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0); 
    setTotalValueService(totalValueService);
    console.log(totalValueService)
  }

  return(
  <DashboardContext.Provider value={{dataService, setDataService, IdentifyUser, moreExpansiveService, identifyMoreExpansiveValue, identifyTotalValue, totalValueService}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}