import { HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { useTheme } from 'theme';

const TransactionSectionListItem = ({ title, date, amount }) => {
  const { Images } = useTheme();
  return (
    <HStack my="3">
      <Image alt="transaction" source={Images.transactionDown} />
      <VStack ml="4" flex="1">
        <Text color="white">{title}</Text>
        <Text fontSize="2xs" color="gray.900">
          {date}
        </Text>
      </VStack>
      <Text color="white">{amount}</Text>
    </HStack>
  );
};

export default TransactionSectionListItem;
