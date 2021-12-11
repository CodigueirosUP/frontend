import { createContext, useState } from "react";
import ApiWallet  from "../api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const handleLogin = async (values) => {
    const { data } = await ApiWallet.post('/auth', values);
    localStorage.setItem('token', data);
    // ApiWallet.defaults.headers.common['Authorization'] = data;
    // setAuth(true);
    // // navigate('/pessoa');
    // window.location.href = '/pessoa';
  }

  return(
    <AuthContext.Provider value={{handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};