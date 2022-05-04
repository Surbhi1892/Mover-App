module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [
        'react-native-paper/babel',
        'transform-remove-console',
        'react-native-reanimated/plugin',
      ],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
