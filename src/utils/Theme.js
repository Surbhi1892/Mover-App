import React from 'react';
import {DefaultTheme} from 'react-native-paper';
import MenuLeftButton from 'components/MenuLeftButton/MenuLeftButton';

const Theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#BE233B',
        secondary: '#00BC83',
        white: '#FFFFFF',
        textColor: '#707070',
        secondaryTextColor: '#2B2B2B',
        black: '#000000',
        background: '#e4e3e3',
    },
};

export default Theme;

export const defaultHeaderStyle = (theme) => ({
    headerStyle: {
        backgroundColor: theme.primary,
        shadowColor: theme.black,
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.24,
        shadowRadius: 2.5,
        elevation: 2,
    },
    headerTintColor: theme.white,
});

export const defaultLeftStyle = (theme) => ({
    // headerLeft: () => <MenuLeftButton theme={theme} />,
    headerLeftContainerStyle: {
        paddingLeft: 12,
    },
});

export const ThemeColors = {
    primary: {
        light: '#BE233B',
        dark: '#BE233B',
    },
    secondary: {
        light: '#00BC83',
        dark: '#00BC83',
    },
    white: {
        light: '#FFFFFF',
        dark: '#FFFFFF',
    },
    textColor: {
        light: '#707070',
        dark: '#707070',
    },
    secondaryTextColor: {
        light: '#2B2B2B',
        dark: '#2B2B2B',
    },
    black: {
        light: '#000000',
        dark: '#000000',
    },
    background: {
        light: '#e4e3e3',
        dark: '#e4e3e3',
    },
};

export const getTheme = (mode) => {
    const theme = {};
    Object.keys(ThemeColors).forEach((key) => {
        theme[key] = ThemeColors[key][mode];
    });
    return theme;
};
