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
      setDataService(user)

    }
  }

  const identifyMaxValue = () => {
    const values = [];
    dataService.map(service => {values.push(service.valor)});
    setMaxServiceValue(Math.max(...values));
    const maxService = dataService.find(service => service.valor === maxServiceValue); 
    console.log(maxService);
  }

  return(
  <DashboardContext.Provider value={{dataService, setDataService, IdentifyUser, maxServiceValue, identifyMaxValue}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}