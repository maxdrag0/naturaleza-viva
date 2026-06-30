import { NavLink } from "react-router-dom";
import "./Logo.css";

import logoImg from "../../../assets/logo.png";

function Logo() {
  return (
    <>
      <div className="logo-container">
        <NavLink to="/" className="logo">
          <img
            src={logoImg}
            alt="Naturaleza Viva"
            className="logo-img"
          />
        </NavLink>
      </div>
    </>
  );
}

export default Logo;
