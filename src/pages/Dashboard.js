import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import grafico from '../images/exemplo-de-grafico-de-barras.jpg'

const Dashboard = () => {

  const {typeUser, getType} = useContext(AuthContext);

  useEffect(()=>{
    getType(localStorage.getItem('typeuser'));
  },[])

  return (
    <div className="container">
      <div className="content">
        <div>
          <div>
            <h4>Todos os gerentes</h4>
            <FaFilter />
            <input type="text" placeholder="Nome do gerente" />
            <FaSearch />
          </div>
          <div gastoTotal>
            <span>Gasto total</span>
            <h1>R$99.999,99</h1>
            <span>Dezembro/21</span>
          </div>
          <div Estimativa>
            <span>Estimativa de gasto</span>
            <h1>R$99.999,99</h1>
            <span>Janeiro/21</span>
          </div>
          <div servicoMaisCaro>
            <span>Serviço mais caro</span>
            <h3>Amazon Services</h3>
            <h1>R$99.999,99</h1>
          </div>
        </div>
        <div>
          <div lista >
           <FaFilter />
           <select name="filtro" id="filtro">
             <option value="maiormenor">Maior → Menor</option>
             <option value="menormaior">Menor ← Maior</option>
           </select>
           <div>
             <span>AQUI FICA A LISTA</span>
           </div>
          </div>
          <div grafico>
            <div>
              <img src= {grafico} alt="grafico" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

{/* <p>{typeUser.nomeCompleto}</p> */}