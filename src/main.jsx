import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CartProvider} from './context/CartContext';
import {ChakraProvider} from '@chakra-ui/react';
// import './index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme.global}>
      <CartProvider>
        <App />
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
