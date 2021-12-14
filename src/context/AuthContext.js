import { createContext, useState } from "react";
import ApiWallet  from "../api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [typeUser, setTypeUser] = useState([]);


  const handleLogin = async (values, navigate) => {
    await ApiWallet.post('/auth', values).then((response) => {
      localStorage.setItem('token', response.data);
      ApiWallet.defaults.headers.common['Authorization'] = response.data;
      setAuth(true);
      setLoading(false);
      navigate('/dashboard');
    })
      .catch((error) => {
        // Error
        if (error.response) {
          if (error.response.data.errors) {
            alert('Ambos os campos precisam ser definidos');
          }
          if (error.response.data.message) {
            alert(error.response.data.message);
            ;
          }
        }
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    ApiWallet.defaults.headers.common['Authorization'] = '';
    setAuth(false);
    setLoading(true);
    window.location.href = '/login';
  }

  const getType = async () => {
    const { data } = await ApiWallet.get(`/username`)
    setTypeUser(data);
  }

  return(
    <AuthContext.Provider value={
      {handleLogin, loading, auth, setLoading, setAuth, handleLogout, setUserInput, userInput, getType, typeUser}
      }>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};