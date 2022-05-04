import { HStack, Text } from 'native-base';
import React from 'react';

const TabHeader = ({ title,headercolor,titleColor }) => {
  return (
    <HStack
      bgColor={headercolor}
      px="5"
      py="5"
      justifyContent="space-between"
      alignItems="center">
      <HStack alignItems="center">
        
        <Text color={titleColor} fontSize="18" fontWeight="bold" >
          {title}
        </Text>
      </HStack>
    </HStack>
  );
};

export default TabHeader;
