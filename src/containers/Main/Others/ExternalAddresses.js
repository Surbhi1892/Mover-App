import { ExternalAddressesAccordion } from 'components';
import { Container } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectExternalAddresses } from 'store/ExternalAddresses';
import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton'; 


const ExternalAddresses = () => {
  const { addresses } = useSelector(selectExternalAddresses);
  return (
          <SafeAreaView style={{ flex: 1 }}>
    <NavigationHeader
      title={'Çəki'}
      headercolor={'white'}
      titleColor={'primary.900'}
      left={<NavigationBackButton ckButton color={'primary.900'} />}
    />


      <ExternalAddressesAccordion addresses={addresses} />
      </SafeAreaView>
  );
};

export default ExternalAddresses;
