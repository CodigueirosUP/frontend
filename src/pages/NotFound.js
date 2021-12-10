import logoErro from "../images/logoErro.png";


const NotFound = () => {
  return (
    <div className="container">
      <div className="content">
        <div>
          <h1>Página não encontrada.</h1>
          <p>Nada foi encontrado por aqui</p>
        </div>
        <div>
          <img src={logoErro} alt="pagina-de-erro" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
