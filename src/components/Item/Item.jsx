import { Link } from "react-router-dom";
import "./Item.css";

function Item({ item }) {
  return (
    <div className="itemCard">
      <div className="titulo">{item.nombre}</div>
      <div className="img">
        <img src={item.fotoUrl || null} alt={item.nombre} title={item.descripcion} />
      </div>
      <div className="descripcion">
        <strong>Precio:</strong> ${item.precioUnitario}
      </div>
      <div className="button">
        <Link to={`/product/${item.codigo}`}>
          <button>Ver detalle del producto</button>
        </Link>
      </div>
      <div className="stock">Stock disponible: {item.stock}</div>
    </div>
  );
}

export default Item;
