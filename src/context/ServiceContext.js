import React, { createContext, useState } from "react"
import ApiWallet from "../api"


const ServiceContext = createContext()

const ServiceProvider = ({ children }) => {

  const [listService, setListService] = useState([])

  const getServiceAttListAdmin =  async () => {
    const { data } = await ApiWallet.get('/servico/list-servico');
    setListService(data);
  }

  const getService = async (typeUser) => {
    
    if (typeUser.idUser === 1) {
      const { data } = await ApiWallet.get('/servico/list-servico');
      setListService(data);
    } else {
      setListService(typeUser.servicoDTOList)
    }
  }
  
  const postService = async (idManager, serviceValues) => {
    await ApiWallet.post(`/servico/create-servico/${idManager}`, serviceValues).then((response) => {
    })
  }

  const putService = async (id, serviceValues) => {
    await ApiWallet.put(`/servico/edit-servico/${id}`, serviceValues)
  }

  const findServiceById = async (id) => {
    const { data } = await ApiWallet.get(`/servico/${id}`);
    return data;
  }

  return (
    <ServiceContext.Provider value={{ listService, getService, postService, putService, findServiceById, getServiceAttListAdmin }}>
      {children}
    </ServiceContext.Provider>
  )
}

export { ServiceContext, ServiceProvider };