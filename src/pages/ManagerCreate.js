import React, { useContext, useEffect } from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { useParams } from 'react-router-dom';
// import './styles.css';
import * as Yup from 'yup';
import { ManagerContext } from '../context/ManagerContext';
import TextInputLiveFeedback from '../components/TextInpuLiveFeedback/TextInputLiveFeedback';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


const MenagerCreate = () => {

  const { postManager, putManager, findManagerById } = useContext(ManagerContext)

  const { id } = useParams()

  const gerenteDTO = { 
    email: '',
    nomeCompleto: '',
    usuario: {
      senha: '',
      usuario: 'aaaa'
    }
  }
 
  const formik = useFormik({
    initialValues: {
      email: '',
      nomeCompleto: '',
      usuario: '',
      senha: ''
    },
    onSubmit: async (values) => {
      gerenteDTO.email = values.email
      gerenteDTO.nomeCompleto = values.nomeCompleto
      gerenteDTO.usuario.usuario = values.usuario
      gerenteDTO.usuario.senha = values.senha
      if (id) {
        putManager(id, gerenteDTO)
      } else {
        postManager(gerenteDTO)
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Campo Obrigatório')
        .email('Favor inserir um email válido'
      ),
      nomeCompleto: Yup.string()
      .max(32, 'Máximo 32 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /[A-Z][a-z]* [A-Z][a-z]*/,
        'Insira o nome completo com iniciais maiúsculas'
      ),
      senha: Yup.string()
      .min(6, 'Mínumo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/,
      //   'Necessário um caractere especial, uma letra maiúscula, uma letra minúscula, um número e no mínimo 6 caracteres'
      // ),
      ,
      usuario: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')
    }),
  });

  const fetchManager = async () => {
    if (id) {
      const managerEdicao = await findManagerById(id)
      formik.setFieldValue('email', managerEdicao?.email || '');
      formik.setFieldValue('nomeCompleto', managerEdicao?.nomeCompleto || '');
      formik.setFieldValue('usuario', managerEdicao?.usuario.usuario || '');
    }
  }

  useEffect(() => {
    fetchManager();
  }, [id])

  return (
    <div className='container'>
      <div className='content'>
        <FormikProvider value={formik}>
          <Form>
            <h1>{id ? 'Editar Gerente' : 'Cadastro de Gerente' }</h1>
            <TextInputLiveFeedback label="Nome Completo" id="nomeCompleto" name="nomeCompleto" type="text" />
            <TextInputLiveFeedback label="Email" id="email" name="email" type="text" />
            <TextInputLiveFeedback label="Usuário" id="usuario" name="usuario" type="text" />
            <TextInputLiveFeedback label="Senha" id="senha" name="senha" type="text" />
            <div>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default MenagerCreate;