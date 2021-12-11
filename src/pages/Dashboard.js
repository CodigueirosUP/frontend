import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div className="container">
      <div className="content">
        <h1>Dashboard</h1>
        <button onClick={()=>handleLogout()}>sair</button>
      </div>
    </div>
  )
}

export default Dashboard;
