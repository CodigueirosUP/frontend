import React, {createContext, useState} from "react"
import ApiWallet from "../api"

const ManagerContext = createContext()

const ManagerProvider  = ({children}) =>{

  const [managerList, setManagerList] = useState([]);

  const postManager = async (gerenteValues) => {
    await ApiWallet.post('/gerente/CreateGerentes', gerenteValues);
}

  const getManagers = async () => {
  const {data} = await ApiWallet.get('/gerente/getGerentes');
  setManagerList(data);
}

  return(
    <ManagerContext.Provider value={{postManager, getManagers, managerList}}>
      {children}
    </ManagerContext.Provider>
  )
}

export {ManagerContext, ManagerProvider};