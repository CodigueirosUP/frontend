import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from 'react'
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
import ApiWallet from "./api";

const Routers = () => {

  const { auth, setAuth, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
      setLoading(false);
      ApiWallet.defaults.headers.common['Authorization'] = token;
    }
  }, [])

  return (
    <BrowserRouter>
      <Header />
      {
        auth ?
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sobre' element={<About />} />
            <Route path='/contato' element={<Contact />} />
            <Route path='/gerentes' element={<Managers />} />
            <Route path='/servicos' element={<Services />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          :
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sobre' element={<About />} />
            <Route path='/contato' element={<Contact />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      }
      <Footer />
    </BrowserRouter>
  )
}

export default Routers;
