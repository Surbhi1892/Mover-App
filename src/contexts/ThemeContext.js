import React from 'react';
import {Appearance} from 'react-native-appearance';
import {getTheme} from 'utils/Theme';

// set default colour scheme from OS
const osTheme = Appearance.getColorScheme();

const ThemeContext = React.createContext({
  mode: osTheme,
  theme: getTheme(osTheme),
  toggle: () => {},
});

export default ThemeContext;
