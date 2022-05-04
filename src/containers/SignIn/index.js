import { useNavigation } from '@react-navigation/native';
import { Input, Brand } from 'components';
import {
  Box,
  Button,
  FormControl,
  KeyboardAvoidingView,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, signIn } from 'store/Auth';
import { useTheme } from 'theme';

const EMAIL_INPUT = 'email';
const PASSWORD_INPUT = 'password';

const SignInContainer = () => {
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm();

  const { singingIn } = useSelector(selectAuth);

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onPressForgotPassword =()=>{
    navigation.navigate('Forgotpassword')
  }

  const onSubmit = data => {
    dispatch(signIn(data));
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Box
        p={6}
        safeArea
        flex={1}
        alignItems="center">
        <Box alignItems="center">
          <Brand width={152} height={21} color={Colors.primaryRed} />
          <Text fontWeight={600} fontSize={24} mt={25}>
            {t('common.signIn')}
          </Text>
        </Box>
        <Box width="100%" flex={1} justifyContent="center">
          <FormControl mb={6} isRequired isInvalid={EMAIL_INPUT in errors}>
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
                  name={EMAIL_INPUT}
                  autoCompleteType="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
              name={EMAIL_INPUT}
              rules={{ required: 'Field is required', minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors[EMAIL_INPUT]?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mb={6} isRequired isInvalid={PASSWORD_INPUT in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              render={({ value, onBlur, onChange }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  fontSize="sm"
                  height={58}
                  name={PASSWORD_INPUT}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  keyboardType="default"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name={PASSWORD_INPUT}
              rules={{ required: t('validation.required'), minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors[PASSWORD_INPUT]?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Pressable   onPress={onPressForgotPassword}>
          <Text underline color={"red.600"} >{t('common.forgot_password')}</Text>
        </Pressable>

        </Box>
        
        <Box width="100%" mt={6}>
          <Button isLoading={singingIn} onPress={handleSubmit(onSubmit)}>
            {t('common.signIn')}
          </Button>
        </Box>
        <Pressable mt={6} onPress={onPressSignUp}>
          <Text>{t('common.signUp')}</Text>
        </Pressable>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignInContainer;
