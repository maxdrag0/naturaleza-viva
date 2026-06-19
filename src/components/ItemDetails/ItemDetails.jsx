import "./ItemDetails.css";
import { useState } from "react";
import { useContext } from "react";
import { Counter } from "../common/Counter/Counter";
import { Button } from "../common/Button/Button";
import { CartContext } from "../../contexts/cart/CartContext";
import { NavLink } from "react-router-dom";
import Modal from "../common/Modal/Modal";

function ItemDetails({ item }) {
  const { cartList, addToCart } = useContext(CartContext);
  const itemInCart = cartList.find((prod) => prod.codigo === item.codigo);
  const inCartQuantity = itemInCart ? itemInCart.cantidad : 0;
  const availableStock = item.stock - inCartQuantity;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  const sumar = () => {
    if (count < availableStock) {
      setCount(count + 1);
    }
  };

  const restar = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (count <= availableStock) {
      addToCart(item, count);
      setIsModalOpen(true);
      setCount(1);
    }
  };

  return (
    <div className="item-detail-container">
      <div className="item-img">
        <img src={item.fotoUrl} alt={item.nombre} />
      </div>
      <div className="item-detail">
        <div className="item-detail__intro">
          <div className="item-detail__intro__titulo">{item.nombre}</div>
          <div className="item-detail__intro__rating">
          </div>
          <div className="item-detail__description">{item.descripcion}</div>
          <div className="item-detail__price">
            $ {item.precioUnitario} (Stock: {item.stock})
          </div>
        </div>

        <div className="item-detail__carrito">
          {inCartQuantity > 0 && (
            <p style={{ color: "var(--accent-color)", fontWeight: "bold", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
              Ya tienes {inCartQuantity} unidad(es) en el carrito.
            </p>
          )}

          {availableStock > 0 ? (
            <div className="item-detail__carrito__contador">
              <Counter count={count} sumar={sumar} restar={restar} />
              <Button callback={handleAdd} className="boton-agregar-carrito">
                Agregar al carrito
              </Button>
            </div>
          ) : (
            <p style={{ color: "var(--danger-color)", fontWeight: "bold" }}>
              Sin stock disponible.
            </p>
          )}

          <div className="item-detail__carrito__ir-al-carrito">
            <NavLink to="/carrito" className="nav-carrito">
              Ir al carrito
            </NavLink>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => setIsModalOpen(false)}
        tittle="¡Éxito!"
        message={`Has agregado ${count} unidad(es) de ${item.nombre} al carrito.`}
      ></Modal>
    </div>
  );
}

export default ItemDetails;
