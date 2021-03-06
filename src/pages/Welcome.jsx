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
            <h1>Onde está </h1>
            <span className="walletName">Wallet?</span>
            <p>É um sistema para gestão financeira de contas de serviços contratados pela DBC Company.</p>
            {auth ?
              <button className="buttoninit" onClick={() => navigate("/dashboard")}>Começar</button>
              : <button className="buttoninit" onClick={() => navigate("/login")}>Começar</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;
