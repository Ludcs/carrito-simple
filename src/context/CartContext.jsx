import {createContext, useState, useEffect} from 'react';
import api from '../api';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    api.list().then((res) => {
      setProducts(res);
      setFilteredProducts(res);
    });
  }, []);

  const filtrarEstampitas = (searchString) => {
    let filtrada = products.filter((el) => el.title.includes(searchString));
    setFilteredProducts(filtrada);
  };

  const addItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:

    const inCart = products.find((el) => el.id === product.id); //ya está en el carrito!
    if (inCart) {
      setProducts(
        products.map((el) => {
          if (el.id === product.id) {
            return {...inCart, amount: inCart.amount + 1};
          } else {
            return el;
          }
        })
      );
      setFilteredProducts(
        filteredProducts.map((el) => {
          if (el.id === product.id) {
            return {...inCart, amount: inCart.amount + 1};
          } else {
            return el;
          }
        })
      );
    } else {
      //si no está en el carrito hace una copia del carrito y agregá el product pisando su propiedad amount en 1
      setProducts([...products, {...product, amount: 1}]);
      setFilteredProducts([...filteredProducts, {...product, amount: 1}]);
    }

    const existInCart = itemsInCart.find((el) => el.id === product.id);
    if (existInCart) {
      setItemsInCart(
        itemsInCart.map((el) => {
          if (el.id === product.id) {
            return {...existInCart, amount: existInCart.amount + 1};
          } else {
            return el;
          }
        })
      );
    } else {
      setItemsInCart([...itemsInCart, {...product, amount: 1}]);
    }
  };

  const deleteteItemToCart = (product) => {
    //primero pregunto si el product que recibo por param está ya en el carrito:
    const inCart = products.find((el) => el.id === product.id);
    //si amount es 2 por ej, lo bajo a 1
    setProducts(
      products.map((el) => {
        if (el.id === product.id) {
          return {...inCart, amount: inCart.amount - 1};
        } else {
          return el;
        }
      })
    );
    setFilteredProducts(
      filteredProducts.map((el) => {
        if (el.id === product.id) {
          return {...inCart, amount: inCart.amount - 1};
        } else {
          return el;
        }
      })
    );

    const existInCart = itemsInCart.find((el) => el.id === product.id);
    if (existInCart.amount === 1) {
      setItemsInCart(itemsInCart.filter((el) => el.id !== product.id));
    } else {
      setItemsInCart(
        itemsInCart.map((el) => {
          if (el.id === product.id) {
            return {...existInCart, amount: existInCart.amount - 1};
          } else {
            return el;
          }
        })
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        itemsInCart,
        inputValue,
        setInputValue,
        filtrarEstampitas,
        addItemToCart,
        deleteteItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
