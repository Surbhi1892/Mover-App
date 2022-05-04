import Config from 'react-native-config';
import io from 'socket.io-client';
import {getToken} from './AsyncStorage';

let socket;

const {QUEUE_SOCKET_URL, QUEUE_SOCKET_PORT, QUEUE_SOCKET_TOKEN} = Config;

export const initiateSocket = () => {
    socket = io(`${QUEUE_SOCKET_URL}:${QUEUE_SOCKET_PORT}`, {
        query: {
            token: QUEUE_SOCKET_TOKEN,
        },
    });
    return socket;
};
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) {
        socket.disconnect();
    }
};
