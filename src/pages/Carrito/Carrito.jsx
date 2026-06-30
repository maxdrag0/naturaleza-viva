import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/common/Button/Button";
import CarritoCard from "../../components/CarritoCard/CarritoCard";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal/Modal";
import "./Carrito.css";
import { services } from "../../services";

function Carrito() {
  const { removeList, cartList, total } = useContext(CartContext);
  const { user, userData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleAbrirModal = () => {
    setShowModal(true);
  };

  const handleProcesarCompra = async () => {
    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra.");
      navigate("/login");
      return;
    }

    if (!userData?.telefono) {
      alert("Es obligatorio configurar tu número de teléfono en tu perfil para realizar un pedido.");
      navigate("/profile");
      return;
    }

    setIsProcessing(true);

    const orden = {
      buyer: {
        uid: user.uid,
        name: user.displayName || "Usuario",
        email: user.email,
        telefono: userData.telefono,
      },
      items: cartList,
      total: total,
      date: new Date().toISOString(),
    };
    try {
      const id = await services.firebase.crearCompra(orden);

      setOrderId(id);

      setShowModal(true);
    } catch (error) {
      console.error("Error al procesar:", error);
      alert("Error al guardar la compra");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCerrarYFinalizar = () => {
    removeList();
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>
        Bienvenido a su carrito
      </h2>
      {cartList.length === 0 ? (
        <>
          <p>El carrito está vacío</p>
          <p>Visite la tienda para elegir su proxima compra</p>
        </>
      ) : (
        <>
          {cartList.map((item) => (
            <CarritoCard key={item.codigo} item={item} />
          ))}
        </>
      )}
      <div className="total">
        {total > 0 ? (
          <>
            <p className="suma-total">
              <strong>Total final: </strong>$ {total}
            </p>
            <Button
              callback={handleProcesarCompra}
              className="realizar-compra"
              disabled={isProcessing}
            >
              {isProcessing ? "Procesando..." : "Finalizar compra"}
            </Button>
          </>
        ) : null}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAccept={handleCerrarYFinalizar}
        tittle="¡Compra Exitosa!"
        message={
          <>
            El pedido está hecho. A la brevedad nos pondremos en contacto para finalizar la compra y coordinar el envío.
            <br /><br />
            <strong>N° de Orden:</strong> {orderId}
          </>
        }
      />
    </>
  );
}

export default Carrito;
