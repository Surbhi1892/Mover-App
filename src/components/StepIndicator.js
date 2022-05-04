import { Box, Center, HStack, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';

const StepIndicator = ({ steps = [], currentStep = 2 }) => {
  const renderIndicatorLabel = useCallback(
    (step, index) => {
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      const textAlignSelf =
        (isFirst && 'flex-start') || (isLast && 'flex-end') || 'center';
      const textAlign = (isFirst && 'left') || (isLast && 'right') || 'center';
      return (
        <Text
          minWidth="100px"
          numberOfLines={1}
          alignSelf={textAlignSelf}
          textAlign={textAlign}
          fontSize={10}
          lineHeight="15px"
          color="white"
          fontWeight="300">
          {step}
        </Text>
      );
    },
    [currentStep]
  );

  const renderIndicatorDot = useCallback(
    (step, index) => {
      const isPreviousStep = currentStep >= index;
      const isCurrentStep = currentStep === index;
      const currentSize = isCurrentStep ? 5 : 2;
      const borderWidth = isCurrentStep ? 1 : 0;
      const currentStepColor = isPreviousStep ? 'primary.100' : 'gray.100';
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      return (
        <HStack height={6} flex={2} alignItems="center">
          {!isFirst && (
            <Box
              flex={1}
              height="1px"
              backgroundColor={currentStepColor}
              alignSelf="center"
            />
          )}
          <Center
            size={currentSize}
            borderRadius={currentSize * 2}
            borderWidth={borderWidth}
            borderColor={currentStepColor}>
            <Box size={2} borderRadius={4} backgroundColor={currentStepColor} />
          </Center>
          {!isLast && (
            <Box
              flex={1}
              height="1px"
              backgroundColor={!isCurrentStep ? currentStepColor : 'gray.100'}
              alignSelf="center"
            />
          )}
        </HStack>
      );
    },
    [currentStep]
  );

  const renderIndicator = useCallback(
    (step, index) => {
      const isCurrentStep = currentStep === index;
      return (
        <VStack>
          {renderIndicatorDot(step, index)}
          {isCurrentStep && renderIndicatorLabel(step, index)}
        </VStack>
      );
    },
    [currentStep]
  );

  const renderStep = useCallback(
    (step, index) => {
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      return (
        <Box flex={isFirst || isLast ? 0.5 : 1.01} key={index}>
          {renderIndicator(step, index)}
        </Box>
      );
    },
    [steps, currentStep]
  );

  return (
    <Box flex={1}>
      <HStack flex={steps.length + 1}>{steps.map(renderStep)}</HStack>
    </Box>
  );
};

export default StepIndicator;
