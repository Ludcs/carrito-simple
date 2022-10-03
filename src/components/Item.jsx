import {Flex, Stack, StackDivider, Text} from '@chakra-ui/react';
import React from 'react';

export const Item = ({itemsInCart}) => {
  return (
    <>
      <Stack divider={<StackDivider borderColor="white" />}>
        {itemsInCart.map((el) => (
          <Flex
            key={el.id}
            direction="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Text>{el.amount}</Text>
            <Text>{el.title}</Text>
            <Text>${el.amount * el.price}</Text>
          </Flex>
        ))}
      </Stack>
    </>
  );
};
