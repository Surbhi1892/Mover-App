import axios from 'axios';
import Toast from 'react-native-toast-message';
import {
    getCustomsRefreshToken,
    getCustomsToken,
    saveCustomsRefreshToken,
    saveCustomsToken,
} from 'helpers/AsyncStorage';
import Config from 'react-native-config';
import {Platform} from 'react-native';

export const API_ROUTES = {
    goodsGroups: 'v1/dictionaries/sbGoodsGroups',
    declareCommerce: 'v2/ECommerceDeclar/addDeclaration',
    user: 'v1/user',
    dictionariesList: 'v1/dictionaries/list',
    isValidTracking: 'v2/ECommerceDeclar/isValidTracking',
    refreshToken: 'v1/user/refresh',
};

const ApiCustoms = axios.create({
    baseURL: 'https://c2b-fbusiness.customs.gov.az:7541/api/',
    timeout: 32000,
    validateStatus: (status) => status > 199 && status < 499,
});

export const postRefreshToken = async () => {
    let responseData;
    try {
        const refreshToken = await getCustomsRefreshToken();
        const response = await ApiCustoms.post(API_ROUTES.refreshToken, {
            refreshToken,
        });
        const {code, token, refreshToken: newRefreshToken} = response.data;
        if (code === 200) {
            await saveCustomsToken(token);
            await saveCustomsRefreshToken(newRefreshToken);
        }
    } catch (error) {}
    return responseData;
};
export const configureResponseInterceptorCustoms = (
    onUnauthorized = () => {}
) => {
    ApiCustoms.interceptors.response.use(
        async (response) =>
            // const {status} = response.data;
            // if (status) {
            //   if (response.status === 401 && response.config.url !== 'login') {
            //     const {token, status: refreshStatus} = await refreshToken();
            //     await removeToken();
            //     if (refreshStatus) {
            //       response.config.headers.Authorization = `Bearer ${token}`;
            //       ApiCustoms.request(response.config);
            //       return Promise.reject(response);
            //     }
            //     onUnauthorized();
            //     return Promise.reject(response);
            //   }
            response,
        // }
        async (error) => {
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

            Toast.show({
                type: 'error',
                text1: message,
            });

            console.log(error.response);
            return Promise.reject(error);
        }
    );
};

export function createFormData(data) {
    if (typeof data === 'object') {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return formData;
    }
}

const authNotRequiredPaths = ['user/login', 'v1/dictionaries/list'];

ApiCustoms.interceptors.request.use(async (config) => {
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers.cfrv = '2I@uiN8*!*wU13t&2aPr!@#St57wt*#@a';
    // config.headers.requestSource = Platform.OS === 'ios' ? 'Ios' : 'Android';
    config.headers.requestSource = 'Ios';
    config.headers.lang = 'az';

    if (!authNotRequiredPaths.includes(config.url)) {
        const token = await getCustomsToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default ApiCustoms;
