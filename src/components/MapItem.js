import {
  Box,
  HStack,
  Text,
  VStack,
 
  Image,
  ChevronDownIcon,
  Pressable,
  Divider,
} from 'native-base';
import { View, StyleSheet, Button, } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme';
import Icon from 'react-native-vector-icons/Ionicons';

const MapItem = ({ order, onPress }) => {
  const { t } = useTranslation();
  const { Images } = useTheme();
  const { status_text } = order;
  return (
    <Pressable onPress={onPress}>
      <Box borderRadius={10} px={5} py={4} backgroundColor="black.800">
        <View style={styles.status_button}>
          <Text
            color="black.500"
            fontSize="10"
            lineHeight="15px"
            fontWeight="500">
            {'Göndərildi'}
          </Text>
        </View>
        <VStack>
          <HStack>
            <VStack pt={4} justifyContent="space-between">
              <Image source={Images.destinationDot} size={4} />
              <Divider orientation="vertical" height={2} ml={2} mt={1} />
              <Divider orientation="vertical" height={2} ml={2} mt={1} />
              <Divider orientation="vertical" height={2} ml={2} mt={1} mb={2} />
              <Image source={Images.pin} size={4} />
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
                <HStack>
                  <Text
                    color="white"
                    fontSize="xs"
                    lineHeight="18px"
                    fontWeight="300">
                    Tracking: 24 iyn, 13:45
                  </Text>
                </HStack>
              </VStack>
              <VStack marginLeft={2} pt={5}>
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

          <Box
            borderWidth={1}
            mt={5}
            borderRadius={6}
            borderColor={'white'}
            p={1}>
        <HStack justifyContent="space-between">
            <Text color="white" fontSize="sm" pl={3} fontWeight="400" alignSelf={"center"}>
            Bağlama sayı:  2
            </Text>

            <ChevronDownIcon style={{ fontSize: 18, color: 'white' }}/>
            </HStack>
            
          </Box>

          <HStack pt={4} justifyContent="space-between">
            <Text color="white" fontSize="md" fontWeight="700">
              Toplam:
            </Text>
            <Text color="white" fontSize="md" ml={2} fontWeight="700">
              22.20 AZN:
            </Text>
          </HStack>


           <HStack pt={4} justifyContent="space-between">
            <Text color="white" fontSize="sm" fontWeight="500">
            Mikayıl çatdırılma edir
            </Text>
           
            <Pressable backgroundColor={"#139A10"} borderRadius={20} p={2} >
            <HStack>
            <Icon name="call" size={16} color={"white"} ml={2}/>
            <Text color="white" fontSize="sm" ml={2} fontWeight="700">
            Kuryerə zəng
            </Text> 
                 </HStack>
        </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  status_button: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 2,
    right: 20,
    top: 20,
    borderRadius: 10,
  },
});
export default MapItem;
