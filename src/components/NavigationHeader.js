import { HStack, Text } from 'native-base';
import React from 'react';

const NavigationHeader = ({ title, left,headercolor,titleColor }) => {
  return (
    <HStack
      bgColor={headercolor}
      px="1"
      py="3"
      justifyContent="space-between"
      alignItems="center">
      <HStack alignItems="center">
        {left}
        <Text color={titleColor} fontSize="18" fontWeight="bold">
          {title}
        </Text>
      </HStack>
    </HStack>
  );
};

export default NavigationHeader;
