import { AiFillGithub } from 'react-icons/ai';
import breno from '../images/brenImage.jpg';
import guto from '../images/gutoImage.jpg';
import leo from '../images/leoimage.jfif'
import deb from '../images/debImage.jfif'
import samu from '../images/samuImage.jpg'
const About = () => {
  return (
    <div className="container">
      < div className="content">
        <div className='aboutContainer'>
          <div className="aboutInit">
            <div >
              <h1>Sobre nós</h1>
            </div>
          </div>

          <div className="aboutValues">

            <div className='aboutGeneral'>
              <h2>Missão</h2>
              <p>Organizar as informações de finanças de todos os nossos clientes e torná-las acessíveis e úteis.</p>
            </div>

            <div className='aboutGeneral'>
              <h2>Visão</h2>
              <p>Controle de finança de forma transparente.</p>
            </div>

            <div className='aboutGeneral'>
              <h2>Valores</h2>
              <p>Pratica da Inovação, Responsabilidade, Qualidade.</p>
            </div>

            <div className="aboutGeneral">
              <h2>Nossa equipe</h2>
              <ul>
                <li>
                  <a href="https://github.com/GutoCitton"><img className='imageDev' src={guto} alt="github photo" /></a>
                  <a href="https://github.com/GutoCitton" target="_blank" ><AiFillGithub />Augusto Citon</a>
                </li>

                <li>
                  <a href="https://github.com/brenolyES" target="_blank" ><img className='imageDev' src={breno} alt="github photo" /></a>
                  <a href="https://github.com/brenolyES" target="_blank" ><AiFillGithub />Brenoly Porto</a>
                </li>

                <li>
                  <a href="https://github.com/deborahregina" target="_blank" ><img className='imageDev' src={deb} alt="" /></a>
                  <a href="https://github.com/brenolyES" target="_blank" ><AiFillGithub />Deborah Regina</a>
                </li>

                <li>
                  <a href="https://github.com/LeoCardoso1" target="_blank" ><img className='imageDev' src={leo} alt="" /></a>
                  <a href="https://github.com/LeoCardoso1" target="_blank" > <AiFillGithub />Leo Cardoso</a>
                </li>

                <li>
                  <a href="https://github.com/samu357" target="_blank" ><img className='imageDev' src={samu} alt="" /></a>
                  <a href="https://github.com/samu357" target="_blank" ><AiFillGithub />Samuel Lopes</a>
                </li>

              </ul>

            </div>
          </div>

        </div>
      </div>
    </div >
  )
}


export default About;