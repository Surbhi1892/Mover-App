import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import startup from './Startup';
import theme from './Theme';
import dashboard from './Dashboard';
import externalAddresses from './ExternalAddresses';
import auth from './Auth';
import notifications from './Notifications';
import orders from './Orders';
import singleOrder from './Orders/Single';
import returnReasons from './Orders/ReturnReasons';
import postOffices from './PostOffices';
import courierOrders from './CourierOrders';
import deliverableCourierOrders from './CourierOrders/DeliverableCourierOrders';
import azericardPayment from './AzericardPayment';
import weightBalance from './WeightBalance';
import payTRPayment from './PayTRPayment';
import countries from './Countries';
import currencies from './Currencies';
import { myOrdersApi } from 'services/MyOrders';
import { newsApi } from 'services/News';
import { weightBalanceApi } from 'services/WeightBalance';
import { payTRapi } from 'services/Payment/PayTR';
import { productCodesApi } from 'services/Orders';
import  register  from './Register';
import NewBundle from './NewBundle';
import NewOrder from './NewOrder'

const reducers = combineReducers({
  startup,
  theme,
  dashboard,
  externalAddresses,
  auth,
  notifications,
  orders,
  singleOrder,
  returnReasons,
  postOffices,
  courierOrders,
  deliverableCourierOrders,
  azericardPayment,
  weightBalance,
  payTRPayment,
  NewBundle,
  countries,
  currencies,
  register,
  NewOrder,
  [myOrdersApi.reducerPath]: myOrdersApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [weightBalanceApi.reducerPath]: weightBalanceApi.reducer,
  [payTRapi.reducerPath]: payTRapi.reducer,
  [productCodesApi.reducerPath]: productCodesApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(myOrdersApi.middleware)
      .concat(newsApi.middleware)
      .concat(weightBalanceApi.middleware)
      .concat(productCodesApi.middleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

export { store, persistor };
