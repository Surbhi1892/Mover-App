import React, { useMemo } from 'react';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({ animatedIndex, style, name }) => {
  // animated variables

  const { dismiss } = useBottomSheetModal();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      containerAnimatedStyle,
      {
        backgroundColor: '#00000033',
      },
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <AnimatedPressable onPress={() => dismiss(name)} style={containerStyle} />
  );
};

export default CustomBackdrop;
