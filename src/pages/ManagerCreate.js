import React, { useContext, useEffect } from 'react';
import { useFormik, FormikProvider, Form, useField } from 'formik';
// import './styles.css';
import * as Yup from 'yup';
import { ManagerContext } from '../context/ManagerContext';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);
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
    <div className='container'>
      <div className='content'>
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback label="email" id="email" name="email" type="text" />
            <TextInputLiveFeedback label="nomeCompleto" id="nomeCompleto" name="nomeCompleto" type="text" />
            <TextInputLiveFeedback label="senha" id="senha" name="senha" type="text" />
            <TextInputLiveFeedback label="usuario" id="usuario" name="usuario" type="text" />
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