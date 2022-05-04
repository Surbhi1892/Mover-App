import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SegmentControl } from 'components';
import { Box, FormControl, Input, VStack } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, selectAllCountries } from 'store/Countries';

import { useForm } from 'react-hook-form';
import CreateOrderForm from './components/CreateOrderForm';

import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton'; 
const { width } = Dimensions.get('screen');



const OrderCreateContainer = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);

  const { t } = useTranslation();

  const { control, handleSubmit, errors } = useForm();
  // const { isLoadingCurrencies, data: currencies = [] } = fetchCurrencies({})

  const [selectedIndex, setSelectedIndex] = useState(0);

  const countryNames = useMemo(
    () => countries.map(country => country.full_name),
    [countries]
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);



  const selectedCountryId = useMemo(
    () => (countries.length > 0 ? countries[selectedIndex].id : null),
    [selectedIndex, countries]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationHeader
      title={'Bəyan et'}
      headercolor={'white'}
      titleColor={'primary.900'}
      left={<NavigationBackButton ckButton color={'primary.900'} />}
    />
    {console.log("cont",JSON.stringify(countries))}
    <Box  pl={"6"} pr={"6"} pt={"2"}>

      
      {useMemo(
        () =>
          countryNames.length > 0 && (
            <SegmentControl
              width={width - 48}
              tabs={countryNames}
              currentIndex={selectedIndex}
              onChange={setSelectedIndex}
            />
          ),
        [countryNames, selectedIndex]
      )}
      <KeyboardAwareScrollView>
        <VStack space="3">
          <CreateOrderForm
            selectedCountryId={selectedCountryId}
            errors={errors}
            control={control}
            countryNames={countryNames[selectedIndex]}
            handleSubmit={handleSubmit}
          />
        </VStack>
      </KeyboardAwareScrollView>
    </Box>
    </SafeAreaView>
  );
};

export default OrderCreateContainer;
