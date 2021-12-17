import { createContext, useState } from "react";
import ApiWallet  from "../api";
import { toastError, toastSucess } from "../utils/toast";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [typeUser, setTypeUser] = useState([]);
 
  const handleLogin =  (values, navigate) => {
    setLoading(true)
    ApiWallet.post('/auth', values)
    .then((response) => {
      toastSucess('Você logou!')
      localStorage.setItem('token', response.data);
      ApiWallet.defaults.headers.common['Authorization'] = response.data;
      setAuth(true);
      // navigate('/dashboard');
      window.location.href = '/dashboard'
    })
    .catch((error) => {
      // Error
      if (error.response) {
        if (error.response.data.errors) {
          toastError('Ambos os campos precisam ser definidos');
        }
        if (error.response.data.message) {
          toastError(error.response.data.message);
        }
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const handleLogout = (navigate) => {
    // navigate('/login')
    setLoading(true)
    localStorage.removeItem('token');
    ApiWallet.defaults.headers.common['Authorization'] = '';
    window.location.href = '/login'
    // setAuth(false);
    // setTypeUser([]);
    // setLoading(false);
    
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