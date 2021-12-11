import React, {createContext, useState} from "react"
import ApiWallet from "../api"


const ManagerContext = createContext()

const ManagerProvider  = ({children}) =>{

  const [listMenager, setListMenager] = useState([])


  const postManager = async (gerenteValues) => {
    await ApiWallet.post('/gerente/CreateGerentes', gerenteValues);
}

  const getListManager = async () => {
  const {data} = await ApiWallet.get('/gerente/getGerentes');
  setListMenager(data);
}


  return(
    <ManagerContext.Provider value={{listMenager, setListMenager, postManager, getListManager}}>
      {children}
    </ManagerContext.Provider>
  )
}

export {ManagerContext, ManagerProvider};