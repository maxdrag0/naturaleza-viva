import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./CartMenu.css";
import { useContext } from "react";
import { CartContext } from "../../../contexts/cart/CartContext";

function CartWidget() {
  const { cantidadItems } = useContext(CartContext);

  return (
    <>
      <div className="carrito-container">
        <NavLink to="/carrito" className="carrito">
          <ShoppingCart size={24} color="currentColor" strokeWidth={2} />
          {cantidadItems > 0 && (
            <span className="cart-badge">{cantidadItems}</span>
          )}
        </NavLink>
      </div>
    </>
  );
}

export default CartWidget;
