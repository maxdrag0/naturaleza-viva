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
  startAfter,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { products } from "../../constants/products";

export const obtenerProductos = async (categoria, lastVisible = null, pageSize = 8) => {
  try {
    const productsRef = collection(db, "products");
    let queryConstraints = [];

    if (categoria) {
      queryConstraints.push(where("category", "in", [categoria, categoria.toUpperCase()]));
    }
    
    // Default order by ID or any other field to ensure consistent pagination
    queryConstraints.push(orderBy("__name__"));
    
    if (lastVisible) {
      queryConstraints.push(startAfter(lastVisible));
    }
    
    queryConstraints.push(limit(pageSize));

    const q = query(productsRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const items = querySnapshot.docs.map((doc) => ({
      codigo: doc.id,
      ...doc.data(),
    }));

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { items, lastVisibleDoc };
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return { items: [], lastVisibleDoc: null };
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

export const crearProducto = async (producto, customId = null) => {
  try {
    if (customId) {
      const idSeguro = String(customId).replace(/\//g, "-");
      const docRef = doc(db, "products", idSeguro);
      await setDoc(docRef, producto);
    } else {
      await addDoc(collection(db, "products"), producto);
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const idSeguro = String(id).replace(/\//g, "-");
    const docRef = doc(db, "products", idSeguro);
    // setDoc with merge: true acts as an update but creates if it doesn't exist. UpdateDoc only works if it exists.
    await setDoc(docRef, producto, { merge: true });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const idSeguro = String(id).replace(/\//g, "-");
    const docRef = doc(db, "products", idSeguro);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

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
