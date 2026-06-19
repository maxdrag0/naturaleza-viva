import { Link } from "react-router-dom";
import "./Item.css";

function Item({ item }) {
  const name = item.name || item.nombre;
  const image = item.image || item.fotoUrl;
  const price = item.price || item.precioUnitario;
  const description = item.description || item.descripcion;

  return (
    <div className="itemCard">
      <div className="img">
        {image ? (
          <img src={image} alt={name} title={description} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="item-info">
        <h3 className="titulo">{name}</h3>
        <div className="precio">${price}</div>
      </div>
      <div className="button-container">
        <Link to={`/product/${item.codigo}`} className="item-link">
          <button className="auth-btn btn-view">Ver Detalles</button>
        </Link>
      </div>
      <div className="stock">Stock disponible: {item.stock}</div>
    </div>
  );
}

export default Item;
