import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const {typeUser, getType} = useContext(AuthContext);

  useEffect(()=>{
    getType(localStorage.getItem('typeuser'));
  },[])

  return (
    <div className="container">
      <div className="content">
        <h1>Dashboard</h1>
        <p>{typeUser.nomeCompleto}</p>
      </div>
    </div>
  )
}

export default Dashboard;
