import { HStack, Text, VStack } from 'native-base';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import StepIndicator from './StepIndicator';

const steps = [
  'Sifariş verilib',
  'Xarici Anbarda',
  'Yolda',
  'Çatıb',
  'Təhvil verildi',
];

const OrderItemDeliverySteps = ({ fromCountry, toCountry, delivery }) => {
  const [currentStep, setCurrentStep] = useState(0);
  // console.log("step",fromCountry+"  toCountry "+toCountry+ "delivery "+delivery+" ")
  useLayoutEffect(() => {
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

  return (
    <VStack>
      <HStack mt={6} mb={2} justifyContent="space-between">
        <Text fontSize={10} lineHeight="15px" color="white" fontWeight="300">
          {fromCountry}
        </Text>
        <Text fontSize={10} lineHeight="15px" color="white" fontWeight="300">
          {toCountry}
        </Text>
      </HStack>
      {useMemo(
        () => (
          <StepIndicator steps={steps} currentStep={currentStep} />
        ),
        [currentStep]
      )}
    </VStack>
  );
};

export default OrderItemDeliverySteps;
