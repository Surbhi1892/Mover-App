import {
  Box,
  Button,
  HStack,
  Pressable,
  Center,
  ScrollView,
  View,
  Text,
  VStack,
} from 'native-base';
import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Fontisto';
export const BalanceItem = ({ title, balance, buttonTitle, onPressAdd }) => {
  return (
    <Box
    borderRadius={20}
    margin={2}
    alignSelf={'center'}
    flex={1}
    backgroundColor="black.900"
    width="45%">
    <VStack flex="1">
      <Center p="2" flex="1">
        <Text color="white">Türkiyə balansı</Text>
        <Text color="white" fontSize="xl" fontWeight="bold">
          {'0.00 kq'}
        </Text>
      </Center>

      <Button
        onPress={onPressAdd}
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}>
        <HStack space="2">
          <Icon name="plus-a" size={18} color={'white'} />
          <Text color="white" fontSize="md" fontWeight="bold">
            Çəki əlavə et
          </Text>
        </HStack>
      </Button>
    </VStack>
  </Box>
  );
};

const HorizontalBalanceList = ({ renderItem = () => {}, data = [] }) => {
  return (
   
        <View height={"50%"}>

      {useMemo(() => data.map(renderItem), [data, renderItem])}
      </View>
   
  
  );
};

export default HorizontalBalanceList;
