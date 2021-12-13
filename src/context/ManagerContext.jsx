import React, {createContext, useState} from "react"
import ApiWallet from "../api"

const ManagerContext = createContext()

const ManagerProvider  = ({children}) =>{

  const [managerList, setManagerList] = useState([]);

  const postManager = async (gerenteValues) => {
    await ApiWallet.post('/auth/create-gerente', gerenteValues);
  }

  const getManagers = async () => {
    const {data} = await ApiWallet.get('/gerente/get-gerentes');
    setManagerList(data);
  }


  return(
    <ManagerContext.Provider value={{postManager, getManagers, managerList}}>
      {children}
    </ManagerContext.Provider>
  )
}

export {ManagerContext, ManagerProvider};