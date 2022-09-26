import {useContext, useEffect, useState} from 'react';
import api from './api';
// import {CartContext} from './context/CartContext';

function App() {
  const [products, setProducts] = useState([]);
  // const [productsLength, setProductsLength] = useState(0);
  // const {cartItems, addItemToCart, deleteteItemToCart} =
  //   useContext(CartContext);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  // useEffect(() => {
  //   setProductsLength(products.reduce((acc, prod) => acc + prod.amount, 0));
  // }, [products]);

  const cantidad = products.reduce((acc, prod) => acc + prod.amount, 0);

  const total = products.reduce(
    (acc, prod) => acc + prod.amount * prod.price,
    0
  );

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

    // setProducts(
    //   products.filter((productInCart) => productInCart.id !== product.id)
    // );
    //te vas a quedar con todos los elementos que sean distintos al producto que te pasé por param.

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
    <main>
      <header>Estampitiency</header>
      <section>
        {products.map((product) => (
          <article key={product.id}>
            <img src={product.image} />
            <div>
              <p>{product.title}</p>
              <p>{product.description}</p>
            </div>
            {product.amount === 0 ? (
              <>
                <button onClick={() => addItemToCart(product)}>Agregar</button>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <button
                  style={{width: '100%'}}
                  onClick={() => deleteteItemToCart(product)}
                >
                  -
                </button>
                <p>{product.amount}</p>
                <button
                  style={{width: '100%'}}
                  onClick={() => addItemToCart(product)}
                >
                  +
                </button>
              </div>
            )}
          </article>
        ))}
      </section>
      <aside>
        <button>
          {cantidad} {cantidad <= 1 ? 'Producto' : 'Productos'} - Total: ($
          {total})
        </button>
      </aside>
      <footer>
        Encontrá la consigna de este ejercicio y otros más{' '}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">
          acá
        </a>
      </footer>
    </main>
  );
}

export default App;
