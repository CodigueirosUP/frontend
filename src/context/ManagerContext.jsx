import React, {createContext, useState} from "react"


const MenagerContext = createContext()

const MenagerProvider  = ({children}) =>{

  const [listMenager, setListMenager] = useState([])

  return(
    <MenagerContext.Provider value={{listMenager, setListMenager}}>
      {children}
    </MenagerContext.Provider>
  )
}

export {MenagerContext, MenagerProvider};