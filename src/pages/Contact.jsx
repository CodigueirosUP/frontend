import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Contact = () => {

  const { setTabVisualization } = useContext(AuthContext);

  useEffect(()=>{
    setTabVisualization('contact')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="containerContact">
      <div className="content">
        <div className='contactquestion'>
          <div className='textContainer'>
            <div>
              <div className="contacttitle">
                <h1>Gostaria de saber mais?</h1>
                <p>Utilize nosso canal de contato e entre em contato para que possamos tirar todas as suas dúvidas, e assim, poder melhor atender suas necessidades.</p>
              </div>
              <div className='contact'>
                <h1>Fale Conosco</h1>
                <p><BsTelephone /> (99)99999-9999</p>
                <p><AiOutlineMail /> suporte@wallet.com</p>
              </div>
            </div>
          </div>
          <div className='contactForm'>
            <form >
              <h3>Queremos ouvir você</h3>
              <label>Digite seu nome completo</label>
              <input type="text" placeholder="Nome Completo" required />
              <label>Digite seu e-mail</label>
              <input type="email" placeholder="E-mail" required />
              <label>Qual o motivo do contato?</label>
              <select name="motivo" id="motivo">
                <option value="1">Contratar serviço</option>
                <option value="2">Desenvolvedores</option>
                <option value="3">Estou com dificuldades</option>
                <option value="4">Elogios</option>
                <option value="5">Reclamações</option>
              </select>
              <label >Sua mensagem</label>
              <textarea name="texto" id="texto" cols="30" rows="10"></textarea>
              <div className="btnContainer">
                <button>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact; 
