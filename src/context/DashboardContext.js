import { createContext, useState } from "react";
import ApiWallet  from "../api";

const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

  const [dataService, setDataService] = useState([]);
  const [dataServiceValues, setDataServiceValues] = useState([]);
  const [moreExpansiveService, setMoreExpansiveService] = useState();
  const [totalValueService, setTotalValueService] = useState();


  const IdentifyUser = async (user) => {
   
    if( user.idUser === 1){
      const { data } = await ApiWallet.get('/servico/list-servico');
      console.log('data', data)
      setDataService(data)
      setDataServiceValues(data)
      console.log('admin - dataServiceValues', dataServiceValues)
      console.log('admin - dataService', dataService)
    }else{
      console.log('user', user)
      setDataService(user)
      setDataServiceValues(user.servicoDTOList)
      console.log('gerente - dataServiceValues', dataServiceValues)
      console.log('gerente - dataService', dataService)
    }
  }
 
  const identifyMoreExpansiveValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const maxService = dataService.find(service => service.valor === Math.max(...values)); 
      setMoreExpansiveService(maxService);
    }else{
      console.log('falta fazer do gerente')
    }
  }

  const identifyTotalValue = (user) => {
    if( user.idUser === 1){
      const values = dataService.map(service => service.valor);
      const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0); 
      setTotalValueService(totalValueService);
    }else{
      console.log('falta fazer do gerente')
    }
  }

  const filterOrder = (option) => {
    if(option === '0'){
      setDataService(
        dataService.sort((a, b) => {
          return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
        } )
      )
    }
    else if(option === '1'){
      setDataService(
        dataService.sort((a, b) => {
         return a.valor < b.valor ? -1 : (a.valor > b.valor) ? 1 : 0;
        } )
      )
  }
}

  return(
  <DashboardContext.Provider value={{filterOrder, dataService, setDataService, IdentifyUser, moreExpansiveService, identifyMoreExpansiveValue, identifyTotalValue, totalValueService}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}