import { Box, HStack, Text, VStack, Image,Pressable, Divider } from 'native-base';
import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme';

const CourierOrderListItem = ({ order ,onPress}) => {
  const { t } = useTranslation();
  const { Images } = useTheme();
  const { status_text } = order;
  return (
    <Pressable  onPress={onPress}>
    <Box borderRadius={10} px={5} py={4} backgroundColor="black.800">
      <VStack>
        <HStack justifyContent="space-between">
          <VStack>
            <Text
              color="white"
              fontSize="xs"
              lineHeight="18px"
              fontWeight="300">
              Tracking:{' '}
            </Text>

            <Text
              color="white"
              fontSize="xs"
              lineHeight="18px"
              fontWeight="500">
              {'MVRM3462092641'}
            </Text>
          </VStack>

          <VStack>
            <Text
              color="white"
              fontSize="xs"
              lineHeight="18px"
              fontWeight="300">
              Status:
            </Text>

            <View
              style={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 10,
              }}>
              <Text
                color="black.500"
                fontSize="10"
                lineHeight="15px"
                fontWeight="500">
                {'Göndərildi'}
              </Text>
            </View>
          </VStack>
        </HStack>

        <Text color="white" fontSize="xs" lineHeight="18px" fontWeight="300">
          Bağlama sayı: 2
        </Text>

        <HStack>
           
          
        <VStack pt={4} justifyContent="space-between">
        
           <Image source={Images.destinationDot}  size={4} />
          <Divider orientation="vertical" height={2} ml={2} mt={1} />
          <Divider orientation="vertical" height={2} ml={2} mt={1} />
          <Divider orientation="vertical" height={2} ml={2} mt={1} />
          <Divider orientation="vertical" height={2} ml={2} mt={1} mb={2}/>
          <Image source={Images.pin}  size={4}  />
         
        </VStack>
         <VStack>
          <VStack marginLeft={2} pt={4}>
              <Text
                color="white"
                fontSize="xs"
                lineHeight="18px"
                fontWeight="500">
                {'Xətai rayonu,'}
                
              </Text>
            <HStack justifyContent="space-between" >  
              <Text
                color="white"
                fontSize="xs"
                lineHeight="18px"
                fontWeight="300">
                Tracking:{' '}
              </Text>
              <Text
                color="white"
                fontSize="xs"
                lineHeight="18px"
                fontWeight="300">
                24 iyn, 13:45
                  </Text>
              </HStack>
            </VStack>
            <VStack marginLeft={2} pt={8}>
              <Text
                color="white"
                fontSize="xs"
                lineHeight="18px"
                fontWeight="500">
                {'Füzuli anbarı,'}
              </Text>
              <Text
                color="white"
                fontSize="xs"
                lineHeight="18px"
                fontWeight="300">
                Füzuli 65:{' '}
              </Text>
            </VStack> 
            </VStack>
          
        </HStack>
        

        <HStack pt={4} justifyContent="space-between">
          <HStack>
          <Text
              color="white"
              fontSize="xs"
              lineHeight="18px"
              fontWeight="300">
              Çatacaq: 
            </Text>
            <Text
              color="white"
              fontSize="xs"
              ml={2}
              lineHeight="18px"
              fontWeight="700">
              10 dəq qaldı:
            </Text>
          </HStack>
          <HStack>
          <Text
              color="white"
              fontSize="xs"
              lineHeight="18px"
              fontWeight="300">
              Toplam: 
            </Text>
            <Text
              color="white"
              fontSize="xs"
              ml={2}
              lineHeight="18px"
              fontWeight="700">
              22.20 AZN:
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
    </Pressable>
  );
};

export default CourierOrderListItem;
