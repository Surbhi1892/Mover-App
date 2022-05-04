import Toast from 'react-native-toast-message';
import { removeToken } from 'helpers/AsyncStorage';

export const middlewareConfig = {
    // not required, but use-full configuration option
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            ({ getState, dispatch }, config) =>
                // Request interception
                config,
        ],
        response: [
            {
                success: ({ dispatch }, response) => {
                    alert('test');
                    return response;
                },
                error: ({ dispatch }, error) =>
                    // Response Error Interception
                    Promise.reject(error),
            },
        ],
    },
};
