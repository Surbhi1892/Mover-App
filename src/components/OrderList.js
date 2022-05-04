import { Box, FlatList } from 'native-base';
import React, { useCallback } from 'react';
import OrderListItem from './OrderListItem';

const OrderList = ({ onPressItem = () => {}, ...rest }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <OrderListItem onPressDetail={() => onPressItem(item)} order={item} />
    ),
    [onPressItem]
  );

  const keyExtractor = useCallback(item => String(item.id), []);

  const renderSeparator = useCallback(() => <Box flex={1} height={4} />, []);

  return (
    <FlatList
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      {...rest}
    />
  );
};

export default OrderList;
