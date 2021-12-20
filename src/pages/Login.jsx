import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { RiLockFill } from 'react-icons/ri'

const Login = () => {

  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  
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
                  <Field id="senha" name="senha" placeholder="Senha" className="inputPassword" />
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

export default Login
