import { useNavigation } from '@react-navigation/native';
import CourierOrderListItem from 'components/CourierOrderListItem';
import {
  AddIcon,
  Box,
  Container,
  Fab,
  FlatList,
  Icon,
  Spacer,
  Text,
} from 'native-base';
import React, { useCallback, useMemo, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SegmentControl } from 'components';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton';
import {
  fetchCourierOrders,
  selectAllCourierOrders,
} from 'store/CourierOrders';
const orderSteps = [
  {
    title: 'Məhsulun tipi',
  },
  {
    title: 'Məhsulun tipi',
  },
  {
    title: 'Məhsulun tipi',
  },
  {
    title: 'Məhsulun tipi',
  },
];
const CourierOrdersContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const orders = useSelector(selectAllCourierOrders);
  const tabs = useMemo(
    () => ['Hamısı', 'Gözləmədə', 'Göndərildi', 'Təhvil verildi'],
    []
  );
  const [selectedType, setSelectedType] = useState(0);
  useLayoutEffect(() => {
    dispatch(fetchCourierOrders());
  }, []);

  const goToNewCourierOrder = useCallback(
    () => navigation.navigate('NewCourierOrder'),
    []
  );

  const renderItem = useCallback(({ item }) => {
    const {} = item;
    return (
      <CourierOrderListItem
        order={item}
        onPress={() => onPressCardItem(item)}
      />
    );
  }, []);

  const onPressCardItem = useCallback(
    () => navigation.navigate('MapContainer'),
    []
  );

  const keyExtractor = useCallback(item => String(item.id), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader
        title={'Kuryer sifarişi'}
        headercolor={'white'}
        titleColor={'primary.900'}
        left={<NavigationBackButton color={'primary.900'} />}
      />
      <Box>
        {useMemo(
          () => (
            <Box mx="4" mt="4" marginRight={5}>
              <SegmentControl
                tabs={tabs}
                currentIndex={selectedType}
                onChange={setSelectedType}
              />
            </Box>
          ),
          [selectedType, tabs]
        )}
        {console.log('order', JSON.stringify(orders))}
        <FlatList
          marginTop={5}
          marginLeft={5}
          marginRight={5}
          data={orderSteps}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <Box height="20px" />}
        />
      </Box>

      <Fab
        borderRadius="30px"
        placement="bottom-right"
        icon={<AddIcon size="4" />}
        py={2}
        px={2}
        mr={1}
        onPress={goToNewCourierOrder}
        label="Kuryer sifariş et"
        renderInPortal={false}
      />
    </SafeAreaView>
  );
};

export default CourierOrdersContainer;
