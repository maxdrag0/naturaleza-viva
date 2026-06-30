import { NavLink } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <>
      <div className="logo-container">
        <NavLink to="/" className="logo">
          {/* Asegúrate de colocar tu imagen del logo en la carpeta public como logo.png o logo.jpg y actualizar esta ruta si es necesario */}
          <img src="/logo.png" alt="Naturaleza Viva" className="logo-img" />
        </NavLink>
      </div>
    </>
  );
}

export default Logo;
