import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  IndexStartupContainer,
  SignInContainer,
  SignUpContainer,
  ForgotpasswordContainer,
  AzericardPaymentContainer,
  SelectPackageContainer,
  PayTRPaymentContainer,
} from 'containers';
import { getToken, removeToken } from 'helpers/AsyncStorage';
import { safeAwait } from 'helpers/safeAwait';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, restoreToken, selectAuth } from 'store/Auth';
import { useTheme } from 'theme';
import AsyncStorage from '@react-native-community/async-storage';
import { configureResponseInterceptor } from 'utils/Api';
import MainNavigator from './Main';
import { navigationRef } from './Root';
import { stackNavigatorScreenOptions } from './styles';
import PayTRNavigator from './PayTR';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const Stack = createNativeStackNavigator();

const nativeBaseColors = {
  primary: {
    50: '#E10600',
    100: '#E10600',
    200: '#E10600',
    300: '#E10600',
    400: '#E10600',
    500: '#E10600',
    600: '#E10600',
    700: '#E10600',
    800: '#E10600',
    900: '#E10600',
  },
  secondary: {
    50: 'rgba(255,255,255,0.05)',
    100: 'rgba(255,255,255,0.1)',
    200: 'rgba(255,255,255,0.2)',
    300: 'rgba(255,255,255,0.3)',
    400: 'rgba(255,255,255,0.4)',
    500: 'rgba(255,255,255,0.6)',
    600: 'rgba(255,255,255,0.7)',
    700: 'rgba(255,255,255,0.8)',
    800: 'rgba(255,255,255,0.9)',
    900: 'rgba(255,255,255,1)',
  },
  black: {
    50: 'rgba(0,0,0,0.05)',
    100: 'rgba(0,0,0,0.1)',
    200: 'rgba(0,0,0,0.2)',
    300: 'rgba(0,0,0,0.3)',
    400: 'rgba(0,0,0,0.4)',
    500: 'rgba(0,0,0,0.6)',
    600: 'rgba(0,0,0,0.7)',
    700: 'rgba(0,0,0,0.8)',
    800: 'rgba(0,0,0,0.9)',
    900: 'rgba(0,0,0,1)',
  },
  gray: {
    50: 'rgba(180, 180, 180, 0.05)',
    100: 'rgba(180, 180, 180, 0.1)',
    200: 'rgba(180, 180, 180, 0.2)',
    300: 'rgba(180, 180, 180, 0.3)',
    400: 'rgba(180, 180, 180, 0.4)',
    500: 'rgba(180, 180, 180, 0.6)',
    600: 'rgba(180, 180, 180, 0.7)',
    700: 'rgba(180, 180, 180, 0.8)',
    800: 'rgba(180, 180, 180, 0.9)',
    900: 'rgba(180, 180, 180, 1)',
  },
  secondaryGray: {
    50: '#E5E5E5',
    100: '#E5E5E5',
    200: '#E5E5E5',
    300: '#E5E5E5',
    400: '#E5E5E5',
    500: '#E5E5E5',
    600: '#E5E5E5',
    700: '#E5E5E5',
    800: '#E5E5E5',
    900: '#E5E5E5',
  },
  green: {
    50: '#04C600',
    100: '#04C600',
    200: '#04C600',
    300: '#04C600',
    400: '#04C600',
    500: '#04C600',
    600: '#04C600',
    700: '#04C600',
    800: '#04C600',
    900: '#04C600',
  },
};
const fontConfig = {
  Poppins: {
    100: {
      normal: 'Poppins-Light',
      italic: 'Poppins-LightItalic',
    },
    200: {
      normal: 'Poppins-Light',
      italic: 'Poppins-LightItalic',
    },
    300: {
      normal: 'Poppins-Light',
      italic: 'Poppins-LightItalic',
    },
    400: {
      normal: 'Poppins-Regular',
      italic: 'Poppins-Italic',
    },
    500: {
      normal: 'Poppins-Medium',
    },
    600: {
      normal: 'Poppins-Medium',
      italic: 'Poppins-MediumItalic',
    },
    700: {
      normal: 'Poppins-Bold',
      italic: 'Poppins-BoldItalic',
    },
    800: {
      normal: 'Poppins-Bold',
      italic: 'Poppins-BoldItalic',
    },
    900: {
      normal: 'Poppins-Bold',
      italic: 'Poppins-BoldItalic',
    },
  },
};

