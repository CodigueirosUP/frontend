import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaFilter, FaSearch } from 'react-icons/fa';
import Graphic from "../components/graphic/Graphic";
import {ApiWallet, ApiAwesomeMedia} from "../api";
import CardServiceDashboard from '../components/cardServiceDashboard/CardServiceDashboard';
import { ManagerContext } from "../context/ManagerContext";
import CardValues from "../components/cardValues/CardValues";
import moment from 'moment'

const Dashboard = () => {

  
  moment.locale('pt-br');
  
  const { typeUser, setTabVisualization } = useContext(AuthContext);
  const { managerList, getManagers } = useContext(ManagerContext);
  
  const currentMonth = moment().format("DD/MM/YYYY").slice(3);
  const nextMonth = moment().add(1, 'month').format("DD/MM/YYYY").slice(3);
  
  const [dataService, setDataService] = useState([]);
  const [dataServiceManager, setDataServiceManager] = useState([]);
  const [moreExpansiveService, setMoreExpansiveService] = useState();
  const [totalValueService, setTotalValueService] = useState();
  const [forecastOfValues, setForecastOfValues] = useState()
  const [chooseManager, setChooseManager] = useState([]);
  const [allMaxValuesMonths, setAllMaxValuesMonths] = useState([])
  const [dolarMedia, setDolarMedia] = useState();
  const [totalDolar, setTotalDolar] = useState();
  const [EuroMedia, setEuroMedia] = useState();
  const [totalEuro, setTotalEuro] = useState();
  const [totalReal, setTotalReal] = useState();
  
  const managerOption = [];

  useEffect(()=>{
    setTabVisualization('dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (typeUser) {
      IdentifyUser(typeUser);
      if(typeUser.idUser === 1){
        getManagers();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeUser])

  useEffect(() => {
    if (typeUser) {
      identifyMoreExpansiveValue(typeUser);
      identifyTotalValue(typeUser);
      identifyForecastOfValues(typeUser);
    }
  })

  //Funçao que identifica o usuario de acordo com o seu login e seta as informaçoes que serao usadas.//
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

  //funçao que identifica o serviço com o valor mais alto.//
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

  //Funçao que identifica o gasto total do mes atual.//
  const identifyTotalValue = async (user) => {
    const month = currentMonth.slice(0, 2)
    if (user.idUser === 1) {
      const { data } = await ApiWallet.get(`list-servicos-mes-ano?ano=2021&mes=${month}`);
      setTotalValueService(data);
    } else {
      if (dataServiceManager) {
        const { data } = await ApiWallet.get(`list-servicos-mes-ano?ano=2021&mes=${month}`);
        setTotalValueService(data);
      }
    }
  }

  //Funçao que pega o valor total de todos os serviços cadastrados em dolar(valor sem ser convertido).//
  const getTotalDolar = async () => {
    const { data } = await ApiWallet.get('/list-servicos-dolar');
    setTotalDolar(data);
  }

  //Funçap que pega a media do dolar dos ultimos 30 dias.//
  const getMediaDolar = async () => {
    const { data } = await ApiAwesomeMedia.get('/USD-BRL/30');
    const mapMediaValueDolar = data.map(value => value.high);
    const mediaValueDolar = parseFloat(mapMediaValueDolar.reduce((a, b) => a + b / mapMediaValueDolar.length, 0).toFixed(2))
    setDolarMedia(mediaValueDolar);
  }

  //Funçao que pega o valor total de todos os serviços cadastrados em euro(valor sem ser convertido).//
  const getTotalEuro = async () => {
    const { data } = await ApiWallet.get('/list-servicos-euro');
    setTotalEuro(data);
  }

  //Funçap que pega a media do euro dos ultimos 30 dias.//
  const getMediaEuro =  async () => {
    const { data } = await ApiAwesomeMedia.get('/EUR-BRL/30');
    const mapMediaValueEuro = data.map(value => value.high);
    const mediaValueEuro = parseFloat(mapMediaValueEuro.reduce((a, b) => a + b / mapMediaValueEuro.length, 0).toFixed(2))
    setEuroMedia(mediaValueEuro);
  }

  //Funçao que pega o valor total de todos os serviços cadastrados em real.//
  const getTotalReal = async () => {
    const { data } = await ApiWallet.get('/list-servicos-real');
    setTotalReal(data);
  }

  //Funçao que faz os calculos para indentificar o valor gasto total do proximo mes.//
  const identifyForecastOfValues = () => {
    getTotalDolar();
    getMediaDolar();
    getTotalEuro();
    getMediaEuro();
    getTotalReal();
    const mediaDolar = (totalDolar * dolarMedia)
    const mediaEuro = (totalEuro * EuroMedia)
    const valueTotalPreview = (mediaDolar + mediaEuro + totalReal)
    setForecastOfValues(valueTotalPreview);
  }

  //Funçao que lista os serviços dea acordo com o usuario logado.// 
  const listServiceDashboard = (user) => {
    if (user.idUser === 1) {
      return (
        dataService &&
        dataService.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    } else {
      if (dataServiceManager) {
        dataServiceManager.sort((a, b) => {
          return a.valor > b.valor ? -1 : (a.valor < b.valor) ? 1 : 0;
        })
      }
      return (
        dataServiceManager &&
        dataServiceManager.map(service => (
          <CardServiceDashboard key={service.idServico} service={service} />))
      );
    }
  }

    //Aqui e onde é setado as opcoes do select para o admin filtrar por gerente.//
    // eslint-disable-next-line array-callback-return
    managerList.map(manager => {
      managerOption.push({ idGerente: manager.idGerente, label: manager.nomeCompleto })
    })

  //Funçao que seta as informacoes referente a escolha do admin no select de filtrar gerentes.//
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

  //Funçao que seta as novas informaçoes nos dados gereis que esta sendo visualizado na dashboard.// 
  const changeManager = () => {
    setDataService(chooseManager);
  }

  //Funçao que busca todos os valores que foram gastos para colocar no grafico.//
  const graphicValues = async () => {
    const graphicData = ([]);
    for(var n = 1; n <= 12; n++){
      const { data } = await ApiWallet.get(`list-servicos-mes-ano?ano=2021&mes=${n}`);
      graphicData.push({valor: data});
    }
    setAllMaxValuesMonths(graphicData);
  }
  
  useEffect(()=>{
    graphicValues()
  },[])
  
  return (
    <div className="container">
      <div className="contentDashboard">
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
            <CardValues key={1} title='Gasto total' subTitle={currentMonth} totalValueService={totalValueService} />
            <CardValues key={2} title='Estimativa de gasto' subTitle={nextMonth} totalValueService={forecastOfValues} />
            {moreExpansiveService ?
              <div>
                <CardValues key={3} title='Serviço mais caro' subTitle={moreExpansiveService.nome} totalValueService={moreExpansiveService.valor} />
              </div> :
              <div>
                 <CardValues key={4} title='Sem serviços' subTitle='Sem serviços' totalValueService='R$ 0,00' />
              </div>
            }
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
            {allMaxValuesMonths && <Graphic graphValues={allMaxValuesMonths}/>}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;