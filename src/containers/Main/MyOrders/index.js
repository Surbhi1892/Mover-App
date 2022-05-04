import { MyOrderListItem, SegmentControl } from 'components';
import { Box,AddIcon, Center, FlatList,Fab } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import {
  useListMyOrdersByStatusQuery,
  useListMyOrdersStatusesQuery,
} from 'services/MyOrders';
import { SafeAreaView } from 'react-native-safe-area-context';

import TabHeader from 'components/TabHeader'
import NavigationBackButton from 'components/NavigationBackButton';
const MyOrdersContainer = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState(0);
  const { data: statuses = [] } = useListMyOrdersStatusesQuery();
  const currentStatus = statuses.find(
    (_, index) => selectedStatus === index
  )?.id;

  const {
    data: myOrders = [],
    refetch,
    isLoading: isLoadingOrders,
    isFetching,
  } = useListMyOrdersByStatusQuery({
    status: currentStatus,
  });

  const statusNames = statuses.map(status => status.name);

  const onChange = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }) => <MyOrderListItem onChange={onChange} order={item} />,
    [onChange]
  );

  const goToCreateOrder = useCallback(() => {
    navigation.navigate('NewOrder');
  }, [navigation]);

  const keyExtractor = useCallback(item => String(item.id), []);

  return (
    <SafeAreaView flex={1}>
    
    <TabHeader
        title={'Sifarişlərim'}
        headercolor={"white"}
        titleColor={"primary.900"}
        
      />
    <Box flex={1}>
      <Center>
        {useMemo(
          () =>
            statusNames.length > 0 && (
              <Box mb={2}>
                <SegmentControl
                  tabs={statusNames}
                  currentIndex={selectedStatus}
                  onChange={setSelectedStatus}
                />
              </Box>
            ),
          [statusNames, selectedStatus]
        )}
      </Center>
      <FlatList
        px="4"
        flex="1"
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={keyExtractor}
        data={myOrders}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box h="20px" />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />

    <Fab
        borderRadius="40px"
        placement="bottom-right"
        icon={<AddIcon size="4" />}
        py={3}
        px={6}
        onPress={goToCreateOrder}
        label="Sifariş et"
        renderInPortal={false}
      />
    </Box>

    </SafeAreaView >
  );
};

export default MyOrdersContainer;