const nativeBaseTheme = extendTheme({
  colors: nativeBaseColors,
  fontConfig,

  components: {
    // Toast: {
    //   baseStyle: {},
    //   defaultProps: {},
    //   variants: {},
    //   sizes: {},
    // },
    Container: {
      baseStyle: {
        px: 4,
        maxWidth: '100%',
      },
    },
    FlatList: {
      defaultProps: {
        showsVerticalScrollIndicator: false,
      },
    },
    ScrollView: {
      defaultProps: {
        showsVerticalScrollIndicator: false,
      },
    },
    Button: {
      // Can simply pass default props to change default behaviour of components.
      defaultProps: {},
    },
    Input: {},
    Heading: {
      // Can pass also function, giving you access theming tools
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'red.300' : 'blue.300',
        fontWeight: 'normal',
      }),
    },
  },
  // radii: {
  //   none: 0,
  //   sm: 0,
  //   md: 0,
  //   lg: 4,
  //   pill: 0,
  //   full: 0,
  // },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});

const ApplicationNavigator = () => {
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  const dispatch = useDispatch();
  const { NavigationTheme } = useTheme();

  const { userToken } = useSelector(selectAuth);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const [error, token] = await safeAwait(getToken());
      if (!error) {
        dispatch(restoreToken(token));
      }
      setIsApplicationLoaded(true);
    };

    bootstrapAsync();
  }, [dispatch]);

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false);
    },
    []
  );

  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const routeNameRef = useRef();

  const restoreNavigationState = useCallback(async () => {
    try {
      // Only restore state if there's no deep link and we're not on web
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const newState = savedStateString
        ? JSON.parse(savedStateString)
        : undefined;

      if (newState !== undefined) {
        setInitialNavigationState(newState);
        await dispatch(fetchUser());
      }
    } finally {
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    const onUnauthorized = () => {};
    configureResponseInterceptor(onUnauthorized);
  }, []);

  useEffect(() => {
    if (__DEV__) {
      // restoreNavigationState();
    }
  }, [restoreNavigationState]);

  const onNavigationStateChange = useCallback(async newState => {
    const previousRouteName = routeNameRef.current;
    const { name: currentRouteName, params } =
      navigationRef.current.getCurrentRoute();

    // if (previousRouteName !== currentRouteName) {
    //   Intercom.logEvent('viewed_screen', {
    //     name: currentRouteName,
    //   });
    // }
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(newState));
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
          theme={NavigationTheme}
          ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              ...stackNavigatorScreenOptions,
              headerShown: false,
            }}>
            <Stack.Group screenOptions={{ animation: 'fade' }}>
              <Stack.Screen name="Startup" component={IndexStartupContainer} />
            </Stack.Group>
            {isApplicationLoaded && userToken === null && (
              <Stack.Group>
                <Stack.Screen name="SignIn" component={SignInContainer} />
                <Stack.Screen name="SignUp" component={SignUpContainer} />
                <Stack.Screen name="Forgotpassword" component={ForgotpasswordContainer} />

              </Stack.Group>
            )}
            {isApplicationLoaded && userToken !== null && (
              <Stack.Group>
                <Stack.Screen name="Main" component={MainNavigator} />
              </Stack.Group>
            )}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                name="AzericardPayment"
                component={AzericardPaymentContainer}
              />
              <Stack.Screen name="PayTR" component={PayTRNavigator} />
              <Stack.Screen
                name="SelectPackage"
                component={SelectPackageContainer}
                options={{ headerShown: true }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
