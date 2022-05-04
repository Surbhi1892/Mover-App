// import { track } from 'helpers/analytics';
import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  useClipboard,
  useToast,
  VStack,
} from 'native-base';
import React, { useCallback } from 'react';
import { useTheme } from 'theme';

const ExternalAddressItem = ({ data }) => {
  const { key, value } = data;
  const { Images } = useTheme();
  const { onCopy } = useClipboard();
  const toast = useToast();

  const onPress = useCallback(() => {
    toast.show({
      status: 'info',
      title: key,
      description: `Kopyalandı`,
    });
    // {
    //     country: addresses[index].name,
    // }
    // track(`${key} copy klik`);
    onCopy(value);
  }, [onCopy]);
  return (
    <Pressable onPress={onPress}>
      <VStack>
        <HStack alignItems="center">
          <VStack flex={1}>
            <Text
              fontSize={10}
              lineHeight="24px"
              fontWeight="300"
              color="gray.900">
              {key}
            </Text>
            <Text lineHeight="31px" fontSize={12} color="white">
              {value}
            </Text>
          </VStack>
          <Pressable>
            <Image alt="copyExternalAddress" source={Images.copy} />
          </Pressable>
        </HStack>
        <Divider mt={3} />
      </VStack>
    </Pressable>
  );
};

export default ExternalAddressItem;
