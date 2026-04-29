import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
  limit,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { products } from "../../constants/products";

export const obtenerProductos = async (categoria) => {
  try {
    const productsRef = collection(db, "products");
    let q;

    if (categoria) {
      // Consultamos tanto la versión Title Case (si se re-sembró) como la UPPERCASE (si son datos viejos)
      q = query(productsRef, where("category", "in", [categoria, categoria.toUpperCase()]));
    } else {
      q = productsRef;
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      codigo: doc.id, // El código es el ID del documento
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

export const obtenerProductosPorCodigo = async (codigo) => {
  try {
    // Los IDs en Firebase son strings. Aseguramos que el código sea un string y reemplazamos / por -
    const idSeguro = String(codigo).replace(/\//g, "-");
    const docRef = doc(db, "products", idSeguro);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { codigo: docSnap.id, ...docSnap.data() };
    } else {
      console.log("¡No existe el producto!");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  const docRef = await addDoc(collection(db, "products"), producto);
};

export const actualizarProducto = async (producto) => {};

export const eliminarProducto = async (id) => {};

export const sembrarProductos = async () => {
  try {
    const productsRef = collection(db, "products");

    // 1. CHEQUEO DE SEGURIDAD
    const snapshot = await getDocs(query(productsRef, limit(1)));
    if (!snapshot.empty) {
      console.log(
        "¡La base de datos ya tiene productos! Ignorando la carga masiva.",
      );
      return;
    }

    // 2. BATCH DE FIRESTORE
    const batch = writeBatch(db);

    products.forEach((producto) => {
      const itemAdaptado = {
        ...producto,
        category: producto.categoria,
      };
      delete itemAdaptado.categoria;

      // EL FIX ESTÁ AQUÍ: Reemplazamos todas las '/' por '-' para hacer un ID válido en Firebase
      const idSeguro = String(producto.codigo).replace(/\//g, "-");

      // Usamos el idSeguro en la referencia
      const docRef = doc(productsRef, idSeguro);

      batch.set(docRef, itemAdaptado);
    });

    // 3. EJECUCIÓN
    await batch.commit();
    console.log("¡Catálogo completo del PDF subido a Firestore con éxito!");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  }
};
