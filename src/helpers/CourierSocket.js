/* eslint-disable camelcase */
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {AppState} from 'react-native';
import {fetchUser} from '../actions/user';
import {getToken} from './AsyncStorage';
// import {useNetInfo} from '@react-native-community/netinfo';

// const SOCKET_PROTOCOL = 'http://';
const SOCKET_BASE_URL = '172.16.1.112';
const SOCKET_PORT = '5000';

const SOCKET_PROTOCOL = 'https://';
// const SOCKET_BASE_URL = 'dev.mover.az';
// const SOCKET_PORT = '5000';

const REMOTE_SOCKET_SERVER_URL = `${SOCKET_PROTOCOL}${SOCKET_BASE_URL}:${SOCKET_PORT}`;

export function useCourierSocket(courierId) {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocketState] = useState();

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    // const {isInternetReachable} = useNetInfo();
    const isInternetReachable = true;

    function handleConnectionChange(connect, reason) {
        setIsConnected(connect);
        console.log('socket: ', reason);
    }

    const connectToSocket = useCallback(() => {
        const newSocket = io(REMOTE_SOCKET_SERVER_URL, {
            transports: ['websocket'],
            // secure: true,
        });

        const authData = {
            isCourier: false,
            courierId,
        };
        newSocket.emit('authentication', authData);

        newSocket.on('authenticated', () => {
            console.log('connected');
            handleConnectionChange(true);
            setSocketState(newSocket);
            // setSocket(newSocket);
        });
        newSocket.on('disconnect', () =>
            handleConnectionChange(false, 'disconnect')
        );
        newSocket.on('connect_failed', (reason) =>
            handleConnectionChange(false, reason)
        );
        newSocket.on('connect_error', (reason) =>
            handleConnectionChange(false, JSON.stringify(reason))
        );
        newSocket.on('error', (reason) =>
            handleConnectionChange(false, reason)
        );
        return newSocket;
    }, [courierId]);

    const _handleAppStateChange = useCallback(
        (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                if (!isConnected) {
                    connectToSocket();
                }
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        },
        [connectToSocket, isConnected]
    );

    // useEffect(() => {
    //   AppState.addEventListener('change', _handleAppStateChange);
    //   return () => {
    //     AppState.removeEventListener('change', _handleAppStateChange);
    //   };
    // }, [_handleAppStateChange]);

    useEffect(() => {
        let newSocket = null;
        if (courierId !== null) {
            newSocket = connectToSocket();
        }
        return () => {
            if (newSocket !== null) {
                newSocket.disconnect();
            }
            // setSocket(null);
        };
    }, [isInternetReachable, appStateVisible, connectToSocket]);

    return {isConnected, socket};
}
