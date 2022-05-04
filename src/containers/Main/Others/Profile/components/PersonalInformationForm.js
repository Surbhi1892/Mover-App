import {
  Actionsheet,
  Box,
  Button,
  ChevronDownIcon,
  FormControl,
  HStack,
  Input,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/Auth';

// INPUT CONSTANTS

const NAME_INPUT = 'name';
const SURNAME_INPUT = 'surname';
const PHONE = 'mobile';
const ID_CARD_NO = 'id_card';
const FIN = 'fin';
const BIRTHDAY = 'bday';

const PHONE_PREFIXES = ['050', '051', '055', '070', '077', '099'];

const PersonalInformationForm = ({ isEditing }) => {
  const { t } = useTranslation();
  const { profile } = useSelector(selectAuth);

  const {
    name: nameUser,
    surname,
    fin,
    sex,
    mobile,
    address,
    id_card,
    bday,
  } = profile;

  const [phonePrefix, setPhonePrefix] = useState('');

  const { control, errors } = useForm({
    defaultValues: {
      name: nameUser,
      surname,
      fin,
      mobile,
      id_card,
      bday,
    },
  });

  const actionSheetDisclose = useDisclose();

  const onPressPhonePrefix = useCallback(
    () => actionSheetDisclose.onOpen(),
    []
  );

  const onSelectPrefix = useCallback(prefix => {
    actionSheetDisclose.onClose();
    setPhonePrefix(prefix);
  }, []);

  const PhoneInputLeft = (
    <Button
      onPress={onPressPhonePrefix}
      variant="ghost"
      size="xs"
      m="1"
      mr="0"
      p={0}
      pl="1"
      rightIcon={<ChevronDownIcon size={4} />}>
      {phonePrefix}
    </Button>
  );

  return (
    <VStack space={4} mt={5} width="100%">
      <FormControl isRequired isInvalid={NAME_INPUT in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.name')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={NAME_INPUT}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[NAME_INPUT]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={SURNAME_INPUT in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.surname')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={SURNAME_INPUT}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[SURNAME_INPUT]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={PHONE in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.phone')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              InputLeftElement={PhoneInputLeft}
            />
          )}
          name={PHONE}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[PHONE]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={PHONE in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.birthday')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={BIRTHDAY}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[PHONE]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={ID_CARD_NO in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.idCardNo')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={ID_CARD_NO}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[ID_CARD_NO]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={FIN in errors}>
        <Controller
          control={control}
          render={({ value, onBlur, onChange, name, ref }) => (
            <Input
              editable={isEditing}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              name={name}
              placeholder={t('common.finCode')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={FIN}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[FIN]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Actionsheet {...actionSheetDisclose}>
        <Actionsheet.Content>
          {PHONE_PREFIXES.map(prefix => (
            <Actionsheet.Item onPress={() => onSelectPrefix(prefix)}>
              {prefix}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default PersonalInformationForm;
