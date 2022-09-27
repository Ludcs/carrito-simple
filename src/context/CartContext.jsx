import {createContext, useState, useEffect} from 'react';
import api from '../api';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  const addItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:
    const inCart = products.find(
      (productInCart) => productInCart.id === product.id
    ); //ya está en el carrito!
    if (inCart) {
      setProducts(
        products.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {...inCart, amount: inCart.amount + 1};
          } else {
            return productInCart;
          }
        })
      );
    } else {
      //si no está en el carrito hace una copia del carrito y agregá el product pisando su propiedad amount en 1
      setProducts([...products, {...product, amount: 1}]);
    }
  };

  const deleteteItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:
    const inCart = products.find(
      (productInCart) => productInCart.id === product.id
    );
    //si amount es 2 por ej, lo bajo a 1
    setProducts(
      products.map((productInCart) => {
        if (productInCart.id === product.id) {
          return {...inCart, amount: inCart.amount - 1};
        } else {
          return productInCart;
        }
      })
    );
  };

  return (
    <CartContext.Provider value={{products, addItemToCart, deleteteItemToCart}}>
      {children}
    </CartContext.Provider>
  );
};
