import { Select, SelectItem } from 'components';
import {
  Button,
  FormControl,
  useToast,
  useDisclose,
  Image,
  Input,
  Divider,
  Text,
} from 'native-base';
import React, { useCallback, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Pressable, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from 'theme';
import { useListProductCodesQuery } from 'services/Orders';
import { Portal, Dialog, Provider } from 'react-native-paper';
import ProductFileModal from 'components/ProductFileModal';
import BottomFileModel from 'components/BottomFileModel';
import { fetchNewOrder, selectNewOrder } from 'store/NewOrder';
const NewOrderForm = ({}) => {
  const { t } = useTranslation();
  const productFileDisclose = useDisclose();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [tempArray, settempArray] = useState([]);
  const { payload } = useSelector(selectNewOrder);

  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLink] = useState('test');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [urgently, SetUrgently] = useState(false);
  const [total_price, setTotal_price] = useState(0);
  const [isInsurance, setInsurance] = useState(false);
  const dispatch = useDispatch();
  const { Images } = useTheme();

  const onPressPay = useCallback(() => {
    productFileDisclose.onOpen();
  }, [productFileDisclose]);

  const showMessage = message => {
    toast.show({
      status: 'warning',
      title: message,
    });
  };

  const onsubmit = () => {
    if (links === '') {
      showMessage('Düzgün link daxil edin');
    } else if (size === '') {
      showMessage('Ölçü Mütləqdir');
    } else if (color === '') {
      showMessage('Rəng Mütləqdir');
    } else if (description === '') {
      showMessage('Qeyd Mütləqdir');
    } else if (price === '') {
      showMessage('Qiymət Mütləqdir');
    } else {
      tempArray.push(links);

      var details = {
        color: color,
        description: description,
        insurance: isInsurance,
        links: tempArray,
        price: price,
        quantity: quantity,
        size: size,
        urgently: urgently,
        total_price: total_price,
      };

      dispatch(fetchNewOrder({ data: details }));
    }
  };

  useEffect(() => {
    console.log('payload=============>', JSON.stringify(payload));
    // if(payload != undefined)
    // CheckResp(payload)
  }, [payload]);

  const CheckTotal = (text, count) => {
    console.log('total', text + '  ' + count);
    if (text != '') {
      let total = parseInt(text) * count + (parseInt(text) * count * 5) / 100;
      setTotal_price(total);
    } else {
      setTotal_price(0);
    }
  };

  return (
    <Provider>
      <View>
        <Input
          mb={3}
          value={links}
          onChangeText={text => setLink(text)}
          mt={5}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t('newOrder.productLink')}
        />

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Input
            mb={3}
            flex={1.2}
            value={size}
            onChangeText={text => setSize(text)}
            fontSize="sm"
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={t('newOrder.size')}
          />

          <View
            style={{
              flexDirection: 'row',
              marginLeft: '2%',
              justifyContent: 'space-between',
              flex: 1,
              marginBottom: '4%',
            }}>
            <View style={styles.counter_view}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    CheckTotal(price, quantity - 1);
                  }
                }}>
                <Image source={Images.minus} />
              </Pressable>
              <Text style={[styles.rate_text, { alignSelf: 'center' }]}>
                {quantity}
              </Text>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('price', price);
                  setQuantity(quantity + 1);
                  CheckTotal(price, quantity + 1);
                }}>
                <Image source={Images.plus} />
              </Pressable>
            </View>
          </View>
        </View>

        <Input
          mb={3}
          fontSize="sm"
          autoCompleteType="off"
          value={color}
          onChangeText={text => setColor(text)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t('newOrder.color')}
        />

        <Input
          mb={3}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          value={description}
          onChangeText={text => setDescription(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t('newOrder.note')}
        />

        {/* <Input
          mb={3}
          fontSize="sm"
          value={description}
          onChangeText={text => setDescription(text)}
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t('newOrder.productType')}
        /> */}

        {/* <Input
          mb={3}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t('newOrder.note')}
        /> */}

        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <Input
            mb={3}
            fontSize="sm"
            autoCompleteType="off"
            autoCorrect={false}
            flex={0.5}
            value={price}
            onChangeText={text => {
              setPrice(text);
              CheckTotal(text, quantity);
            }}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder={t('newOrder.price')}
          />

          <Input
            mb={3}
            ml={2}
            mr={2}
            flex={0.5}
            fontSize="sm"
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={t('newOrder.cargo')}
          />

          <Text
            fontSize="9"
            alignSelf={'center'}
            color={'#139A10'}
            textAlign={'center'}>
            +5%{'\n'}Komissiya
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '3%' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <MaterialCommunityIcons
              size={20}
              color={urgently ? 'red' : 'gray'}
              name={urgently ? 'checkbox-marked' : 'checkbox-blank-outline'}
              onPress={() => SetUrgently(!urgently)}
            />
            <Text
              fontWeight={400}
              fontSize={12}
              ml={1}
              onPress={() => SetUrgently(!urgently)}>
              Təcili sifariş olsun? (2$)
            </Text>
          </View>

          {/* <Button onPress={onPressPay} style={[styles.new_link]}>
            <Text fontSize="10">+ Yeni link əlavə et</Text>
          </Button> */}
        </View>

        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
          <MaterialCommunityIcons
            size={20}
            color={isInsurance ? 'red' : 'gray'}
            name={isInsurance ? 'checkbox-marked' : 'checkbox-blank-outline'}
            onPress={() => setInsurance(!isInsurance)}
          />
          <Text
            fontWeight={400}
            fontSize={12}
            ml={1}
            onPress={() => setInsurance(!isInsurance)}>
            Zəmanət (1$)
          </Text>
        </View>

        <Divider mt="2" />

        <Text fontSize={12} mt={'3'} marginLeft={2}>
          Yekun məbləğ:{' '}
          <Text fontSize={12} fontWeight={'bold'} marginLeft={2}>
            {total_price}
          </Text>
        </Text>

        <View style={{ flexDirection: 'row', flex: 1, marginTop: '5%' }}>
          <Button
            onPress={onPressPay}
            mode="contained"
            colorScheme="primary"
            style={[styles.choose_image, { backgroundColor: 'white' }]}>
            <Text fontSize={12} color="black.900">
              Ödəniş et
              {/* payment */}
            </Text>
          </Button>
          <Button
            onPress={() => onsubmit()}
            mode="contained"
            colorScheme="primary"
            style={[styles.add_to_cart]}>
            <Text fontSize={12} color={'white'}>
              {/* Add to cart */}
              Səbətə əlavə et
            </Text>
          </Button>
        </View>
      </View>
      {/* <ProductFileModal  {...productFileDisclose} /> */}
      {/* <BottomFileModel  {...bottomModelDisclose} /> */}
    </Provider>
  );
};
const styles = StyleSheet.create({
  registerButton: {
    borderColor: '#37AAEA',
    borderRadius: 4,
  },
  dialogTitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  choose_image: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    flex: 1,
  },
  add_to_cart: {
    marginBottom: '5%',
    marginLeft: 10,
    marginRight: 10,
    padding: 2,
    flex: 1,
  },
  counter_view: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: 'rgba(180, 180, 180, 0.8)',
    borderWidth: 0.5,
    flex: 1,
  },
  pic_style: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  file_style: {
    marginBottom: '5%',
    padding: 5,
  },
  add_icon: {
    fontSize: 18,
    color: '#000',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  rate_text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    flex: 1,
  },
  new_link: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 0.5,
    marginLeft: '4%',
    flex: 1,
    height: 30,
  },
});

export default NewOrderForm;
