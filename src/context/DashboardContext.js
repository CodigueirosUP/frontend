import { createContext, useState } from "react";
import ApiWallet  from "../api";

const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

  const [dataService, setDataService] = useState([]);

  const IdentifyUser = async (user) => {
    if( user.idUser === 1){
      const { data } = await ApiWallet.get('/servico/list-servico');
      console.log(data)
    }else{
      console.log(user)
    }
  }

  return(
  <DashboardContext.Provider value={{dataService, setDataService, IdentifyUser}}>
    {children}
  </DashboardContext.Provider>
  )
}

export {DashboardContext, DashboardProvider}