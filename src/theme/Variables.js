/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  lightGray: '#787878',
  primaryRed: '#E10600',
  secondaryGray: '#E5E5E5',
  white: '#FFFFFF',
};

export const NavigationColors = {
  primary: Colors.primaryRed,
  background: Colors.white,
  text: Colors.primaryRed,
};

// text: '',
// background: '',
// border: '',
// card: '',
// notification: '',
// primary: ''

/**
 * FontSize
 */
export const FontSize = {
  smallest: 13,
  small: 16,
  regular: 20,
  large: 40,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};
