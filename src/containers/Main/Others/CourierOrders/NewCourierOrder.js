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
import PackageSelect from './PackageSelect';
const ADDRESS_INPUT = 'address';

const NewCourierOrderContainer = () => {
  const navigation = useNavigation();
  const { Images } = useTheme();
  const [select,setSelect]=useState(false)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(fetchDeliverableCourierOrders());
  }, []);

  const { control, errors } = useForm();

  const AddressInputRight = <Image source={Images.map} mr={2} />;
  const Box = <Image source={Images.orders} marginLeft={4} mr={2} />;
  const down = <Image source={Images.down} marginRight={4} mr={2} />;
  const questions = (
    <Image source={Images.questions} marginLeft={2} mr={1} size={5} />
  );


 
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
        title={'Kuryer sifariş et'}
        headercolor={'white'}
        titleColor={'primary.900'}
        left={<NavigationBackButton color={'primary.900'} />}
      />

      <ScrollView p={3} padding={8}>
        <View style={styles.input_box}>
          <Input
            editable={false}
            fontSize="sm"
            height="50px"
            name={ADDRESS_INPUT}
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            InputRightElement={AddressInputRight}
            placeholder={'Tam ünvan daxil edin'}
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
            placeholder={'Əlaqə nömrəsi'}
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
            placeholder={'Bağlama seç'}
            InputLeftElement={Box}
            InputRightElement={down}
            pointerEvents="none"
          />

          <PackageSelect/>
          <PackageSelect/>
        </View>
        <Checkbox value="one" my={4} fontSize="sm" textAlign={'center'}>
          <Text
            fontSize="14"
            marginLeft={2}
            alignSelf={'center'}
            textAlign={'center'}>
            Gün ərzində çatdırılma
          </Text>

          {questions}
        </Checkbox>

        <Checkbox value="one" my={1} fontSize="sm" textAlign={'center'}>
          <Text
            fontSize="14"
            marginLeft={2}
            alignSelf={'center'}
            textAlign={'center'}>
            Təcili kuriyer sifarişi
          </Text>

          {questions}
        </Checkbox>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '7%',
          }}>
          <Text fontSize="15" marginLeft={2}>
            Daşınma haqqı:
          </Text>

          <Text fontSize="15" marginLeft={2}>
            0.00 AZN
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <Text fontSize="15" marginLeft={2}>
            Kuriyer xidməti:
          </Text>

          <Text fontSize="15" marginLeft={2}>
            0.00 AZN
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <Text fontSize="15" marginLeft={2}>
          Təcili kuriyer sifarişi:
          </Text>

          <Text fontSize="15" marginLeft={2}>
            0.00 AZN
          </Text>  
        </View>

       

        <Divider mt={5}  />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <Text fontSize="15" marginLeft={2} fontWeight={'bold'}>
          Təcili kuriyer sifarişi:
          </Text>

          <Text fontSize="15" marginLeft={2} fontWeight={'bold'}>
            0.00 AZN
          </Text>
        </View>


        <Button
          onPress={onPressPay}
          mb={20}
          mode="contained"
          colorScheme="primary"
          style={[styles.add_to_cart]}>
          <Text fontSize={12} color={'white'}>
            {/* Add to cart */}
            Təsdiq et
          </Text>
        </Button>
      </ScrollView>
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
    marginTop:'10%',
    marginBottom: '5%',
    marginLeft: 10,
    marginRight: 10,
    padding: 2,
    flex: 1,
  },
});

export default NewCourierOrderContainer;
