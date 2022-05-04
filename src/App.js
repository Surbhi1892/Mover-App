import 'react-native-gesture-handler';
import React from 'react';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ApplicationNavigator } from 'navigators';
import { persistor, store } from 'store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BottomSheetModalProvider>
        <ApplicationNavigator />
      </BottomSheetModalProvider>
    </PersistGate>
  </Provider>
);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 30 * 60,
};

export default codePush(codePushOptions)(App);
