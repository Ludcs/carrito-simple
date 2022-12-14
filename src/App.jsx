import {useState, useContext, useRef} from 'react';
import {Estampita} from './components/Estampita';
import {CartContext} from './context/CartContext';
import {
  Flex,
  Heading,
  Grid,
  Box,
  Link,
  Button,
  Center,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  Text,
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {Cart} from './components/Cart';

function App() {
  const {
    products,
    filteredProducts,
    filtrarEstampitas,
    inputValue,
    setInputValue,
  } = useContext(CartContext);

  const [showCart, setShowCart] = useState(false);
  const [highlighted, setHighlighted] = useState('');

  const debounceRef = useRef();

  const quantity = products.reduce((acc, prod) => acc + prod.amount, 0);
  const total = products.reduce(
    (acc, prod) => acc + prod.amount * prod.price,
    0
  );

  const handleSearch = (e) => {
    // const parts = e.target.value
    //   .toLowerCase()
    //   .split(new RegExp(`(${highlighted})`, 'gi'));

    // setHighlighted(parts);
    // console.log(parts);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      //cuando pase 350ms ejecutar la busqueda
      filtrarEstampitas(e.target.value);
    }, 350);
    setInputValue(e.target.value);
  };

  return (
    <Center
      maxWidth="1240px"
      minH="100vh"
      margin="auto"
      bgColor="white"
      boxShadow="0 0 3px rgba(0, 0, 0, 0.1)"
    >
      <Flex as="main" flexDir="column" justifyContent="space-between">
        <Stack
          p="16px"
          borderBottom="1px solid gainsboro"
          direction="row"
          width="100%"
          spacing="6"
          justifyContent="space-between"
        >
          <Heading fontWeight="bold" fontSize="24px">
            Estampitiency
          </Heading>
          <InputGroup w="250px">
            <Input
              value={inputValue}
              onChange={(e) => handleSearch(e)}
              placeholder="Buscar estampitancy..."
            />
            <InputRightElement children={<SearchIcon color="blue.500" />} />
          </InputGroup>
        </Stack>
        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap="12px"
          p="16px"
        >
          {filteredProducts.length === 0 ? (
            <Box
              bgGradient="linear(to-r, green.200, pink.500)"
              padding="8px"
              borderRadius="5px"
              my="10px"
            >
              <Text textAlign="center" fontWeight="bold" fontSize="36px">
                No se encontr?? la estampita
              </Text>
            </Box>
          ) : (
            filteredProducts.map((product) => (
              <Estampita
                key={product.id}
                product={product}
                //highlighted={highlighted}
                // inputValue={inputValue}
                // filteredProducts={filteredProducts}
              />
            ))
          )}
        </Grid>
        <Stack
          spacing="6"
          pos="sticky"
          bottom="0"
          margin="auto"
          pb="16px"
          justifyContent="center"
          direction="column"
        >
          {showCart && (
            <Cart
              setShowCart={setShowCart}
              filteredProducts={filteredProducts}
            />
          )}
          <Flex justifyContent="center">
            <Button
              onClick={() => setShowCart(!showCart)}
              maxW="210px"
              boxShadow="0 0 10px  rgba(0, 0, 0, 0.5)"
              color="white"
              bgColor="dodgerblue"
              border="none"
              lineHeight="48px"
              borderRadius="4px"
              fontSize="18px"
              fontWeight="500"
              cursor="pointer"
              _hover={{
                bgColor: 'dodgerblue',
              }}
            >
              {quantity} {quantity <= 1 ? 'Producto' : 'Productos'} - Total: ($
              {total})
            </Button>
          </Flex>
        </Stack>
        <Box
          p="16px"
          borderTop="1px solid gainsboro"
          textAlign="center"
          color="gray"
        >
          Encontr?? la consigna de este ejercicio y otros m??s{' '}
          <Link
            href="https://github.com/goncy/interview-challenges/tree/main/simple-cart"
            color="black"
          >
            ac??
          </Link>
        </Box>
      </Flex>
    </Center>
  );
}

export default App;
