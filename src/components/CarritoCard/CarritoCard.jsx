import { useContext } from "react";
import { CartContext } from "../../contexts/cart/CartContext";
import { Trash2 } from "lucide-react";
import { Counter } from "../common/Counter/Counter";
import "./CarritoCard.css";

function CarritoCard({ item }) {
  const { deleteItem, updateQuantity } = useContext(CartContext);
  const subtotal = item.precioUnitario * item.cantidad;

  const handleSumar = () => {
    if (item.cantidad < item.stock) {
      updateQuantity(item.codigo, item.cantidad + 1);
    }
  };

  const handleRestar = () => {
    if (item.cantidad > 1) {
      updateQuantity(item.codigo, item.cantidad - 1);
    }
  };

  return (
    <div className="carrito-card-container">
      <div className="item">
        <div className="item__imagen">
          <img src={item.fotoUrl || item.image} alt={item.nombre || item.name} />
        </div>
        <div className="item__detalle">
          <div className="item__detalle__titulo-boton">
            <h3>{item.nombre || item.name}</h3>
          </div>
          <p className="precio-unitario">
            Precio unidad: ${item.precioUnitario || item.price}
          </p>
        </div>
      </div>
      
      <div className="carrito-card-actions">
        <div className="carrito-card-counter">
          <Counter count={item.cantidad} sumar={handleSumar} restar={handleRestar} />
        </div>
        <div className="total-a-pagar">$ {subtotal}</div>
        <button 
          className="btn-delete-cart" 
          onClick={() => deleteItem(item.codigo)}
          title="Eliminar del carrito"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CarritoCard;
