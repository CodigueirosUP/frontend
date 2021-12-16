import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import grafico from '../images/exemplo-de-grafico-de-barras.jpg'
import { DashboardContext } from "../context/DashboardContext";
import { formactCurrencyIeneAndYuan, formactCurrencyReal } from "../utils/formactCurrency";

const Dashboard = () => {

  const { typeUser, getType } = useContext(AuthContext);
  const { IdentifyUser, identifyMoreExpansiveValue, moreExpansiveService, totalValueService, setTotalValueService, identifyTotalValue } = useContext(DashboardContext);

  useEffect(()=>{
    getType();
    
  },[])

  useEffect(()=>{
    identifyMoreExpansiveValue()
    identifyTotalValue()
  })

  useEffect(()=>{
    IdentifyUser(typeUser);
  },[typeUser])

  return (
    <div className="container">
      <div className="content">
        <button onClick={()=>identifyTotalValue()}>pegaaaa</button>
        <div>
          <div>
            <h4>Todos os gerentes</h4>
            <FaFilter />
            <input type="text" placeholder="Nome do gerente" />
            <FaSearch />
          </div>
          <div >
            <span>Gasto total</span>
            <h1>{formactCurrencyReal(totalValueService)}</h1>
            <span>Dezembro/21</span>
          </div>
          <div >
            <span>Estimativa de gasto</span>
            <h1>R$99.999,99</h1>
            <span>Janeiro/21</span>
          </div>
          {moreExpansiveService ?
            <div>
              <span>Serviço mais caro</span>
              <h3>{moreExpansiveService.nome}</h3>
              <h1>{formactCurrencyIeneAndYuan(moreExpansiveService.valor)}</h1>
            </div> :
            <div>
              <h2>Não existem serviços cadastrados</h2>
            </div>
          }
        </div>
        <div>
          <div >
           <FaFilter />
           <select name="filtro" id="filtro">
             <option value="maiormenor">Maior → Menor</option>
             <option value="menormaior">Menor ← Maior</option>
           </select>
           <div>
             <span>AQUI FICA A LISTA</span>
           </div>
          </div>
          <div >
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