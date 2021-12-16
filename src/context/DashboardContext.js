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
      setDataService(user.servicoDTOList)
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

  const filterOrder = (option) => {
    if(option === '0'){
      setDataService(
        dataService.sort((a, b) => {
          return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
        } )
      )
      console.log(dataService)
    }
    else if(option === '1'){
      setDataService(
        dataService.sort((a, b) => {
         return a.valor < b.valor ? -1 : (a.valor > b.valor) ? 1 : 0;
        } )
      )
       console.log(dataService)
  }
}

  return(
  <DashboardContext.Provider value={{filterOrder, dataService, setDataService, IdentifyUser, moreExpansiveService, identifyMoreExpansiveValue, identifyTotalValue, totalValueService}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}