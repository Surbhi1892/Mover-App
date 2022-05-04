import { Box, Center, HStack, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';

const VerticalStepIndicator = ({ steps = [], currentStep = 0 }) => {

  const renderIndicatorLabel = useCallback(
    ({ title }, index) => {
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
          {title}
        </Text>
      );
    },
    [currentStep]
  );

  const renderIndicatorDot = useCallback(
    (step, index) => {


      const isPreviousStep = currentStep >= index;
      const isCurrentStep = currentStep === index;
      const currentSize = isCurrentStep ? 15 : 1;
      const borderWidth = isCurrentStep ? 1 : 0;
      const lineHeight = isCurrentStep ? '10px' : '12px';
      const currentStepColor = isPreviousStep ? 'primary.100' : 'gray.200';
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;
      return (
        <VStack>
          {!isFirst && (
            <Box
              marginLeft="9px"
              width="1px"
              height={lineHeight}
              backgroundColor={!isCurrentStep ? currentStepColor : 'gray.100'}
            />
          )}
          <VStack
            alignItems="center"
            justifyContent="center"
            marginRight={2}
            height={currentSize}
            width={5}>
            <Center
              size={currentSize}
              borderRadius={currentSize * 2}
              borderWidth={borderWidth}
              borderColor={currentStepColor}>
              <Box
                size={2}
                borderRadius={2}
                backgroundColor={currentStepColor}
              />
            </Center>
          </VStack>
          {!isLast && (
            <Box
              marginLeft="9px"
              width="1px"
              height={lineHeight}
              backgroundColor={!isCurrentStep ? currentStepColor : 'gray.100'}
            />
          )}
        </VStack>
      );
    },
    [currentStep]
  );

  const renderLeftLabel = useCallback(

    (step, index) => (
      <Box>
        <Text style={{fontSize:12,}}>{steps[index].title}</Text>
      </Box>
    ),
    []
  );

  const renderIndicator = useCallback(
    (step, index) => <HStack>{renderIndicatorDot(step, index)}</HStack>,
    [currentStep]
  );

  const renderStep = useCallback(
    (step, index) => (
      <HStack  key={index} >
        {renderIndicator(step, index)}
        {renderLeftLabel(step,index)}
      </HStack>
    ),
    [(steps, currentStep)]
  );

  return (
    <Box>
      <VStack>{steps.map(renderStep)}</VStack>
    </Box>
  );
};

export default VerticalStepIndicator;
