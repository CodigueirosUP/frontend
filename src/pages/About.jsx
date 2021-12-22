import { AiFillGithub } from 'react-icons/ai';
import breno from '../images/brenImage.jpg';
import guto from '../images/gutoImage.jpg';
import leo from '../images/leoimage.jfif'
import deb from '../images/debImage.jfif'
import samu from '../images/samuImage.jpg'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const About = () => {

  const { setTabVisualization } = useContext(AuthContext);

  useEffect(()=>{
    setTabVisualization('about')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
                  <a href="https://github.com/GutoCitton"><img className='imageDev' src={guto} alt="github pic" /></a>
                  <a href="https://github.com/GutoCitton" target="blank" ><AiFillGithub />Augusto Citon</a>
                </li>
                <li>
                  <a href="https://github.com/brenolyES" target="blank" ><img className='imageDev' src={breno} alt="github pic" /></a>
                  <a href="https://github.com/brenolyES" target="blank" ><AiFillGithub />Brenoly Porto</a>
                </li>
                <li>
                  <a href="https://github.com/deborahregina" target="blank" ><img className='imageDev' src={deb} alt="github pic" /></a>
                  <a href="https://github.com/brenolyES" target="blank" ><AiFillGithub />Deborah Regina</a>
                </li>
                <li>
                  <a href="https://github.com/LeoCardoso1" target="blank" ><img className='imageDev' src={leo} alt="github pic" /></a>
                  <a href="https://github.com/LeoCardoso1" target="blank" > <AiFillGithub />Leo Cardoso</a>
                </li>
                <li>
                  <a href="https://github.com/samu357" target="blank" ><img className='imageDev' src={samu} alt="github pic" /></a>
                  <a href="https://github.com/samu357" target="blank" ><AiFillGithub />Samuel Lopes</a>
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