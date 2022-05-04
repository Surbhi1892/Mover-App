import { safeAwait } from 'helpers/safeAwait';
import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  Modal,
  Select,
  Text,
} from 'native-base';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { orderReturnToSellerService } from 'services/Orders';
import {
  fetchReturnReasons,
  selectAllReturnReasons,
} from 'store/Orders/ReturnReasons';
import { fetchSingleOrder } from 'store/Orders/Single';

const OrderReturnToSellerSheet = ({ order, isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, country_id } = order;

  const returnReasons = useSelector(selectAllReturnReasons);

  useLayoutEffect(() => {
    dispatch(fetchReturnReasons());
  }, []);

  const { control, handleSubmit, errors } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const serviceAmount = country_id === 1 ? '1' : '5';

  const onSubmit = useCallback(
    async formValues => {
      setIsLoading(true);
      const { code, return_reason_id, description } = formValues;
      const payload = {
        order_id: id,
        code,
        return_reason_id,
        description,
      };
      const [error, data] = await safeAwait(
        orderReturnToSellerService(payload),
        () => {
          setIsLoading(false);
        }
      );
      const { status, message } = data;
      if (status) {
        dispatch(fetchSingleOrder({ id }));
      }
    },
    [dispatch, id]
  );

  return (
    <Modal
      avoidKeyboard
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}>
      <Modal.Content borderRadius={10} backgroundColor="white" size="xl" p={5}>
        <Modal.Header>{t('orderDetail.orderReturnToSeller')}</Modal.Header>
        <Modal.Body pt={4} padding={0} mb={8}>
          <Text>
            {t('orderDetail.orderReturnToSellerContent', {
              amount: serviceAmount,
            })}
          </Text>
          <FormControl mt={4} isRequired isInvalid={'code' in errors}>
            <FormControl.Label>
              {t('orderDetail.returnToSellerCode')}
            </FormControl.Label>
            <Controller
              name="code"
              rules={{ required: t('validation.required') }}
              control={control}
              defaultValue=""
              render={({ value, onBlur, onChange }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  name="code"
                  placeholder={t('orderDetail.enterReturnToSellerCode')}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.code?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            mt={4}
            isRequired
            isInvalid={'return_reason_id' in errors}>
            <FormControl.Label>{t('orderDetail.reason')}</FormControl.Label>
            <Controller
              name="return_reason_id"
              rules={{ required: t('validation.required') }}
              control={control}
              defaultValue=""
              render={({ value, onChange }) => (
                <Select
                  name="return_reason_id"
                  minWidth="200"
                  selectedValue={value}
                  onValueChange={onChange}
                  accessibilityLabel={t('orderDetail.enterReason')}
                  placeholder={t('orderDetail.enterReason')}
                  _selectedItem={{
                    bg: 'primary.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  _actionSheetContent={{ backgroundColor: 'white' }}
                  mt="1">
                  {returnReasons.map(({ id: itemId, name }) => (
                    <Select.Item mt={2} label={name} value={itemId} />
                  ))}
                </Select>
              )}
            />
            <FormControl.ErrorMessage>
              {errors.return_reason_id?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={'description' in errors}>
            <FormControl.Label>{t('common.description')}</FormControl.Label>
            <Controller
              name="description"
              rules={{ required: t('validation.required') }}
              control={control}
              defaultValue=""
              render={({ value, onBlur, onChange }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  name="description"
                  placeholder={t('common.enterDescription')}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.description?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Button.Group>
          <Button
            size="md"
            flex={1}
            variant="outline"
            colorScheme="blueGray"
            onPress={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            isLoading={isLoading}
            size="md"
            flex={1}
            onPress={handleSubmit(onSubmit)}>
            {t('common.confirm')}
          </Button>
        </Button.Group>
      </Modal.Content>
    </Modal>
  );
};

export default OrderReturnToSellerSheet;
