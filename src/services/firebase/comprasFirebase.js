import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const crearCompra = async (compra) => {
  try {
    const docRef = await addDoc(collection(db, "compras"), compra);

    return docRef.id;
  } catch (error) {
    console.error("Error al crear la compra:", error);
    throw error;
  }
};

export const obtenerTodasLasCompras = async () => {
  try {
    const q = query(collection(db, "compras"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const compras = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return compras;
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    return [];
  }
};
