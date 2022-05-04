import { removeToken } from 'helpers/AsyncStorage';
import { Box, Center, FlatList, Image, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

const OrderImages = ({ images = [] }) => {
  const { t } = useTranslation();
  const keyExtractor = useCallback(item => String(item.id), []);

  const renderItem = useCallback(
    ({ item }) => (
      <Image alt="orderImage" size="sm" source={{ uri: item.image }} />
    ),
    []
  );

  if (images.length === 0) {
    return (
      <Center my={4}>
        <Text fontWeight="500" fontSize="xs">
          {t('orderDetail.noOrderImages')}
        </Text>
      </Center>
    );
  }

  return (
    <FlatList
      my={4}
      horizontal
      keyExtractor={keyExtractor}
      data={images}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: 64,
  },
});

export default OrderImages;
