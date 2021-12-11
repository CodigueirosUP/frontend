//   import React, { useContext, useEffect } from 'react';
//   import { Formik, Field, Form } from 'formik';
//   import { MenagerContext } from '../context/ManagerContext';
//   import api from '../api'

// const ManagerCreate = () => {
  
//   const {setListMenager, listMenager} = useContext(MenagerContext)

//   const getListMenager = async () => {
//     const {data} = await api.get('/gerente/getGerentes');
//     setListMenager(data);
//   }

//   useEffect(() => {
//     getListMenager();
//   },[]);

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <Formik
//         initialValues={{
//           email: '',
//           nomeCompleto: '',
//           usuario: {
//             senha: '',
//             usuario: ''
//           }
//         }}
//         onSubmit={async (values) => {
//           await api.post('/gerente/getGerentes', values);
//           getListMenager();
//           console.log(getListMenager)
//         }}
//       >
//         <Form>
//           <label htmlFor="nomeCompleto">Nome Completo</label>
//           <Field id="nomeCompleto" name="nomeCompleto" placeholder="Digite seu nome completo" />
  
//           <label htmlFor="usuario">Usuário</label>
//           <Field id="usuario" name="usuario" placeholder="Digite o Usuário do Gerente" />
  
//           <label htmlFor="email">Email</label>
//           <Field id="email" name="email" placeholder="Digite o Email do Gerente" type="email"/>

//           <label htmlFor="senha">Senha</label>
//           <Field id="senha" name="senha" placeholder="Digite a Senha do Gerente" type="password"/>

//           <label htmlFor="senha">Confirmar Senha</label>
//           <Field id="senha" name="senha" placeholder="Digite a Senha do Gerente" type="password"/>

//           <label htmlFor="situation">Situação</label>
//           <Field id="situation" name="situation" placeholder="Selecione a Situação" as='select'>
//             <option value="Ativo">Ativo</option>
//             <option value="Inativo">Inativo</option>
//           </Field>
          

//           <button type="submit">Submit</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default ManagerCreate


import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik, FormikProvider, Form, useField } from 'formik';
// import './styles.css';
import * as Yup from 'yup';
import { ManagerContext } from '../context/ManagerContext';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`form-control ${
        showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
      }`}
    >
      <div className="flex items-center space-between">
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
      />
      <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  );
};

const MenagerCreate = () => {

  const { postManager } = useContext(ManagerContext)

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
      postManager(gerenteDTO)
      // getListMenager();
      // console.log(getListMenager)
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Campo Obrigatório')
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Favor inserir um email válido'
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

  return (
    <FormikProvider value={formik}>
      <Form>
        <TextInputLiveFeedback
          label="email"
          id="email"
          name="email"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <TextInputLiveFeedback
          label="nomeCompleto"
          id="nomeCompleto"
          name="nomeCompleto"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <TextInputLiveFeedback
          label="senha"
          id="senha"
          name="senha"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
          <TextInputLiveFeedback
          label="usuario"
          id="usuario"
          name="usuario"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default MenagerCreate;