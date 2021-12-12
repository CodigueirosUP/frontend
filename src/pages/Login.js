import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { handleLogin, setUserInput } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="content">
        <h1>login</h1>
        <Formik
          initialValues={{
            usuario: '',
            senha: ''
          }}
          onSubmit={ (values) => {
            localStorage.setItem('typeuser', values.usuario)
            handleLogin(values);
            navigate('/dashboard');
          }}
        >
          <Form>
            <div>
              <label htmlFor="usuario">Usuário</label>
              <Field id="usuario" name="usuario" placeholder="Usuário" />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <Field id="senha" name="senha" placeholder="Senha" />
            </div>
            <button type="submit">Entrar</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login
