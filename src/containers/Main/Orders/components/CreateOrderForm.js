import { Select, SelectItem } from 'components';
import { useNavigation } from '@react-navigation/native';
import { Button, useToast, Input, Text,CheckIcon, Switch, ScrollView } from 'native-base';
import { Select as Select2 } from 'native-base';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { bytesToSize } from 'utils/Common';
import Icon from 'react-native-vector-icons/EvilIcons';
import { newBundleService, useListProductCodesQuery } from 'services/Orders';
import { Portal, Modal, Provider } from 'react-native-paper';
import ProductFileModal from 'components/ProductFileModal';
import BottomFileModel from 'components/BottomFileModel';
import { fetchCurrencies, selectAllCurrencies } from 'store/Currencies';
import { selectNewOrder, fetchNewBundle } from 'store/NewBundle';
import { store } from 'store';

const CreateOrderForm = ({
  control,
  errors,
  selectedCountryId,
  handleSubmit,
  countryNames,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast();

  const [productFileDisclose, setProductFileModal] = useState(false);
  const [galleryModal, setgalleryModal] = React.useState(false);
  const navigation = useNavigation();

  const { data: productTypes = [] } = useListProductCodesQuery({
    countryId: selectedCountryId,
  });
  const currencies = useSelector(selectAllCurrencies);
  const [isLoading, setIsLoading] = useState(false);
  const [productname, setproductName] = useState('');
  const lastMonthLimit = new Date().setMonth(new Date().getMonth() );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOrder, setDate] = useState('');
  const [shop, setShop] = useState('');
  const [fileUri, setFileuri] = useState({});
  const [trackingId, settrackingId] = useState('');
  const [orderNumber, setorderNumber] = useState('');
  const [selectedCurrency, setselectedCurrency] = useState(countryNames);
  const [specification, setSpecification] = useState('0');
  const [foxRepack, setfoxRepack] = useState('0');
  const { orderRes } = useSelector(selectNewOrder);

  const [note, setNote] = useState('');
  const [price, setPrice] = useState('');
  const [productID, setproductID] = useState('');


  useEffect(() => {

    console.log("payload=============>", JSON.stringify(orderRes))
    
  if(Object.keys(orderRes).length > 0 )

    CheckResp(orderRes)
  }, []);


  const CheckResp =(response)=>{

    if(response.status){
  
      toast.show({
        title: "uğurla",
        status: "success",
        description: response.message,
      })
      navigation.goBack();
      store.dispatch({
        type: 'NewBundle'
      })

    }else{
      toast.show({
        title: "Error",
        status: "error",
        description:response.message
      })
  
    }
  
  }

  
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onPressClear = () => {
    setFileuri({});
  };
  const keyExtractor = useCallback(item => String(item.id), []);

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setDate(moment(date).format('DD-MM-YYYY').toString());

    hideDatePicker();
  };

  // const onPressPay = () => showDialog();

  const onPress = (type, value) => {
    console.log('onPress', type);
    setProductFileModal(false);

    if (type === 'image') {
      setgalleryModal(true);
    } else {
      setFileuri(value);
    }
  };

  const GalleryPress = value => {
    console.log('imageeeee', value);
    setgalleryModal(false);
    setFileuri(value);
  };
  const getFilePath = () => {
    if (fileUri.name)
      return {
        uri: fileUri.uri,
        name: fileUri.name,
        type: 'image/png',
        size: 4 * 1000000,
      };
    return null;
  };

  const showMessage = message => {
    toast.show({
      status: 'warning',
      title: message,
    });
  };

  const onPressPay = useCallback(() => {
    setProductFileModal(true);
  }, [productFileDisclose]);

  const SubmitData = () => {
    if (shop === '') {
      showMessage('Mağaza məcburidir');
    } else if (dateOrder === '') {
      showMessage('Tarix məcburidir');
    } else if (productTypes === '') {
      showMessage('Tip məcburidir');
    } else if (trackingId === '') {
      showMessage('Tracking məcburidir');
    } else if (price === '') {
      showMessage('Qiymət məcburidir');
    } else if (note === '') {
      showMessage('Qeyd məcburidir');
    } else if (Object.keys(fileUri).length == 0) {
      showMessage('Fayl məcburidir');
    } else if (orderNumber === '') {
      showMessage('Məcburidir');
    } else if (productname === '') {
      showMessage('məhsul seçin');
    } else {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('shop', shop);
      formData.append(
        'date',
        moment(dateOrder).format('YYYY-MM-DD').toString()
      );
      formData.append('type', productID);
      formData.append('shop_order_id', orderNumber);
      formData.append('tracking', trackingId);
      formData.append('price', price);
      formData.append('currency', CurrencyId());
      formData.append('comment', note);
      formData.append('country', selectedCountryId);
      formData.append('specification', specification);
      formData.append('fox_repack', foxRepack);
      formData.append('file', getFilePath());

      dispatch(fetchNewBundle({ data: formData }));
    }
  };

  const onCancel = () => {
    setProductFileModal(false);
    // console.log('onCancel');
  };

  const GallertCancel = () => {
    setgalleryModal(false);
  };

  let serviceItems = currencies.map((s, i) => {
    return <Select2.Item key={i} value={s.code} label={s.code} />;
  });

  const renderItem = useCallback(({ item, index, isSelected }) => {
    console.log('index value', item + '   ' + index);

    return <SelectItem label={item.productname} value={item.id} />;
  }, []);

  const checkProductId = value => {
    let index = productTypes.findIndex(obj => obj.productname === value);

    console.log('prod ', productTypes[index].id);
    setproductName(value);
    setproductID(productTypes[index].id);
  };

  const renderContent = () => {
    return (
      <View style={ImageInputStyles.itemContainer}>
        <View
          style={[
            ImageInputStyles.itemTypeContainer,
            { backgroundColor: '#BE233B' },
          ]}>
          <Text style={[ImageInputStyles.itemTypeText, { color: 'white' }]}>
            {fileUri.type?.split('/')[1].toUpperCase()}
          </Text>
        </View>
        <View style={ImageInputStyles.fileInfoContainer}>
          <Text
            numberOfLines={1}
            style={[ImageInputStyles.filename, { color: 'white' }]}>
            {fileUri.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[ImageInputStyles.filesize, { color: 'white' }]}>
            {bytesToSize(fileUri.size)}
          </Text>
        </View>
        <Icon name="close" size={20} onPress={onPressClear} />
      </View>
    );
  };


  const CurrencySet = () => {
    if (currencies.length > 0) {
      let index = currencies.findIndex(
        obj => obj.country_id === selectedCountryId
      );
      // setselectedCurrency(currencies[index].code)
      return currencies[index].code;
    }
  };

  const CurrencyId = () => {
    if (currencies.length > 0) {
      let index = currencies.findIndex(
        obj => obj.country_id === selectedCountryId
      );
      // setselectedCurrency(currencies[index].code)
      return currencies[index].id;
    }
  };


  return (
    <Provider>
      <ScrollView flex={1}>
      <View style={{ marginTop: 10 }}>
        <Input
          mt={3}
          mb={3}
          value={shop}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => {
            setShop(text);
          }}
          placeholder={t('createOrder.shopName')}
        />

        <Input
          mb={3}
          value={trackingId}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => {
            settrackingId(text);
          }}
          keyboardType="email-address"
          placeholder={t('createOrder.trackingId')}
        />

        <Input
          mb={3}
          value={orderNumber}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => {
            setorderNumber(text);
          }}
          placeholder={t('createOrder.orderNumber')}
        />

        <Pressable onPress={() => setDatePickerVisibility(true)}>
          <Text
            borderWidth={0.5}
            p={2}
            borderRadius={4}
            mb={3}
            color={'gray.900'}
            color={dateOrder !== '' ? 'trueGray.900' : 'gray.900'}
            borderColor={'gray.500'}
            fontSize="sm">
            {' '}
            {dateOrder !== '' ? dateOrder : t('createOrder.orderDate')}
          </Text>
        </Pressable>


        <Select
          placeholder="Məhsulun növü*"
          data={productTypes}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          selectedValue={productname}
          onValueChange={value => checkProductId(value)}
        />

    {currencies.length>0 && (    
        <Select2
          mt={3}
          note
          placeholder="Valyuta"
          mode="dropdown"
          isDisabled={true}
          style={{ width: 120 }}
          selectedValue={CurrencySet()}
          // onValueChange={(itemValue) => setselectedCurrency(itemValue)}
        >
          {serviceItems}
        </Select2>
     ) }

        <Select2
        selectedValue={specification}
        minWidth="200"
        mt={3}
        onValueChange={(itemValue) => { setSpecification(itemValue)}}
      >
        <Select2.Item label="Basic" value="0" />
        <Select2.Item label="Standdard" value="1" />
        <Select2.Item label="Premium" value="2" />
      </Select2>


        <Input
          mt={3}
          mb={3}
          value={note}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => {
            setNote(text);
          }}
          keyboardType="email-address"
          placeholder={t('createOrder.note')}
        />

        <Input
          mb={3}
          value={price}
          fontSize="sm"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => {
            setPrice(text);
          }}
          placeholder={t('createOrder.price')}
        />

        {countryNames === 'ABŞ' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text fontSize={12} alignSelf={'center'}>
              Bağlamalarınız yenidən paketlənsin ?
            </Text>

            <Switch
              colorScheme="primary"
              size={'sm'}
              isChecked={foxRepack === '1' ? true : false}
              onToggle={value => {
                value ? setfoxRepack('1') : setfoxRepack('0');
              }}
            />
          </View>
        )}

        {Object.keys(fileUri).length > 0 ? (
          <View>{renderContent()}</View>
        ) : (
          <Button
            onPress={() => onPressPay()}
            mode="contained"
            colorScheme="primary"
            style={[styles.choose_image, { backgroundColor: 'white' }]}>
            <Text fontSize={12} color={'#37AAEA'}>
              Inovasiya faylı əlavə etmək üçün bura vurun
            </Text>
          </Button>
        )}

        <Button
          mode="contained"
          style={styles.registerButton}
          onPress={() => SubmitData()}>
          Əlavə et
        </Button>

        {isDatePickerVisible && (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            maximumDate={lastMonthLimit}
            onCancel={hideDatePicker}
          />
        )}
      </View>
      {productFileDisclose && (
        <ProductFileModal
          isOpen={productFileDisclose}
          onPress={(type, value) => onPress(type, value)}
          onCancel={() => onCancel()}
        />
      )}
      {galleryModal && (
        <BottomFileModel
          isOpen={galleryModal}
          onPress={value => GalleryPress(value)}
          onCancel={() => GallertCancel()}
        />
      )}
      </ScrollView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  registerButton: {
    paddingVertical: 4,
    borderColor: '#37AAEA',
    borderRadius: 4,
    marginBottom:40
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
    borderColor: '#37AAEA',
    borderWidth: 1,
    padding: 5,
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
});

const ImageInputStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  itemTypeContainer: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  itemTypeText: {
    marginTop: 15,
    fontSize: 10,
    fontWeight: 'bold',
  },
  fileInfoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  filename: {
    fontWeight: 'bold',
    width: '100%',
  },
  filesize: {
    fontSize: 11,
    // marginTop: 2,
  },
  clearImage: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
  emptyContentContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
  },
  emptyContentText: {
    fontSize: 12,
    fontWeight: '600',
  },
  closeModal: {
    marginHorizontal: 20,
  },
});

export default CreateOrderForm;
