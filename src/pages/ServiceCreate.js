import React from 'react';
import { useFormik, FormikProvider, Form, useField } from 'formik';
// import './styles.css';
import * as Yup from 'yup';
import ApiWallet from '../api';


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

const ServiceCreate = () => {

  const formik = useFormik({
    initialValues: {
      descricao: '',
      moeda: '',
      nome: '',
      periocidade: '',
      valor: '',
      website:''
    },
    onSubmit: async (values) => {
      await ApiWallet.post('/servico/createServico', values)
    },
    validationSchema: Yup.object({
      nome: Yup.string()
      .max(32, 'Máximo 32 caracteres')
      .min(6, 'Mínumo 6 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /[a-zA-Z]+/,
        'Inserir apenas letras'
      ),

      descricao: Yup.string()
      .max(32, 'Máximo 32 caracteres')
      .min(6, 'Mínumo 6 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /[a-zA-Z]+/,
        'Inserir uma descrição válida'
      ),

      website: Yup.string()
      .min(6, 'Mínumo 6 caracteres')
      .max(32, 'Máximo 32 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
        'Favor inserir um email válido'
      ),

      valor: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .max(32, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /@"^-?[0-9][0-9,\.]+$"/,
        'Favor inserir um valor válido'
      ),

  }),
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <TextInputLiveFeedback
          label="nome"
          id="nome"
          name="nome"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <TextInputLiveFeedback
          label="descricao"
          id="descricao"
          name="descricao"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <TextInputLiveFeedback
          label="website"
          id="website"
          name="website"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <TextInputLiveFeedback
          label="valor"
          id="valor"
          name="valor"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <select name="periocidade" id="periocidade">
          <option value= 'mensal' >Mensal</option>
          <option value="trimestral">Trimestral</option>
          <option value="anual">Anual</option>
        </select>
        <select name="moeda" id="moeda">
          <option value="real">R$ (Real)</option>
          <option value="dolar">USD (Dolar)</option>
          <option value="euro">€ (Euro)</option>
          <option value="iene">¥ (Iene)</option>
          <option value="yuan">¥ (Yuan)</option>
        </select>
        <select name="gerente" id="gerente">
          <option value="gerente">Gerente</option>
        </select>

        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default ServiceCreate;
