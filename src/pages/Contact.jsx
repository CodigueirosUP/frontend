import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

const Contact = () => {
  return (
    <div className="containerContact">
      <div className="content">


        <div className='contactquestion'>
          <div className='textContainer'>
            <div>
              <div className="contacttitle">
                <h1>Gostaria de saber mais?</h1>
                <h4>Entre em contato para que possamos tirar todas as suas dúvidas</h4>
              </div>

              <div className='contact'>
                <h1>Fale com a gente</h1>
                <p><BsTelephone /> (99)99999-9999</p>
                <p><AiOutlineMail /> suporte@wallet.com</p>
              </div>
            </div>
          </div>

          <div className='contactForm'>
            <form >
              <label>Digite seu nome completo</label>
              <input type="text" placeholder="Nome Completo" required />

              <label for="email">Digite seu e-mail</label>
              <input type="email" placeholder="E-mail" required />

              <label for="motivo">Qual o motivo do contato?</label>
              <select name="motivo" id="motivo">
                <option value="1">Contratar serviço</option>
                <option value="2">Desenvolvedores</option>
                <option value="3">Estou com dificuldades</option>
              </select>

              <label for="">Sua mensagem</label>
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
