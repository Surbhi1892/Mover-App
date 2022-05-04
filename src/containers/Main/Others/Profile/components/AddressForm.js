import {
  Actionsheet,
  FormControl,
  Input,
  ScrollView,
  useDisclose,
  VStack,
} from 'native-base';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/Auth';
import {
  fetchPostOffices,
  selectAllPostOffices,
  selectPostOfficeById,
} from 'store/PostOffices';

const ADDRESS_INPUT = 'address';

const AddressForm = ({ isEditing }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile } = useSelector(selectAuth);
  const offices = useSelector(selectAllPostOffices);

  useLayoutEffect(() => {
    dispatch(fetchPostOffices());
  }, []);

  const { office_id } = profile;

  const [selectedOfficeId, setSelectedOfficeId] = useState(office_id);

  const userOffice = useSelector(state =>
    selectPostOfficeById(state, selectedOfficeId)
  );

  const { control, errors } = useForm({
    defaultValues: {},
  });

  const actionSheetDisclose = useDisclose();

  const onChangeOffice = useCallback(officeId => {
    actionSheetDisclose.onClose();
    setSelectedOfficeId(officeId);
  }, []);

  return (
    <VStack space={4} mt={5} width="100%">
      <FormControl isRequired isInvalid={ADDRESS_INPUT in errors}>
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
              placeholder={t('common.address')}
              fontSize="sm"
              height="40px"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name={ADDRESS_INPUT}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors[ADDRESS_INPUT]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Pressable disabled={!isEditing} onPress={actionSheetDisclose.onOpen}>
        <Input
          pointerEvents="none"
          editable={false}
          value={userOffice?.office_name}
        />
      </Pressable>
      <Actionsheet {...actionSheetDisclose}>
        <Actionsheet.Content>
          <ScrollView>
            {offices.map(office => (
              <Actionsheet.Item
                key={office.id}
                onPress={() => onChangeOffice(office.id)}>
                {office.office_name}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default AddressForm;
