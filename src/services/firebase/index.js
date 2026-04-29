import {
  obtenerProductos,
  obtenerProductosPorCodigo,
  crearProducto,
  sembrarProductos,
} from "./productosFirebase";

import { crearCompra } from "./comprasFirebase";
import { crearContacto } from "./contactoFirebase";

export const firebase = {
  crearCompra,
  crearContacto,
  obtenerProductos,
  obtenerProductosPorCodigo,
  crearProducto,
  sembrarProductos,
};
