import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Formik, Field, Form } from 'formik';

const Login = () => {

  const { handleLogin } = useContext(AuthContext);
  const [teste, setTeste] = useState('teste');

  const adminOrManager = (user) => {
    console.log(teste)
    if(user === 'admin'){
      setTeste('mudou');
      console.log(teste)
    }
  }

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
            handleLogin(values);
            adminOrManager(values.usuario)
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
