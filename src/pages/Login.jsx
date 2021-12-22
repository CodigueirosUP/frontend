import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { RiLockFill } from 'react-icons/ri'

const Login = () => {

  const { handleLogin, setTabVisualization } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    setTabVisualization('login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="container">
      <div className="content">
        <div className="loginContainer">
          <div>
            <h1>Login</h1>
            <Formik
              initialValues={{
                usuario: '',
                senha: ''
              }}
              onSubmit={ (values) => {
                handleLogin(values, navigate);
              }}
            >
              <Form className="formContainer">
                <div className="inputContainer">
                <FaUserCircle className="userIcon"/>
                  <Field id="usuario" name="usuario" placeholder="Usuário" className="inputUser"/>
                </div>
                <div className="inputContainer">
                  <RiLockFill className="lockIcon"/>
                  <Field id="senha" name="senha" placeholder="Senha" className="inputPassword" type='password'/>
                </div>
                <button type="submit">Entrar</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
