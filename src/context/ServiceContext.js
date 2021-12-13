import { wait } from "@testing-library/react"
import React, {createContext, useState} from "react"
import ApiWallet from "../api"


const ServiceContext = createContext()

const ServiceProvider  = ({children}) =>{

  const [listService, setListService] = useState([])


  const getService = async () => {
  const {data} = await ApiWallet.get('/servico/list-servico');
  setListService(data);
}

  const postService = async (idManager, serviceValues) => {
    await ApiWallet.post(`/servico/create-servico/${idManager}`, serviceValues);
  }

  const putService = async (id, serviceValues) => {
    await ApiWallet.put(`/servico/edit-servico/${id}`, serviceValues)
  }

  const findServiceById = async (id) => {
    const {data} = await ApiWallet.get(`/servico/${id}`);
    console.log(data);
    
    return data;
  }

  return(
    <ServiceContext.Provider value={{listService, getService, postService, putService, findServiceById}}>
      {children}
    </ServiceContext.Provider>
  )
}

export {ServiceContext, ServiceProvider};