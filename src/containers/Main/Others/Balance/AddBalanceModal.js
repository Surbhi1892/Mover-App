import { PAYMENT_TYPES } from 'containers/Main/AzericardPayment';
import { PAY_TR_PAYMENT_TYPES } from 'containers/Main/PayTRPayment';
import { Button, FormControl, Input, Modal, Text } from 'native-base';
import { navigateToAzericardPayment, navigateToPayTR } from 'navigators/Root';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const AddBalanceModal = ({ disclose }) => {
  const { t } = useTranslation();

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = useCallback(
    async formValues => {
      const { amount } = formValues;
      navigateToPayTR({
        amount,
        paymentType: PAY_TR_PAYMENT_TYPES.balance,
      });
      return;
      navigateToAzericardPayment({
        paymentType: PAYMENT_TYPES.balance,
        amount: {
          card: amount,
        },
      });
      disclose.onClose();
    },
    [disclose]
  );

  const onPressAddBalance = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <Modal {...disclose} size="xl" avoidKeyboard>
      <Modal.Content backgroundColor="white">
        <Modal.Body p="5">
          <Text fontSize="md" fontWeight="bold">
            Dollar balans artımı
          </Text>
          <Text fontSize="11px">
            Yalnız kargo ödənişləri üçün nəzərdə tutulmuşdur
          </Text>
          <FormControl mt="10" isRequired isInvalid={'amount' in errors}>
            <Controller
              name="amount"
              rules={{ required: t('validation.required') }}
              control={control}
              defaultValue=""
              render={({ value, onBlur, onChange }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  autoFocus
                  placeholder="Məbləğ daxil edin"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  name="amount"
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.amount?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer backgroundColor="white">
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={disclose.onClose}>
              {t('common.cancel')}
            </Button>
            <Button onPress={onPressAddBalance}>Balansı artır</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddBalanceModal;
