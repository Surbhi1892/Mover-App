import {
  Box,
  Container,
  Divider,
  FlatList,
  Heading,
  View,
  Stack,
  Text,
} from 'native-base';
import React, { useCallback, useRef, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RefreshControl, SafeAreaView } from 'react-native';
const orderSteps = [
  {
    title: 'Məhsulun tipi',

    onPress: alert,
  },
  {
    title: 'Qiyməti',
    // buttonLabel: 'Bəyan et',
    // onPress: onPressDeclareAtSmartCustoms,
    // buttonLabel: null,
    description: 'Bəyan gözləyir',
  },
  {
    title: 'Məhsulun tipi',

    buttonLabel: 'Göndər',
    // onPress: onPressSendOrder,
  },
];

const ProductTab = ({ order }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const page = useRef(1);

  const {
    shopName,
    specificationName,
    id,
    country,
    statusName,
    delivery,
    price,
    _currency,
    weight,
    shippingPrice,
    product_type
  } = order;




  const renderItem = useCallback(item => {
    console.log('tenne', JSON.stringify(item));
    // const formattedDate = moment(created_at).format('MMM DD, YYYY');
    return (
      <Box shadow={2} rounded="lg" >
        <Stack px={5} py={3}>
          <Box>
            <Text fontSize={12} fontWeight="300">
              {item.title}
            </Text>
            <Text fontSize={12} fontWeight="600">
              {'T-shirt'}
            </Text>
            <Text fontSize={10} style={{ color: '#787878' }}>
              {'https://www2.hm.com/tr_tr/productpage.0848988001.html'}
            </Text>
          </Box>
          <Divider mt={3} />

         
        </Stack>
      </Box>
    );
  }, []);
  return (
    <View>
      {/* {useMemo(() => orderSteps.map(renderItem), [orderSteps, renderItem])} */}

      <Box shadow={2} rounded="lg" >
        <Stack px={5} py={3}>
          <Box>
            <Text fontSize={13} fontWeight="300">
            Məhsulun tipi
            </Text>
            <Text fontSize={13} fontWeight="600">
              {product_type.productname}
            </Text>
            {/* <Text fontSize={10} style={{ color: '#787878' }}>
              {'https://www2.hm.com/tr_tr/productpage.0848988001.html'}
            </Text> */}
          </Box>
          <Box mt={5}>
            <Text fontSize={13} fontWeight="300">
            Qiyməti
            </Text>
            <Text fontSize={13} fontWeight="600">
              {price}
            </Text>
            {/* <Text fontSize={10} style={{ color: '#787878' }}>
              {'https://www2.hm.com/tr_tr/productpage.0848988001.html'}
            </Text> */}
          </Box>
          <Divider mt={2} mb={2} />

         
        </Stack>
      </Box>

    </View>
  );
};

export default ProductTab;
