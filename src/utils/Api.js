import axios from 'axios';
import Toast from 'react-native-toast-message';
import { getToken, removeToken, saveToken } from 'helpers/AsyncStorage';
import Config from 'react-native-config';

export const { API_URL, IMAGE_URL } = Config;

export const API_ROUTES = {
  loginAs: 'login-for-mover-app',
  login: 'login',
  register: 'register',
  register_v2: 'v2/register',
  addresses: 'addresses',
  me: 'me',
  orders: 'orders',
  deliveries: 'deliveries',
  types: 'types',
  countries: 'countries',
  currencies: 'currencies',
  myOrderStatuses: 'user-statuses',
  myOrders: 'myorders',
  news: 'news',
  tasks: 'tasks',
  offices: 'offices',
  paymentPay: 'payment/pay',
  payTRpay: 'payment/paytr/pay',
  payTRCards: 'payment/paytr/cards',
  payTRCardDelete: 'payment/paytr/card/delete',
  posts: 'posts',
  bonusAndReferral: 'bonus-and-referral',
  notPaidOrders: 'not-paid-orders',
  updateAddress: 'update-address',
  updateGeneralInfo: 'update-general-information',
  updatePassword: 'update-password',
  paymentHistory: 'user/payment-histories',
  notifications: 'user/notification',
  recomended: 'recomended',
  courier: 'courier',
  courierRequests: 'courier/list',
  courierOrders: 'courier/orders',
  regions: 'region/list',
  orderStatus: 'status',
  specification: 'specification',
  courierCalculate: 'courier/calculate',
  courierCancel: 'courier/cancel',
  requestOtp: 'password-reset/request-otp',
  existsOtp: 'password-reset/exists-otp',
  passwordReset: 'password-reset',
  resendEmail: 'auth/email/resend',
  refreshToken: 'auth/refresh-token',
  lastMonth: 'last-month',
  queueCheck: 'queue/check',
  updateInformationFromAsan: 'user/update-information-from-asan-login',
  taskSubjects: 'tasks/subjects',
  sendableOrders: 'sendable-orders',
  orderImage: 'myorders/link/image',
  requestBroker: 'requestBroker',
  cancelBroker: 'cancelBroker',
  addMissingOrder: 'addMissing',
  addReturnOrder: 'orders/addReturn',
  returnReasonStatus: 'reasonStatus',
  unReturnOrder: 'unReturnOrder',
  logout: 'logout',
  dashboardData: 'dashboard/data',
  externalCountries: 'international/countries',
  addAddress: 'user/add-address',
  updateExternalAddress: 'user/update/address',
  deleteExternalAddress: 'user/delete-address',
  returnRequirement: 'return-requirement/list',
  moverkartAccounts: 'payment/mover-card/accounts',
  moverkartLoginUrl: 'payment/mover-card/get-login-url',
  planningSending: 'planningSending',
  internationalOrders: 'international/parcels',
  internationalOrdersDelivery: 'international/parcels/delivery',
  createImageRequest: 'image-request-multiple',
  imageCreateReturn: 'orders/image-create-return-from-image',
  updateSpecification: 'update-specification',
  specificationList: 'specification-list',
  weightTransactions: 'bonus/packages/transactions',
  weightBalance: 'bonus/packages/balance',
  weightPackages: 'bonus/packages',
  stories: 'story',
  addInsurance: 'addInsurance',
  addReturnFromDelivered: 'addReturnFromDelivered',
  checkEmail: 'password-reset/find-user',
  bildir: 'reviews/create',
  updateDevice: 'user/update-device',
  reviewCheck: 'v2/reviews/check',
  createReview: 'v2/reviews/gifts',
  paymentCalculateOperation: 'payment/calculate-operation',
};

const Api = axios.create({
  baseURL: API_URL,
  timeout: 32000,
  validateStatus: status => status > 199 && status < 499,
});

export const refreshToken = async () => {
  let newToken;
  try {
    const response = await Api.get(API_ROUTES.refreshToken);
    const { success, token } = response.data;
    if (success) {
      newToken = token;
      await saveToken(token);
    }
  } catch (error) {}
  return newToken;
};

export const configureResponseInterceptor = (onUnauthorized = () => {}) => {
  const interceptor = Api.interceptors.response.use(
    async response => {
      if (response.status === 401 && response.config.url !== 'login') {
        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        Api.interceptors.response.eject(interceptor);

        return Api.get(API_ROUTES.refreshToken)
          .then(async responseRefreshToken => {
            const { success, token } = responseRefreshToken.data;
            if (success) {
              await saveToken(token);
              response.config.headers.Authorization = `Bearer ${response.data.access_token}`;
              return axios(response.config);
            }
            await removeToken();
            onUnauthorized();
          })
          .catch(async error => {
            await removeToken();
            onUnauthorized();
            return Promise.reject(error);
          })
          .finally(configureResponseInterceptor);
      }

      const { status, message } = response.data;

      // if (!status) {
      //     Toast.show({
      //         text1: message,
      //         type: 'error',
      //     });
      //     return Promise.reject(response);
      // }

      return response;
    },
    async error => {
      let message = '';
      if (error?.response) {
        if (error?.response?.data?.message) {
          const parsedMessage = error?.response?.data?.message;
          message =
            typeof parsedMessage === 'string'
              ? parsedMessage
              : JSON.stringify(error?.response?.data?.message);
        } else {
          message = 'Bilinməyən xəta!';
        }
      } else if (error?.request) {
        message = 'Zəhmət olmasa internet əlaqəsini yoxlayın';
      } else {
        message = 'Network error';
      }

      // Toast.show({
      //   type: 'error',
      //   text1: message,
      // });
      return Promise.reject(error);
    }
  );
};

export function createFormData(data) {
  if (typeof data === 'object') {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return formData;
  }
}

const authNotRequiredPaths = [
  'login',
  'forget',
  'register',
  'send_reset_code',
  'check_reset_code',
  'reset_password',
];

Api.interceptors.request.use(async config => {
  config.headers.Accept = 'application/json';
  config.headers.from = 'mobile';
  if (!authNotRequiredPaths.includes(config.url)) {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
