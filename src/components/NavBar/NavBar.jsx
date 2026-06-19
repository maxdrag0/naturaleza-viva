import "./NavBar.css";
import { useState } from "react";
import CartMenu from "./CartMenu/CartMenu";
import Logo from "./Logo/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { Menu, X, User, Shield } from "lucide-react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="container-nav">
      <div className="nav-inner">
        <Logo />

        {/* Hamburger Icon for Mobile */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links-container ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className="nav-link" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="nav-link" onClick={closeMenu}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Actions (Right Side) */}
        <div className="nav-actions">
          {isAdmin && (
            <NavLink to="/admin" className="nav-action-link admin-link" title="Admin Dashboard">
              <Shield size={20} />
              <span className="action-text">Admin</span>
            </NavLink>
          )}
          {user ? (
            <NavLink to="/profile" className="nav-action-link user-link" title="Mi Perfil">
              <User size={20} />
              <span className="action-text">Perfil</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-action-link user-link" title="Iniciar Sesión">
              <User size={20} />
              <span className="action-text">Ingresar</span>
            </NavLink>
          )}
          <CartMenu />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
