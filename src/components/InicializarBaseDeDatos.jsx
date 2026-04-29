import { services } from "../services/index.js";

const InicializarBaseDeDatos = () => {
  const handleSembrar = async () => {
    console.log("Iniciando subida masiva...");
    await services.firebase.sembrarProductos();
    // Opcional: puedes hacer un window.location.reload() aquí para ver los cambios
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "2px solid red" }}>
      <h4>Zona de Admin (Borrar después)</h4>
      <button onClick={handleSembrar}>Subir Catálogo a Firestore</button>
    </div>
  );
};

export default InicializarBaseDeDatos;
