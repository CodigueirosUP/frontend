import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import Graphic from "../components/graphic/Graphic";
import {ApiWallet} from "../api";
import CardServiceDashboard from '../components/cardServiceDashboard/CardServiceDashboard';
import { ManagerContext } from "../context/ManagerContext";
import CardValues from "../components/cardValues/CardValues";

const Dashboard = () => {

  const { typeUser } = useContext(AuthContext);
  const { managerList, getManagers } = useContext(ManagerContext);

  const [dataService, setDataService] = useState([]);
  const [dataServiceManager, setDataServiceManager] = useState([]);
  const [moreExpansiveService, setMoreExpansiveService] = useState();
  const [totalValueService, setTotalValueService] = useState();
  const [forecastOfValues, setForecastOfValues] = useState()
  const [chooseManager, setChooseManager] = useState([]);
  const [allMaxValuesMonths, setAllMaxValuesMonths] = useState({})

  useEffect(() => {
    if (typeUser) {
      IdentifyUser(typeUser);
      getManagers();
    }
  }, [typeUser])

  useEffect(() => {
    if (typeUser) {
      identifyMoreExpansiveValue(typeUser);
      identifyTotalValue(typeUser);
      identifyForecastOfValues(typeUser);
    }
  })

  useEffect(() => {
    if(dataService) {
      searchForMonth()
    }
  },[dataService])

  useEffect(() => {
    console.log(allMaxValuesMonths)
  }, [allMaxValuesMonths])

  const IdentifyUser = async (user) => {
    if (user.idUser === 1) {
      const { data } = await ApiWallet.get('/servico/list-servico');
      setDataService(data.sort((a, b) => {
        return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
      }))
    } else {
      setDataService(user)
      setDataServiceManager(user.servicoDTOList)
    }
  }

  const identifyMoreExpansiveValue = (user) => {
    if (user.idUser === 1) {
      const values = dataService.map(service => service.valor);
      const maxService = dataService.find(service => service.valor === Math.max(...values));
      setMoreExpansiveService(maxService);
    } else {
      if (dataServiceManager) {
        const values = dataServiceManager.map(service => service.valor);
        const maxService = dataServiceManager.find(service => service.valor === Math.max(...values));
        setMoreExpansiveService(maxService);
      }
    }
  }

  const identifyTotalValue = (user) => {
    if (user.idUser === 1) {
      const values = dataService.map(service => service.valor);
      const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0);
      setTotalValueService(totalValueService);
    } else {
      if (dataServiceManager) {
        const values = dataServiceManager.map(service => service.valor);
        const totalValueService = values.reduce((values, totalValues) => values + totalValues, 0);
        setTotalValueService(totalValueService);
      }
    }
  }

  const identifyForecastOfValues = (user) => {
    if (user.idUser === 1) {
      const values = dataService.map(service => service.valor);
      setForecastOfValues(parseInt(values.reduce((a, b) => a + b / values.length, 0)))
    } else {
      if (dataServiceManager) {
        const values = dataServiceManager.map(service => service.valor);
        setForecastOfValues(parseInt(values.reduce((a, b) => a + b / values.length, 0)))
      }
    }
  }

  const listServiceDashboard = (user) => {
    if (user.idUser === 1) {
      return (
        dataService &&
        dataService.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    } else {
      return (
        dataServiceManager &&
        dataServiceManager.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    }
  }

  const managerOption = [];

  {
    managerList.map(manager => {
      managerOption.push({ idGerente: manager.idGerente, label: manager.nomeCompleto })
    })
  }

  const filterManager = async (option) => {
    if(option === 'todos'){
      const { data } = await ApiWallet.get('/servico/list-servico');
      setChooseManager(data.sort((a, b) => {
        return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
      }));
    }else {
      const { data } = await ApiWallet.get(`/servico/${option}/procura-por-gerente/`);
      setChooseManager(data.sort((a, b) => {
        return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
      }));
    }
  }

  const changeManager = () => {
    setDataService(chooseManager);
  }


  const searchForMonth = () => {
    const months = {
      janeiro: 0,
      fevereiro: 0,
      marco: 0,
      abril: 0,
      maio: 0,
      junho: 0,
      julho: 0,
      agosto: 0,
      setembro: 0,
      outubro: 0,
      novembro: 0,
      dezembro:0
    }
    const teste = dataService.forEach(data => {
      const arrData = data.data.split('-')
      if (arrData[1] === '01') {
        months.janeiro = months.janeiro + data.valor
      } 
      if (arrData[1] === '02') {
        months.fevereiro = months.fevereiro + data.valor
      }
      if (arrData[1] === '03') {
        months.marco = months.marco + data.valor
      }
      if (arrData[1] === '04') {
        months.abril = months.abril + data.valor
      }
      if (arrData[1] === '05') {
        months.maio = months.maio + data.valor
      }
      if (arrData[1] === '06') {
        months.junho = months.junho + data.valor
      }
      if (arrData[1] === '07') {
        months.julho = months.julho + data.valor
      }
      if (arrData[1] === '08') {
        months.agosto = months.agosto + data.valor
      }
      if (arrData[1] === '09') {
        months.setembro = months.setembro + data.valor
      }
      if (arrData[1] === '10') {
        months.outubro = months.outubro + data.valor
      }
      if (arrData[1] === '11') {
        months.novembro = months.novembro + data.valor
      }
      if (arrData[1] === '12') {
        months.dezembro = months.dezembro + data.valor
      } 
    })
      setAllMaxValuesMonths(months)
  }

  return (
    <div className="container">
      <div className="contentDashboard">
        <div>
          <div className="nameOrFilter">
            {typeUser.nomeCompleto && <h3 className="nameManager">{typeUser.nomeCompleto}</h3>}
            {typeUser.usuario === 'admin' ?
              <div className="searchManager">
                <span className="iconSearch"><FaFilter /></span>
                <select name="filtro" id="filtro" onChange={(value) => filterManager(value.target.value)}>
                  <option value='todos'>Todos os Gerente</option>
                  {managerOption.map(manager => (
                    <option key={manager.idGerente} value={manager.idGerente}>{manager.label}</option>
                  ))}
                </select>
                <button className="buttonSearch" onClick={()=>changeManager()}><FaSearch /></button>
              </div>
              : null}
          </div>
          <div className="dashboardValues">
            <CardValues key={1} title='Gasto total' subTitle='Dezembro/21' totalValueService={totalValueService} />
            <CardValues key={2} title='Estimativa de gasto' subTitle='Janeiro/21' totalValueService={forecastOfValues} />
            {moreExpansiveService ?
              <div>
                <CardValues key={3} title='Serviço mais caro' subTitle={moreExpansiveService.nome} totalValueService={moreExpansiveService.valor} />
              </div> :
              <div>
                <h2>Não existem serviços cadastrados</h2>
              </div>
            }
          </div>
        </div>
        <div className="listServiceAndgraphic">
          <div className="leftListServiceAndgraphic">
            <div className="header">
              <h3>Lista de Serviços</h3>
            </div>
            <div className="body">
              {listServiceDashboard(typeUser)}
            </div>
          </div>
          <div className="rigthListServiceAndgraphic">
            <Graphic graphValues={allMaxValuesMonths}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;