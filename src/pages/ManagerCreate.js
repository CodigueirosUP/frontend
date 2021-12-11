  import React, { useContext, useEffect } from 'react';
  import { Formik, Field, Form } from 'formik';
  import { MenagerContext } from '../context/ManagerContext';
  import api from '../api'

const ManagerCreate = () => {
  
  const {setListMenager, listMenager} = useContext(MenagerContext)

  const getListMenager = async () => {
    const {data} = await api.get('/gerente/getGerentes');
    setListMenager(data);
  }

  useEffect(() => {
    getListMenager();
  },[]);

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: '',
          nomeCompleto: '',
          usuario: {
            senha: '',
            usuario: ''
          }
        }}
        onSubmit={async (values) => {
          await api.post('/gerente/getGerentes', values);
          getListMenager();
        }}
      >
        <Form>
          <label htmlFor="nomeCompleto">Nome Completo</label>
          <Field id="nomeCompleto" name="nomeCompleto" placeholder="Digite seu nome completo" />
  
          <label htmlFor="usuario">Usuário</label>
          <Field id="usuario" name="usuario" placeholder="Digite o Usuário do Gerente" />
  
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="Digite o Email do Gerente" type="email"/>

          <label htmlFor="senha">Senha</label>
          <Field id="senha" name="senha" placeholder="Digite a Senha do Gerente" type="password"/>

          <label htmlFor="senha">Confirmar Senha</label>
          <Field id="senha" name="senha" placeholder="Digite a Senha do Gerente" type="password"/>

          <label htmlFor="situation">Situação</label>
          <Field id="situation" name="situation" placeholder="Selecione a Situação" as='select'>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Field>
          

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default ManagerCreate
