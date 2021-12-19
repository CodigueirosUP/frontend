import logoHome from "../images/img.png"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Welcome = () => {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="contentWelcome">
        <div className="welcome">
          <div className="left">
            <img src={logoHome} alt="welcome-img" />
          </div>
          <div className="rigth">
            <h1>Onde está o Wallet?</h1>
            <p>Onde está Wallet? é um sistema para gestão financeira de contas de serviços contratados pela DBC Company.</p>
            {auth ?
            <button className="buttoninit" onClick={() => navigate("/dashboard")}>Começar</button>
            :<button className="buttoninit" onClick={() => navigate("/login")}>Começar</button>}
          </div>
        </div>
      </div>


    </div>

  )
}

export default Welcome
