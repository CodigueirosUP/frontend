import logoHome from "../images/img.png"
import logoDolar from "../images/dol.png"
const Welcome = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="welcome">
          <img src={logoDolar} alt="dol-img" />
          <img src={logoHome} alt="welcome-img" />
        </div>

        <div className="welcome">
          <h1>Onde está o Wallet?</h1>
          <p>Onde está Wallet? é um sistema para gestão financeira de contas de serviços contratados pela DBC Company</p>
        </div>
      </div>

      <button>Começar</button>

    </div>

  )
}

export default Welcome
