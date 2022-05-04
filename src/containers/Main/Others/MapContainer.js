import { ExternalAddressesAccordion } from 'components';
import { Container,Box,Text } from 'native-base';
import React, { useCallback, useMemo, useState, useLayoutEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { useSelector } from 'react-redux';
import { selectExternalAddresses } from 'store/ExternalAddresses';
import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapItem from 'components/MapItem';
const MapContainer = () => {
  const { addresses } = useSelector(selectExternalAddresses);

  const onPressCardItem = useCallback(
    () => alert("jjdjj"),
    []
  );

  return (
    <SafeAreaView  style={{flex:1}}>
    
      
    <NavigationHeader
        title={'MVRM3462092641'}
        headercolor={"white"}
        titleColor={"primary.900"}
        left={<NavigationBackButton color ={"primary.900"} />}
      />

      <Box flex="1">
      <MapView
          style={{width:"100%",height:"60%"}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

    <MapItem
            order={{}}
            onPress={() => onPressCardItem(item)}
          />
        </Box>
    
    </SafeAreaView>
  );
};

export default MapContainer;
