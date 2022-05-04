import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Error } from 'components';
import { useTheme } from 'theme';
import Brand from 'components/Brand';
import { navigateAndSimpleReset } from 'navigators/Root';
import { getToken } from 'helpers/AsyncStorage';
import { fetchUser } from 'store/Auth';
import { fetchNotifications } from 'store/Notifications';
import { fetchDashboardData } from 'store/Dashboard';
import { fetchExternalAddresses } from 'store/ExternalAddresses';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, StatusBar } from 'native-base';

const IndexStartupContainer = () => {
  const { Layout, Colors } = useTheme();
  const [initError, setInitError] = useState(null);

  const dispatch = useDispatch();

  const init = useCallback(async () => {
    let promises = [];
    try {
      setInitError(null);
      const userToken = await getToken();
      const isSignedIn = userToken !== null;
      if (isSignedIn) {
        promises = await Promise.all([
          dispatch(fetchUser()),
          dispatch(fetchNotifications({ page: 1 })),
          dispatch(fetchDashboardData()),
          dispatch(fetchExternalAddresses()),
        ]);
        promises.map(result => unwrapResult(result));
      }
      navigateAndSimpleReset(isSignedIn ? 'Main' : 'SignIn');
    } catch (rejectedValueOrSerializedError) {
      setInitError(rejectedValueOrSerializedError);
    }

    return () => {
      promises.forEach(promise => promise.abort());
    };
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  const renderContent = useCallback(() => {
    if (initError) {
      return (
        <Error
          colorScheme="secondary"
          color="white"
          error={initError}
          onRetry={init}
        />
      );
    }
    return <Brand width={185} />;
  }, [init, initError]);

  return (
    <Box
      bgColor="primary.100"
      flex="1"
      p={10}
      justifyContent="center"
      alignItems="center">
      <StatusBar barStyle="light-content" />
      {renderContent()}
    </Box>
  );
};

export default IndexStartupContainer;
