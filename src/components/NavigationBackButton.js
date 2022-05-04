import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon, IconButton } from 'native-base';
import React, { useCallback } from 'react';

const NavigationBackButton = ({ color }) => {
  const navigation = useNavigation();
  const onPressGoBack = useCallback(() => navigation.goBack(), [navigation]);
  return (
    <IconButton
      onPress={onPressGoBack}
      icon={<ChevronLeftIcon color={color} />}
    />
  );
};
export default NavigationBackButton;
