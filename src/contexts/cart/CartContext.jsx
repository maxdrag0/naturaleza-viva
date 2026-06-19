import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const total = cartList.reduce(
    (acc, item) => acc + (item.precioUnitario || item.price || 0) * item.cantidad,
    0
  );
  const cantidadItems = cartList.reduce((acc, item) => acc + item.cantidad, 0);

  const addToCart = (item, cantidad) => {
    const yaEstaAgregado = cartList.find((i) => i.codigo === item.codigo);

    if (yaEstaAgregado) {
      const newCart = cartList.map((i) => {
        if (i.codigo === item.codigo) {
          return { ...i, cantidad: i.cantidad + cantidad };
        } else {
          return i;
        }
      });

      setCartList(newCart);
    } else {
      setCartList([...cartList, { ...item, cantidad }]);
    }
  };

  const updateQuantity = (codigo, cantidad) => {
    if (cantidad <= 0) return;
    const newCart = cartList.map((i) => {
      if (i.codigo === codigo) {
        return { ...i, cantidad };
      }
      return i;
    });
    setCartList(newCart);
  };

  const removeList = () => {
    setCartList([]);
  };

  const deleteItem = (codigo) => {
    const listaNueva = cartList.filter((i) => i.codigo !== codigo);
    setCartList(listaNueva);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        total,
        cantidadItems,
        addToCart,
        updateQuantity,
        removeList,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
