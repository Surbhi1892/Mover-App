import { useNavigation } from '@react-navigation/native';
import { OrderList, SegmentControl } from 'components';
import { AddIcon, Box, Center, Fab, Text } from 'native-base';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import TabHeader from 'components/TabHeader'
import {
  fetchOrders,
  fetchOrdersDeliveries,
  selectOrders,
  selectOrdersByDelivery,
} from 'store/Orders';

const OrderListByDelivery = ({ deliveryId }) => {
  const navigation = useNavigation();
  const { data: orders } = useSelector(state =>
    selectOrdersByDelivery(state, deliveryId)
  );

  const onPressItem = useCallback(
    order => {
      navigation.navigate('OrderDetail', { id: order.id });
    },
    [navigation]
  );

  return (
    <OrderList
      data={orders}
      px={4}
      contentContainerStyle={styles.listContentContainer}
      onPressItem={onPressItem}
    />
  );
};

const OrdersContainer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { deliveries, isLoadingOrders } = useSelector(selectOrders);
  const [selectedDelivery, setSelectedDelivery] = useState(0);

  const existingDelivery = deliveries.find(
    (_, index) => index === selectedDelivery
  );

  const page = useRef(1);

  const deliveryNames = useMemo(
    () => deliveries.map(delivery => delivery.name),
    [deliveries]
  );

  useLayoutEffect(() => {
    dispatch(fetchOrdersDeliveries());
  }, [dispatch]);

  useEffect(() => {
    if (deliveries.length > 0) {
      dispatch(
        fetchOrders({ delivery: existingDelivery?.id, page: page.current })
      );
    }
  }, [selectedDelivery, deliveries.length, dispatch, existingDelivery?.id]);

  const selectedDeliveryId = existingDelivery?.id;

  const goToCreateOrder = useCallback(() => {
    navigation.navigate('OrderCreate');
  }, [navigation]);

  return (
    <SafeAreaView flex={1}>
    
    <TabHeader
        title={'Bağlamalarım'}
        headercolor={"white"}
        titleColor={"primary.900"}
        
      />
    <Box >
      <Center>
        {useMemo(
          () =>
            deliveryNames.length > 0 && (
              <Box mb={2}>
                <SegmentControl
                  tabs={deliveryNames}
                  currentIndex={selectedDelivery}
                  onChange={setSelectedDelivery}
                />
              </Box>
            ),
          [deliveryNames, selectedDelivery]
        )}
      </Center>
      {useMemo(
        () => (
          <OrderListByDelivery deliveryId={selectedDeliveryId} />
        ),
        [selectedDeliveryId]
      )}
     
    </Box>
    <Fab
        borderRadius="40px"
        placement="bottom-right"
        icon={<AddIcon size="4" />}
        py={3}
        px={6}
        onPress={goToCreateOrder}
        label="Bəyan əlavə et"
        renderInPortal={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  pagerView: {
    flex: 1,
  },
});

export default OrdersContainer;
