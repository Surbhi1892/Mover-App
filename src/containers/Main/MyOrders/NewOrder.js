import {
  Box,
  Button,
  FormControl,
  VStack,
  Input,
  ScrollView,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { View, Alert, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useForm } from 'react-hook-form';
import { useIsFocused } from '@react-navigation/native';
import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton';

const labels = ['Sifariş et', 'Ödəniş et', 'Nəticə'];
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NewOrderForm from './NewOrderForm';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ffffff',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#fff',
  stepStrokeUnFinishedColor: '#fff',
  separatorFinishedColor: '#fff',
  separatorUnFinishedColor: '#fff',
  stepIndicatorFinishedColor: '#000',
  stepIndicatorUnFinishedColor: '#000',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000',
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: '#fff',
  labelSize: 15,
  currentStepLabelColor: '#fff',
};

const CONTAINER_BORDER_RADIUS = 20;

const NewOrder = ({ navigation }) => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const { control, handleSubmit, errors } = useForm();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader
        title={'Sifariş et'}
        headercolor={'black.900'}
        titleColor={'white'}
        left={<NavigationBackButton color={'white'} />}
      />
      <ScrollView
        backgroundColor="black.900"
        nestedScrollEnabled={true}
        overScrollMode
        style={{ flexGrow: 1 }}>
        <Box backgroundColor="black.900" flex={1}>
          <View style={{ marginVertical: 40, marginHorizontal: 30 }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={active}
              labels={labels}
              stepCount={3}
            />
          </View>

          <Box
            flex={1}
            backgroundColor="white"
            p={6}
            borderTopLeftRadius={CONTAINER_BORDER_RADIUS}
            borderTopRightRadius={CONTAINER_BORDER_RADIUS}>
            <Text style={{ fontSize: 22, color: 'red' }}>
              {' '}
              {'01. '}
              <Text style={{ color: 'black' }}>{' Sifariş'}</Text>
            </Text>

            <KeyboardAwareScrollView>
              <VStack space="3">
                <NewOrderForm  />
                
              </VStack>
            </KeyboardAwareScrollView>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewOrder;
