import {useContext} from 'react';
import {Estampita} from './components/Estampita';
import {CartContext} from './context/CartContext';
import {Flex, Heading, Grid, Box, Link, Button, Center} from '@chakra-ui/react';

function App() {
  const {products} = useContext(CartContext);
  const quantity = products.reduce((acc, prod) => acc + prod.amount, 0);
  const total = products.reduce(
    (acc, prod) => acc + prod.amount * prod.price,
    0
  );

  return (
    <Center
      maxWidth="1240px"
      minH="100vh"
      margin="auto"
      bgColor="white"
      boxShadow="0 0 3px rgba(0, 0, 0, 0.1)"
    >
      <Flex as="main" flexDir="column" justifyContent="space-between">
        <Heading
          p="16px"
          borderBottom="1px solid gainsboro"
          fontWeight="bold"
          fontSize="24px"
        >
          Estampitiency
        </Heading>
        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap="12px"
          p="16px"
        >
          {products.map((product) => (
            <Estampita key={product.id} product={product} />
          ))}
        </Grid>
        <Box pos="sticky" bottom="0" margin="auto" pb="16px">
          <Button
            boxShadow="0 0 10px  rgba(0, 0, 0, 0.5)"
            color="white"
            bgColor="dodgerblue"
            border="none"
            lineHeight="48px"
            borderRadius="4px"
            fontSize="18px"
            fontWeight="500"
            cursor="default"
            _hover={{
              bgColor: 'dodgerblue',
            }}
          >
            {quantity} {quantity <= 1 ? 'Producto' : 'Productos'} - Total: ($
            {total})
          </Button>
        </Box>
        <Box
          p="16px"
          borderTop="1px solid gainsboro"
          textAlign="center"
          color="gray"
        >
          Encontrá la consigna de este ejercicio y otros más{' '}
          <Link
            href="https://github.com/goncy/interview-challenges/tree/main/simple-cart"
            color="black"
          >
            acá
          </Link>
        </Box>
      </Flex>
    </Center>
  );
}

export default App;
