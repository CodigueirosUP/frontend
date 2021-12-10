import logoErro from "../images/logoErro.png";


const NotFound = () => {
  return (
    <>
      <div>
        <h1>Página não encontrada.</h1>
        <p>Nada foi encontrado por aqui</p>
      </div>
      <div>
        <img src={logoErro} alt="pagina-de-erro" />
      </div>
    </>
  )
}

export default NotFound
