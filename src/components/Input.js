import { Box, Input as NBInput, IInputProps } from 'native-base';
import React from 'react';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const Input = (props: IInputProps) => {
  const label = useSharedValue(0);
  const styleLabel = useAnimatedStyle(() => ({}));
  return (
    <Box>
      <NBInput {...props} />
    </Box>
  );
};

export default Input;
