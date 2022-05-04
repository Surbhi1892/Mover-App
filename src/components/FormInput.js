import { FormControl, Input } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({ name, errors, control, rules }) => {
  return (
    <FormControl isRequired isInvalid={name in errors}>
      <FormControl.Label>Email</FormControl.Label>
      <Controller
        control={control}
        render={({ value, onBlur, onChange }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            fontSize="sm"
            height={58}
            name={name}
            autoCompleteType="off"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
      <FormControl.ErrorMessage>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default FormInput;
