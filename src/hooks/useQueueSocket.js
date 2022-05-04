/* eslint-disable camelcase */
import {useIsFocused} from '@react-navigation/native';
import {fetchQueueCheck} from 'actions/dashboard';
import {fetchUser} from 'actions/user';
import {disconnectSocket, initiateSocket} from 'helpers/QueueSocket';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';

const {QUEUE_SOCKET_URL} = Config;

export function useQueueSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState();
    const isFocused = useIsFocused();

    const user = useSelector((state) => state.user.user);
    const queue = useSelector((state) => state.dashboard.queue);
    const isLoadingQueue = useSelector((state) => state.dashboard.isLoading);
    const dispatch = useDispatch();

    const getInitialData = (officeId) => {
        fetch(`http://dev.mover.az/api/queue/monitor/${officeId}`);
    };

    useEffect(() => {
        if (isFocused) {
            if (!user) dispatch(fetchUser());
            if (!queue) dispatch(fetchQueueCheck());
        }
        // dispatch(fetchQueueCheck());
    }, []);

    useEffect(() => {
        console.log('queue: ', queue);
        if (!user || !queue) return;
        function handleConnectionChange(connect, reason) {
            setIsConnected(connect);
            console.log(reason);
        }

        const newSocket = initiateSocket();
        newSocket.on('connect', () => {
            const {office_id} = user;
            handleConnectionChange(true);
            getInitialData(office_id);
            newSocket.emit('monitor', office_id);
        });
        newSocket.on('disconnect', (reason) =>
            handleConnectionChange(false, reason)
        );
        newSocket.on('connect_failed', (reason) =>
            handleConnectionChange(false, reason)
        );
        newSocket.on('connect_error', (reason) =>
            handleConnectionChange(false, reason)
        );
        newSocket.on('error', (reason) =>
            handleConnectionChange(false, reason)
        );

        setSocket(newSocket);

        return () => {
            disconnectSocket();
            setIsConnected(false);
        };
    }, [user, queue, isFocused]);

    return {isConnected, socket, queue, isLoadingQueue};
}
