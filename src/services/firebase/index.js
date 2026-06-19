import {
  obtenerProductos,
  obtenerProductosPorCodigo,
  crearProducto,
  sembrarProductos,
} from "./productosFirebase";

import { crearCompra, obtenerTodasLasCompras } from "./comprasFirebase";
import { crearContacto, obtenerMensajes, marcarMensajeComoLeido, eliminarMensaje } from "./contactoFirebase";

export const firebase = {
  crearCompra,
  obtenerTodasLasCompras,
  crearContacto,
  obtenerMensajes,
  marcarMensajeComoLeido,
  eliminarMensaje,
  obtenerProductos,
  obtenerProductosPorCodigo,
  crearProducto,
  sembrarProductos,
};
