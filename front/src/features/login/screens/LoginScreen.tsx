import React, { useState } from 'react';
import {
  Button,
  Input,
  Spacing,
  Text,
  Title,
  Wrapper,
} from '../../../components';
import { styled } from 'styled-components/native';
import { LoginMode } from '../enums';
import { Color } from '../../../enums';
import { authentication } from '../../user/userThunk';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { IFormData } from '../types';
import { useAppSelector, useAuthentication } from '../../../hooks';
import { RequestStatus, Status } from '../../../services/axios/enum';
import { IAuthenticationOutput } from '../../user/types';
import { resetUserStatus } from '../../user/userSlice';
import { RabbitAnimation } from '../../../animations';
import { StyledViewRow } from '../../../styles';
import { fr } from '../../../locales';

const DEFAULT_FORM_VALUES = { email: '', password: '' };

const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(LoginMode.SignUp);

  const { status } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();

  useAuthentication();

  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = async (data: IFormData) => {
    const res = (await dispatch(authentication({ loginMode, ...data })))
      .payload as IAuthenticationOutput;
    if (res?.status === RequestStatus.Success) {
      reset();
    }
  };

  const resetStatus = () => {
    if (status === Status.Rejected) {
      dispatch(resetUserStatus());
    }
  };

  return (
    <Wrapper alignItems="center" flex={1}>
      <Spacing vertical={50} />
      <Title />
      <StyledViewRow>
        <Button
          color={
            loginMode === LoginMode.SignIn ? Color.Primary : Color.Tertiary
          }
          onPress={() => setLoginMode(LoginMode.SignIn)}>
          {fr.loginScreen.signIn}
        </Button>
        <Spacing horizontal={10} />
        <Button
          color={
            loginMode === LoginMode.SignUp ? Color.Primary : Color.Tertiary
          }
          onPress={() => setLoginMode(LoginMode.SignUp)}>
          {fr.loginScreen.signUp}
        </Button>
      </StyledViewRow>

      <Wrapper marginVertical={20}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Input
              label={fr.loginScreen.form.emailLabel}
              placeholder={fr.loginScreen.form.emailPlaceholder}
              value={value}
              onChange={text => {
                onChange(text);
                resetStatus();
              }}
            />
          )}
        />
        <Spacing vertical={8} />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Input
              label={fr.loginScreen.form.passwordLabel}
              placeholder={fr.loginScreen.form.passwordPlaceholder}
              value={value}
              onChange={text => {
                onChange(text);
                resetStatus();
              }}
              secureTextEntry={true}
            />
          )}
        />

        <StyledViewError>
          {status === Status.Rejected && (
            <Text.Regular color={Color.Danger} textAlign="center">
              {fr.loginScreen.form.error}
            </Text.Regular>
          )}
        </StyledViewError>
      </Wrapper>
      <Button onPress={handleSubmit(onSubmit)} color={Color.Secondary}>
        {loginMode === LoginMode.SignIn
          ? fr.loginScreen.form.signInButton
          : fr.loginScreen.form.signUpButton}
      </Button>
      <RabbitAnimation />
    </Wrapper>
  );
};

export default LoginScreen;

const StyledViewError = styled.View`
  height: 20px;
  justify-content: center;
  width: auto;
`;
