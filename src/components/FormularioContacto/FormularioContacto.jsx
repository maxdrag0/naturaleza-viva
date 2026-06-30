import "./FormularioContacto.css";
import { useState } from "react";

function FormularioContacto({ onConfirm }) {
  const [formData, setFormData] = useState({
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.email.trim() ||
      !formData.telefono.trim() ||
      !formData.direccion.trim() ||
      !formData.ciudad.trim() ||
      !formData.mensaje.trim()
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    onConfirm(formData);
  };

  return (
    <div className="form-container">
      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="juan@hotmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          required
        />

        <textarea
          name="mensaje"
          placeholder="Deje su mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
        />

        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default FormularioContacto;
