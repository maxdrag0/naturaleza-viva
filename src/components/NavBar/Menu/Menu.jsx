import { NavLink } from "react-router-dom";
import "./Menu.css";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";

const categoryValues = Object.values(CATEGORIES);

function Menu() {
  return (
    <>
      <nav className="container-menu">
        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/" className="menu-item-link">
              Home
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/products" className="menu-item-link">
              Products
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink to="/contact" className="menu-item-link">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
