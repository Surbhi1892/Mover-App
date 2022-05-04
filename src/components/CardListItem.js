import {
  Box,
  ChevronRightIcon,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

const CardListItem = ({ cardNumber, holderName, expireDate, onPress }) => {
  return (
    <Pressable rounded="lg" ml="4" onPress={onPress}>
      
      <HStack flex="1">
        <VStack flex="1">
          <Text fontWeight="bold" fontSize="md">
            {holderName}
          </Text>
          <Text fontSize="xs" fontWeight="semibold">
            {cardNumber}. Expires: {expireDate}
          </Text>
        </VStack>
        <ChevronRightIcon color="gray.900" />
      </HStack>
      <Divider mt="3" />
    </Pressable>
  );
};

export default CardListItem;
