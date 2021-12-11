import { createContext, useState } from "react";
import ApiWallet  from "../api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const handleLogin = async (values) => {
    const { data } = await ApiWallet.post('/auth', values);
    localStorage.setItem('token', data);
    ApiWallet.defaults.headers.common['Authorization'] = data;
    setAuth(true);
    setLoading(false);
    // // navigate('/pessoa');
    window.location.href = '/dashboard';
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    ApiWallet.defaults.headers.common['Authorization'] = '';
    setAuth(false);
    setLoading(true);
    window.location.href = '/login';
  }

  return(
    <AuthContext.Provider value={
      {handleLogin, loading, auth, setLoading, setAuth, handleLogout}
      }>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};