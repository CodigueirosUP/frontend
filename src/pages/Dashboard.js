import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const {handleLogout, typeUser, getType, userInput} = useContext(AuthContext);

  useEffect(()=>{
    getType(localStorage.getItem('typeuser'));
  },[])

  return (
    <div className="container">
      <div className="content">
        <h1>Dashboard</h1>
        <p>{typeUser.nomeCompleto}</p>
        <button onClick={()=>handleLogout()}>sair</button>
      </div>
    </div>
  )
}

export default Dashboard;
