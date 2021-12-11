import { useEffect, useContext } from "react"
import { ManagerContext } from "../context/ManagerContext"
import { useNavigate } from 'react-router-dom'

const Managers = () => {

  const {getManagers, managerList} = useContext(ManagerContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getManagers();
  }, [])

  console.log(managerList);

  return (
    <div className="container">
       <div className="content">
         <h1>Gerente</h1>
         {managerList && managerList.map(manager => (
           <>
           <p>idGerente: {manager.idGerente}</p>
           <p>idUsuario: {manager.usuario.idUsuario}</p>
           <p>Nome usuario: {manager.usuario.usuario}</p>
           </>
         ))}
         <button onClick={()=>navigate('/criargerentes')}>Adicionar gerente</button>
       </div>
    </div>
  )
}

export default Managers;
