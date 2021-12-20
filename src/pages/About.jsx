import { AiFillGithub } from 'react-icons/ai'
const About = () => {
  return (
    <div className="container">
      < div className="content">

        <div className="aboutInit">
          <div >
            <h1>Sobre nós</h1>
          </div>
        </div>

        <div className="aboutValues">

          <div className='aboutGeneral'>
            <h1>Missão</h1>
            <p>Organizar as informações de finanças de
              todos os nossos clientes e
              torná-las acessíveis e úteis. </p>
          </div>

          <div className='aboutGeneral'>
            <h1>Visão</h1>
            <p>Controle de finança de forma transparente.</p>
          </div>

          <div className='aboutGeneral'>
            <h1>Valores</h1>
            <ul>
              <li>Prática da Inovação</li>
              <li>Responsabilidade</li>
              <li>Qualidade</li>
            </ul>

          </div>

          <div className="aboutDev aboutGeneral">
            <h1>Nossa equipe</h1>
            <ul>
              <img src="" alt="" />
              <li><AiFillGithub /><a href="https://github.com/brenolyES?tab=repositories" target="_blank" >Brenoly</a></li>
              <li><AiFillGithub />asdasda</li>
              <li><AiFillGithub />adasda</li>
              <li><AiFillGithub />asdasdasd</li>
              <li><AiFillGithub />adsadasd</li>
            </ul>
          </div>
        </div>



      </div>
    </div>
  )
}


export default About;