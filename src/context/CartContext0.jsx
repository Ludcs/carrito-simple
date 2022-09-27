import {createContext, useState, useEffect} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem('cartProducts'); //todo el localstorage me viene en un "string"
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : []; //todo el localstorage lo parseo a un "object"
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartItems)); //envío lo que tenga en cartItems al localstorage en un "string"
    console.log(cartItems);
  }, [cartItems]);

  const addItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    ); //ya está en el carrito!
    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {...inCart, amount: inCart.amount + 1};
          } else {
            return productInCart;
          }
        })
      );
    } else {
      //si no está en el carrito hace una copia del carrito y agregá el product pisando su propiedad amount en 1
      setCartItems([...cartItems, {...product, amount: 1}]);
    }
  };

  const deleteteItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart.amount === 1) {
      //si amount es 1 lo sacamos del carrito
      setCartItems(
        cartItems.filter((productInCart) => productInCart.id !== product.id)
      ); //te vas a quedar con todos los elementos que sean distintos al producto que te pasé por param.
    } else {
      //si amount es 2 por ej, lo bajo a 1
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {...inCart, amount: inCart.amount - 1};
          } else {
            return productInCart;
          }
        })
      );
    }
  };

  return (
    <CartContext.Provider
      value={{cartItems, addItemToCart, deleteteItemToCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
