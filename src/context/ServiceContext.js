import React, {createContext, useState} from "react"
import ApiWallet from "../api"


const ServiceContext = createContext()

const ServiceProvider  = ({children}) =>{

  const [listService, setListService] = useState([])


  const getListService = async () => {
  const {data} = await ApiWallet.get('/servico/list-servico');
  setListService(data);
}


  return(
    <ServiceContext.Provider value={{listService, setListService, getListService}}>
      {children}
    </ServiceContext.Provider>
  )
}

export {ServiceContext, ServiceProvider};