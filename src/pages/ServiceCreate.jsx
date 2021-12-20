import React, { useContext, useEffect } from 'react';
import { useFormik, FormikProvider, Form, useField } from 'formik';
import * as Yup from 'yup';
import { ManagerContext } from '../context/ManagerContext';
import SelectCustom from '../components/customElement/SelectCustom';
import { ServiceContext } from '../context/ServiceContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toastError, toastSucess } from '../utils/toast';
import { currencyConvert } from '../utils/formactCurrency';

const moedaOption = [
  {value:'REAL', label:'REAL'},
  {value:'DOLAR', label:'DOLAR'},
  {value:'EURO', label:'EURO'}
]

const periocidadeOption = [
  {value:"MENSAL", label:'Mensal'},
  {value:"TRIMESTRAL", label:'Trimestral'},
  {value:"SEMESTRAL", label:'Semestral'},
  {value:"ANUAL", label:'Anual'}
]

const servicoEditDTO = {
    idGerente: 0,
    descricao: "",
    moeda: "",
    nome: "",
    periocidade: "",
    valor: 0,
    webSite: ""
}

const servicoCreateDTO = {
  descricao: "",
  moeda: "",
  nome: "",
  periocidade: "",
  valor: 0,
  webSite: "",
  data: ""
}

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);

  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    meta.touched;

  return (
    <div
      className={`form-control ${showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
        }`}
    >
      <div className="flex items-center">
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

  const navigate = useNavigate();


  const { getManagers, managerList} = useContext(ManagerContext);

  useEffect(() => {
    getManagers();
  }, [])

  const { postService, putService, findServiceById  } = useContext(ServiceContext);

  const {id} = useParams(); 
  
  const managerOption = [];

  {
    managerList.map(manager => {
      managerOption.push({value: manager.idGerente, label: manager.nomeCompleto})
    })
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      descricao: '',
      website: '',
      valor: '',
      date: '',
      moeda: '',
      periocidade: '',
      gerente: ''
    },



    onSubmit: async (values) => {

      console.log(values)
      values.valor = parseInt(values.valor);
      const valueConvert = await currencyConvert(values.valor, values.moeda)

      if (id) {
        servicoEditDTO.idGerente = values.gerente;
        servicoEditDTO.descricao = values.descricao;
        servicoEditDTO.moeda = values.moeda;
        servicoEditDTO.nome = values.nome;
        servicoEditDTO.periocidade = values.periocidade;
        servicoEditDTO.valor = valueConvert;
        servicoEditDTO.webSite = values.website;
        putService(id, servicoEditDTO)
        .then(() =>{
          navigate('/servicos')
          toastSucess('Serviço editado com sucesso!')
        })
        .catch((errors) => {
          toastError(errors.response.data.errors[0])
        })
      
      } else { 
        servicoCreateDTO.descricao = values.descricao;
        servicoCreateDTO.moeda = values.moeda;
        servicoCreateDTO.nome = values.nome;
        servicoCreateDTO.periocidade = values.periocidade;
        servicoCreateDTO.valor = valueConvert;
        servicoCreateDTO.webSite = values.website;
        servicoCreateDTO.data = values.date;
        postService(values.gerente, servicoCreateDTO)
        .then(() => {
          //navigate('/servicos');
          navigate('/servicos')
          toastSucess('Serviço cadastrado com sucesso');
        })
        .catch((errors) => {
          toastError(errors.response.data.errors[0])
        })
        
      }
  
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
          'Favor inserir um website válido (www.seuservico.com)'
        ),

        valor: Yup.string()
        .max(32, 'Máximo 12 caracteres')
        .required('Campo Obrigatório'),
    }),
  });
  
  const fetchService = async () => {
    if (id) {
      const serviceEdicao = await findServiceById(id);
      formik.setFieldValue('nome', serviceEdicao?.nome || '');
      formik.setFieldValue('descricao', serviceEdicao?.descricao || '');
      formik.setFieldValue('website', serviceEdicao?.webSite || '');
      formik.setFieldValue('valor', serviceEdicao?.valor || '');
      formik.setFieldValue('moeda', serviceEdicao?.moeda || '');
      formik.setFieldValue('periocidade', serviceEdicao?.periocidade || '');
      formik.setFieldValue('gerente', serviceEdicao?.gerente.idGerente || '');
    }
  }

  useEffect( () => {
    fetchService()
  },[id])

  return (
    <div className='container'>
      <div className='content'>
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback label="Nome do Serviço" id="nome" name="nome" type="text" />
            <TextInputLiveFeedback label="descricao" id="descricao" name="descricao" type="text" />
            <TextInputLiveFeedback label="website" id="website" name="website" type="text" />
            <TextInputLiveFeedback label="valor" id="valor" name="valor" type="text" />
            {!id && <TextInputLiveFeedback label="date" id="date" name="date" type="date" />}
            <div>
              <label>moeda</label>
              <SelectCustom
                onChange={moeda => formik.setFieldValue('moeda', moeda.value)}
                value={formik.values.moeda}
                options={moedaOption}
              />
            </div>
            <div>
              <label>periocidade</label>
              <SelectCustom
                onChange={periocidade => formik.setFieldValue('periocidade', periocidade.value)}
                value={formik.values.periocidade}
                options={periocidadeOption}
              />
            </div>
            <div>
              <label>Gerente</label>
              <SelectCustom
                onChange={gerente => formik.setFieldValue('gerente', gerente.value)}
                value={formik.values.gerente}
                options={managerOption}
              />
            </div>
            <div>
              <button type="submit">Adicionar</button>
              <button type="reset">Resetar</button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>

  );
};

export default ServiceCreate;
