import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const Routers = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/contato' element={<Contact />} />
        <Route path='/gerentes' element={<Managers />} />
        <Route path='/servicos' element={<Services />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Routers;
