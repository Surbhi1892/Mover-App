/* eslint-disable no-unused-expressions */
import {CommonActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function navigateAndReset(routes = [], index = 0) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index,
            routes,
        })
    );
}

export function navigateAndSimpleReset(name, params, index = 0) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index,
            routes: [{name, params}],
        })
    );
}
