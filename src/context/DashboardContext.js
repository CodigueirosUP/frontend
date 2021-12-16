import { createContext, useState } from "react";
import ApiWallet  from "../api";

const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

  const [dataService, setDataService] = useState([]);
  const [maxServiceValue, setMaxServiceValue] = useState();

  const IdentifyUser = async (user) => {
    if( user.idUser === 1){
      const { data } = await ApiWallet.get('/servico/list-servico');
      setDataService(data)
    }else{
      setDataService(user.servicoDTOList)
    }
  }
  
  const identifyMaxValue = (user) => {
    if(user.usuario === 'admin'){
      const values = dataService.map(service => service.valor)
      const maxService = dataService.find(service => service.valor === Math.max(...values)); 
      console.log(dataService)
      setMaxServiceValue(maxService);
    }else {
      const values = dataService.servicoDTOList.map(service => service.valor)
      const maxService = dataService.servicoDTOList.find(service => service.valor === Math.max(...values)); 
      console.log(dataService)
      setMaxServiceValue(maxService);
    }
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
  <DashboardContext.Provider value={{filterOrder, dataService, setDataService, IdentifyUser, maxServiceValue, identifyMaxValue}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}