import { BlurView } from '@react-native-community/blur';
import { Box } from 'native-base';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const SheetBlurBackground = () => (
  <View style={styles.container}>
    <BlurView
      blurType={Platform.OS === 'ios' ? 'chromeMaterial' : 'xlight'}
      style={styles.blurView}
    />
  </View>
);

const BORDER_RADIUS = 15;

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  androidContainer: {
    backgroundColor: 'rgba(255,255,255, 0.95)',
  },
});

export default SheetBlurBackground;
