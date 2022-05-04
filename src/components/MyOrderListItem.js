import { Box, Button, Divider, HStack, Text, VStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import Api, { API_ROUTES } from 'utils/Api';
import moment from 'moment';
import { TL_UTF } from 'helpers/Constants';
import { myOrdersApi, useDeleteMyOrderByIdMutation } from 'services/MyOrders';

const MyOrderList = ({ order, onChange }) => {
  const [siteImage, setSiteImage] = useState(null);
  const {
    id,
    title,
    image,
    link,
    comment,
    date,
    count,
    price,
    ourprice,
    order_type,
    urgently,
    paid,
    via,
    size,
    color,
  } = order;

  const urgentlyStatus = urgently === 1 ? 'Təcili' : 'Təcili deyil';

  const fetchImage = useCallback(async () => {
    if (link.length > 0 && link.includes('http')) {
      try {
        const response = await Api.post(`${API_ROUTES.orderImage}?url=${link}`);

        const { image: responseImage } = response.data;
        // console.log("image",responseImage)
        if (responseImage !== null && responseImage)
          setSiteImage(responseImage);
      } catch (error) {
        setSiteImage(null);
      }
    } else setSiteImage(null);
  }, [link]);

  useLayoutEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const [deleteMyOrder, { isLoading: isDeleting }] =
    useDeleteMyOrderByIdMutation();

  const onPressDelete = async () => {
    await deleteMyOrder({ id });
    onChange();
  };

  return (
    <Box backgroundColor="black.900" p="4" borderRadius="10px">
      <HStack>
        <Image
          alt="myOrderImage"
          source={{ uri: "https://cdn.dsmcdn.com/ty72/product/media/images/20210402/17/9a7b06ae/18624267/1/1_org_zoom.jpg" }}
          style={styles.image}
        />
        <VStack ml="3" flex="1">
          <Text color="white">Beden: {size}</Text>
          <Text color="white">Reng: {color}</Text>
          <Text color="white">Qeyd: {comment}</Text>
          <Text color="white">
            Tarix: {moment.unix(date).format('DD.MM.YYYY')}
          </Text>
          <Text color="white">Status: {urgentlyStatus}</Text>
          <HStack justifyContent="space-between">
            <Text color="white">Say: {count}</Text>
            <Text color="white">
              {Number(price).toFixed(2)} {TL_UTF}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text my="3" color="white">
        {link}
      </Text>
      <Divider />
      <HStack mt="3" justifyContent="space-between">
        <Text color="white">
          Toplam: {Number(ourprice).toFixed(2)} {TL_UTF}
        </Text>
        <Text color="#139A10">{paid === 1 ? 'Ödənilib' : 'Ödə'}</Text>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
    width: 85,
    height: 125,
    borderRadius: 4,
  },
});

export default MyOrderList;
