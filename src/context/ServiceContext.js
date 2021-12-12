import { wait } from "@testing-library/react"
import React, {createContext, useState} from "react"
import ApiWallet from "../api"


const ServiceContext = createContext()

const ServiceProvider  = ({children}) =>{

  const [listService, setListService] = useState([])


  const getListService = async () => {
  const {data} = await ApiWallet.get('/servico/list-servico');
  setListService(data);
}

  const postService = async (idManager, serviceValues) => {
    await ApiWallet.post(`/servico/create-servico?idGerente=${idManager}`, serviceValues);
  }

  return(
    <ServiceContext.Provider value={{listService, setListService, getListService, postService}}>
      {children}
    </ServiceContext.Provider>
  )
}

export {ServiceContext, ServiceProvider};