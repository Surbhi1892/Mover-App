import { useNavigation } from '@react-navigation/native';
import {
  Divider,
  Image,
  Input,
  Button,
  Text,
  Checkbox,
  View,
  Center,
  Pressable,
  Box, HStack, VStack,
  ScrollView,
} from 'native-base';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliverableCourierOrders } from 'store/CourierOrders/DeliverableCourierOrders';
import { useTheme } from 'theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton';
// import PackageSelect from './PackageSelect';
const ADDRESS_INPUT = 'address';

const NewInquiry = () => {
  const navigation = useNavigation();
  const { Images } = useTheme();
  const [select,setSelect]=useState(false)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(fetchDeliverableCourierOrders());
  }, []);

  const { control, errors } = useForm();


 
  const onPressPay = () => {
    alert('check');
  };
  const goToCourierDeliveryLocation = useCallback(
    () => navigation.navigate('CourierDeliveryLocation'),
    [navigation]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader
        title={'Sorğu yarat'}
        headercolor={'white'}
        titleColor={'primary.900'}
        left={<NavigationBackButton color={'primary.900'} />}
      />

      <View p={3} padding={8} flex={1}>

        <View style={styles.input_box}>
          <Input
            editable={false}
            fontSize="sm"
            height="50px"
            name={ADDRESS_INPUT}
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Başlıq'}
            pointerEvents="none"
          />
        </View>


        <View style={styles.input_box}>
          <Input
            editable={false}
            fontSize="sm"
            height="50px"
            name={ADDRESS_INPUT}
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Sorğu'}
            pointerEvents="none"
          />
        </View>

        <View style={{ marginTop: '5%',height:"10%" }}>
          <Button
            onPress={onPressPay}
            mode="contained"
            colorScheme="primary"
            style={[styles.choose_image, { backgroundColor: 'white' }]}>
            <Text fontSize={12} color="black.900">
              Şəkil əlavə etmək üçün bura vurun
              {/* payment */}
            </Text>
          </Button>
          </View>


        <Button
          onPress={onPressPay}
          mode="contained"
          colorScheme="primary"
          style={[styles.add_to_cart]}>
          <Text fontSize={12} color={'white'}>
            {/* Add to cart */}
            Yarat
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input_box: {
    borderColor: 'rgba(180, 180, 180, 0.8)',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  add_to_cart: {
        position:'absolute',
        bottom:0,
        padding: 2,
        alignSelf:'center',
        flex: 1,
        width:"80%"
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
});

export default NewInquiry;
