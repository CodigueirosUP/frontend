import React, { createContext, useState } from "react"
import { ApiWallet } from "../api"

const ManagerContext = createContext();

const ManagerProvider = ({ children }) => {

  const [managerList, setManagerList] = useState([]);

  const postManager = async (gerenteValues) => {
    await ApiWallet.post('/auth/create-gerente', gerenteValues);
  }

  const getManagers = async () => {
    const { data } = await ApiWallet.get('/gerente/get-gerentes');
    setManagerList(data);
  }

  const putManager = async (id, gerenteValues) => {
    await ApiWallet.put(`/gerente/${id}`, gerenteValues);
  }

  const findManagerById = async (id) => {
    const { data } = await ApiWallet.get(`/gerente/${id}`);
    return data;
  }

  return (
    <ManagerContext.Provider value={
      {
        postManager,
        getManagers,
        managerList,
        putManager,
        findManagerById
      }}>
      {children}
    </ManagerContext.Provider>
  )
}

export { ManagerContext, ManagerProvider };