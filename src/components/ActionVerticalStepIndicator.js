import { Box, Center, HStack, Text, VStack } from 'native-base';

import React, { useCallback, useState, useLayoutEffect } from 'react';
// import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome';

const ActionVerticalStepIndicator = ({ steps, delivery }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const labels = [
    'Sifariş Verilib',
    'Xarici Anbarda',
    'Yolda',
    'Çatıb',
    'Təhvil verildi',
  ];

  useLayoutEffect(() => {
    console.log("step", delivery)
    const getCurrentDelivery = () => {
      switch (delivery) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 3:
          return 2;
        case 4:
          return 3;
        case 5:
          return 4;
        case 6:
          return 5;
        default:
          return 0;
      }
    };
    const currentDeliveryIndex = getCurrentDelivery();
    setCurrentStep(currentDeliveryIndex);
  }, [delivery]);

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
              width="2px"
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

  const renderIndicatorDot2 = useCallback(
    (step, index) => {
      console.log("undex", index + "  " + labels.length)
      const isPreviousStep = currentStep >= index;
      const isCurrentStep = currentStep === index;
      const currentSize = isCurrentStep ? 15 : 1;
      const borderWidth = isCurrentStep ? 1 : 0;
      const lineHeight = isCurrentStep ? '10px' : '12px';
      const currentStepColor = isPreviousStep ? '#E10600' : '#a6a6a6';
      const isFirst = index === 0;
      const isLast = index === steps.length;
      return (
        <Box marginLeft='2%' width={"100%"}>
          <HStack>
            <Text style={{ fontSize: 13, paddingRight: 10, alignItems: "center" }}>{'İyn '}</Text>
            <VStack alignItems={'center'}>
              <Icon
                name={isCurrentStep ? "dot-circle-o" : "circle"}
                style={{
                  alignSelf: 'center',
                  textAlign: "center",
                  color: !isCurrentStep ? currentStepColor : '#E10600',
                  fontSize: isCurrentStep ? 14 : 13,
                }}
              />
              {labels.length == (index + 1) ?
                <Text ></Text>
                :
                <Box
                  height={50}
                  width={0.5}
                  backgroundColor={!isCurrentStep ? currentStepColor : '#a6a6a6'} />
              }

            </VStack>
            <Text style={{ fontSize: 13, paddingLeft: 10 }}>
              {labels[index]}
            </Text>
          </HStack>
        </Box>
      );
    },
    [currentStep]
  );

  const renderLeftLabel = useCallback(
    (step, index) => (
      <Box>
        <Text style={{ fontSize: 12 }}>{steps[index].title}</Text>
      </Box>
    ),
    []
  );

  const renderIndicator = useCallback(
    (step, index) => <HStack>{renderIndicatorDot2(step, index)}</HStack>,
    [currentStep]
  );

  const renderStep = useCallback(
    (step, index) => (
      <HStack key={index} >
        {renderIndicator(step, index)}
        {/* {renderLeftLabel(step, index)} */}
      </HStack>
    ),
    [(steps, currentStep)]
  );

  return (
    <Box marginTop="20px">
      <VStack>{labels.map(renderStep)}</VStack>
    </Box>
  );
};

export default ActionVerticalStepIndicator;
