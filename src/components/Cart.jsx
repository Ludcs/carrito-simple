import React from 'react';
import {Stack, Text} from '@chakra-ui/react';
import {useContext} from 'react';
import {CartContext} from '../context/CartContext';
import {Item} from './Item';

export const Cart = ({setShowCart}) => {
  const {itemsInCart} = useContext(CartContext);

  return (
    <Stack
      onClick={() => setShowCart(false)}
      boxShadow="0 0 10px  rgba(0, 0, 0, 0.5)"
      color="white"
      borderRadius="4px"
      fontSize="16px"
      fontWeight="500"
      margin="auto"
      p="5px"
      minWidth="250px"
      minH="40px"
      direction="column"
      justifyContent="center"
      bgGradient="linear(to-r, green.200, pink.500)"
    >
      {itemsInCart.length !== 0 ? (
        <Item itemsInCart={itemsInCart} />
      ) : (
        <Text textAlign="center">😢 No hay productos en el carrito 😢</Text>
      )}
    </Stack>
  );
};
