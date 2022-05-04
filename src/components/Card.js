import { Center, HStack } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';

const Card = ({ content, ...rest }) => {
  return (
    <Pressable {...rest} bg="black.800" width="100%" p={4} borderRadius={10}>
      <Center>
        <HStack alignItems="center">{content}</HStack>
      </Center>
    </Pressable>
  );
};

export default Card;
