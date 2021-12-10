import {BrowserRouter, Routes, Route} from "react-router-dom";
import Welcome from './pages/Welcome'
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers;
