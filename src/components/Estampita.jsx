import React, {useContext} from 'react';
import {CartContext} from '../context/CartContext';
import {Button, Image, Stack, Text, Flex} from '@chakra-ui/react';

export const Estampita = ({product}) => {
  const {addItemToCart, deleteteItemToCart} = useContext(CartContext);

  return (
    <Stack gap="16px">
      <Image src={product.image} w="100%" objectFit="contain" />
      <Stack gap="6px" height="100%">
        <Text fontWeight="500" fontSize="20px">
          {product.title}
        </Text>
        <Text color="gray" marginBottom="20px !important">
          {product.description}
        </Text>
      </Stack>
      {product.amount === 0 ? (
        <>
          <Button
            onClick={() => addItemToCart(product)}
            color="white"
            bgColor="dodgerblue"
            border="none"
            lineHeight="48px"
            borderRadius="4px"
            fontSize="18px"
            fontWeight="500"
            cursor="pointer"
            padding="0 16px"
            _hover={{
              bgColor: 'rgb(70, 163, 255)',
            }}
          >
            Agregar
          </Button>
        </>
      ) : (
        <Flex
          direction="row"
          margin="0 auto"
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Button
            color="white"
            bgColor="dodgerblue"
            border="none"
            lineHeight="48px"
            borderRadius="4px"
            fontSize="18px"
            fontWeight="500"
            cursor="pointer"
            padding="0 16px"
            width="auto"
            _hover={{
              bgColor: 'rgb(70, 163, 255)',
            }}
            onClick={() => deleteteItemToCart(product)}
          >
            -
          </Button>
          <Text fontWeight="500">{product.amount}</Text>
          <Button
            color="white"
            bgColor="dodgerblue"
            border="none"
            lineHeight="48px"
            borderRadius="4px"
            fontSize="18px"
            fontWeight="500"
            cursor="pointer"
            padding="0 16px"
            _hover={{
              bgColor: 'rgb(70, 163, 255)',
            }}
            onClick={() => addItemToCart(product)}
          >
            +
          </Button>
        </Flex>
      )}
    </Stack>
  );
};
