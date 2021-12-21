import React, { useContext, useEffect } from 'react';
import { useFormik, FormikProvider, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
// import './styles.css';
import * as Yup from 'yup';
import { ManagerContext } from '../context/ManagerContext';
import TextInputLiveFeedback from '../components/TextInpuLiveFeedback/TextInputLiveFeedback';
import { toastSucess, toastError } from '../utils/toast'

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


const MenagerCreate = () => {

  const { postManager, putManager, findManagerById } = useContext(ManagerContext)

  const { id } = useParams()

  const navigate = useNavigate()

  const gerenteDTO = {
    email: '',
    nomeCompleto: '',
    usuario: {
      senha: '',
      usuario: ''
    }
  }

  const validationSchema = () => {
    const email = Yup.string()
      .required('Campo Obrigatório')
      .email('Favor inserir um email válido')

    const nomeCompleto = Yup.string()
      .max(32, 'Máximo 32 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /[A-Z][a-z]* [A-Z][a-z]*/,
        'Insira o nome completo com iniciais maiúsculas')

    const senha = Yup.string()
      .min(6, 'Mínumo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/,
        'Necessário um caractere especial, uma letra maiúscula, uma letra minúscula, um número e no mínimo 6 caracteres'
      )

    const senhaCheck = Yup.string()
      .min(6, 'Mínumo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')
      .oneOf([Yup.ref('senha'), null], 'As senhas devem corresponder')


    const usuario = Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .required('Campo Obrigatório')

    return id ? Yup.object({ email, nomeCompleto }) : Yup.object({ email, nomeCompleto, usuario, senha, senhaCheck })
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      nomeCompleto: '',
      usuario: '',
      senha: '',
      senhaCheck: ''
    },
    onSubmit: async (values) => {
      gerenteDTO.email = values.email
      gerenteDTO.nomeCompleto = values.nomeCompleto
      if (id) {
        putManager(id, gerenteDTO)
          .then(() => {
            navigate('/gerentes')
            toastSucess('Gerente editado com sucesso!')
          })
          .catch(() => {
            toastError('Erro ao cadastrar!')
          })
          .finaly(() => {
            toastSucess('entrou aquii')
            console.log("entroiuuuuy")
          })
      } else {
        gerenteDTO.usuario.usuario = values.usuario
        gerenteDTO.usuario.senha = values.senha
        postManager(gerenteDTO)
          .then(() => {
            navigate('/gerentes')
            toastSucess('Gerente cadastrado com sucesso!')
          })
          .catch((error) => {
            toastError(error.response.data.message)
          })
          .finaly(() => {
            //toastSucess(message)
            //console.log("entroiuuuuy")
          })

      }
    },
    validationSchema: validationSchema()
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
            <div className='containerManagerCreate'>
              <div className='headerManagerCreate'>
                <h1>{id ? 'Editar Gerente' : 'Cadastro de Gerente'}</h1>
              </div>
              <div className='bodyManagerCreate'>
                <TextInputLiveFeedback label="Nome Completo*" id="nomeCompleto" name="nomeCompleto" type="text" />
                <TextInputLiveFeedback label="Email*" id="email" name="email" type="text" />
                {!id && <TextInputLiveFeedback label="Usuário*" id="usuario" name="usuario" type="text" />}
                {!id && <TextInputLiveFeedback label="Senha*" id="senha" name="senha" type="text" />}
                {!id && <TextInputLiveFeedback label="Confirmar Senha*" id="senhaCheck" name="senhaCheck" type="text" />}
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default MenagerCreate;