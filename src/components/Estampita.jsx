import React, {useContext, useEffect, useState} from 'react';
import {CartContext} from '../context/CartContext';
import {Button, Image, Stack, Text, Flex} from '@chakra-ui/react';

export const Estampita = ({product, inputValue, filteredProducts}) => {
  const {addItemToCart, deleteteItemToCart} = useContext(CartContext);
  //const [onlyLetters, setOnlyLetters] = useState([]);
  //const [onlyLettersInput, setOnlyLettersInput] = useState([]);
  // const letters = highlighted.split('', 1);
  // console.log(letters);

  // let lowerCInputValue = inputValue.toLowerCase().replace(/\s+/g, '');
  // let arrInputValueLetters = [...lowerCInputValue];
  // console.log(arrInputValueLetters);
  //console.log(lowerCInputValue);

  // let onlyTitleFiltered = filteredProducts.map((el) => el.title);
  // let titleFilteredLetters = onlyTitleFiltered
  //   .toString()
  //   .toLowerCase()
  //   .replace(/\s+/g, '');
  // let arrTitleFilteredLetters = [...titleFilteredLetters];
  //let titleFilteredLetters = onlyTitleFiltered.replace(/\s+/g, '');
  //console.log(arrTitleFilteredLetters);

  // let titleProduct = product.title;
  // let lowerC = titleProduct.toLowerCase().replace(/\s+/g, '');
  // let arrTitleProduct = [...lowerC];
  // console.log(arrTitleProduct);

  // let loIncluye = onlyTitleFilteredToString.includes(inputValue);
  // console.log(loIncluye);

  //let tituloIncluyeInputValue = arrTitleProduct.includes(arrInputValue);
  //console.log(tituloIncluyeInputValue);

  // useEffect(() => {
  //   setOnlyLetters(arrTitleProduct);
  // }, []);

  return (
    <Stack gap="16px">
      <Image src={product.image} w="100%" objectFit="contain" />
      <Stack gap="6px" height="100%">
        {/* {highlighted.map((el, i) => {
          <Text
            key={i}
            fontWeight="500"
            fontSize="20px"
            color={
              el.toLowerCase() === highlighted.toLowerCase() ? 'red' : 'blue'
            }
          >
            {el}
          </Text>;
        })} */}
        <Text
          fontWeight="500"
          fontSize="20px"
          //color={loIncluye ? 'red' : 'black'}
        >
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
