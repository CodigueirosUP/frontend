import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext, useMemo } from 'react'
import { AuthContext } from "./context/AuthContext";
import Welcome from './pages/Welcome'
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Dashboard from './pages/Dashboard'
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/header/Header";
import Managers from "./pages/Managers";
import Services from "./pages/Services";
import Footer from "./components/footer/Footer";
import ManagerCreate from "./pages/ManagerCreate";
import {ApiWallet} from "./api";
import ServiceCreate from "./pages/ServiceCreate";
import { ServiceContext } from "./context/ServiceContext";
import Loading from "./components/loading/Loading";
import { ToastContainer } from 'react-toastify';


const Routers = () => {

  const { auth, setAuth, setLoading, getType, typeUser, loading } = useContext(AuthContext);
  const { getService } = useContext(ServiceContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      ApiWallet.defaults.headers.common['Authorization'] = token;
      getType();
      setAuth(true);
      getService(typeUser);
      setLoading(false);
    }
  }, [])

  const authorizationRouters = () => {
    if (typeUser.usuario === 'admin') {
      return (
        <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/contato' element={<Contact />} />
        <Route path='/gerentes' element={<Managers />} />
        <Route path='/criargerentes/:id' element={<ManagerCreate />} />
        <Route path='/criargerentes' element={<ManagerCreate />} />
        <Route path='/criarservico' element={<ServiceCreate />} />
        <Route path='/criarservico/:id' element={<ServiceCreate />} />
        <Route path='/servicos' element={<Services />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      );
    } else {
      return (
        <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/contato' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      );
    }

  }

  const allRoutes = useMemo(() => {
    return ( auth ?    
      authorizationRouters()
      :
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/contato' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    )
  })

  return (
    <BrowserRouter>
      <Header />
        {loading ? <Loading /> : allRoutes}
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default Routers;

