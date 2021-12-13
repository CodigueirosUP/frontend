import { createContext, useState } from "react";
import ApiWallet  from "../api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [typeUser, setTypeUser] = useState([]);

  const handleLogin = async (values) => {
    const { data } = await ApiWallet.post('/auth', values);
    localStorage.setItem('token', data);
    ApiWallet.defaults.headers.common['Authorization'] = data;
    setAuth(true);
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    ApiWallet.defaults.headers.common['Authorization'] = '';
    setAuth(false);
    setLoading(true);
    window.location.href = '/login';
  }

  const getType = async (userName) => {
    const { data } = await ApiWallet.get(`/username`)
    setTypeUser(data);
  }

  return(
    <AuthContext.Provider value={
      {handleLogin, loading, auth, setLoading, setAuth, handleLogout, getType, typeUser, setUserInput, userInput}
      }>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};