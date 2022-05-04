import React from 'react';
import { VerticalStepIndicator } from 'components';
import moment from 'moment';

const custom_send = 0;
const planning_sending = '';

const moverDeclareDescription =
  (custom_send === 0 && 'BƏYAN EDİLMƏYİB') ||
  (custom_send === 1 && 'GÖZLƏMƏDƏ') ||
  (custom_send === 2 && 'BƏYAN EDİLİB');

const planningSendingText =
  planning_sending !== null
    ? `Planlanan göndəriş tarixi: ${moment(
        planning_sending?.sending_date
      ).format('DD.MM.YYYY')}`
    : null;

const orderSteps = [
  {
    title: 'Mover tərəfindən bəyan gözləyir',
    description: moverDeclareDescription,
    onPress: alert,
  },
  {
    title: 'SMART CUSTOMS ilə bəyan',
    // buttonLabel: 'Bəyan et',
    // onPress: onPressDeclareAtSmartCustoms,
    // buttonLabel: null,
    description: 'Bəyan gözləyir',
  },
  {
    title: 'Göndər',
    info: planningSendingText,
    buttonLabel: 'Göndər',
    // onPress: onPressSendOrder,
  },
];
const isSend = false;
const inBox = false;
const reg_number = '';
const isDeclaredByMover = custom_send === 2;
const isDeclaredSmartCustoms = reg_number !== null;

const activeStep = () => {
  let currentStep = 0;

  if (isDeclaredByMover) {
    currentStep = 1;

    if (isDeclaredSmartCustoms) {
      if (isSend || inBox) currentStep = 3;
      else currentStep = 2;
    }
  }

  return currentStep;
};

const OrderMainSteps = () => {
  const test = '';
  console.log("orderSteps",JSON.stringify(orderSteps))
  return <VerticalStepIndicator steps={orderSteps} />;
};

export default OrderMainSteps;
