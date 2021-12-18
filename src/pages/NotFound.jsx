import logoErro from "../images/img.png";


const NotFound = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="notFound">
          <h1>Página não encontrada.</h1>
          <p>Nada foi encontrado por aqui</p>
        </div>
        <div className="notFound">
          <img src={logoErro} alt="pagina-de-erro" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
