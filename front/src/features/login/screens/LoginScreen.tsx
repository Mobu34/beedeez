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
      <StyledView>
        <Button
          color={
            loginMode === LoginMode.SignIn ? Color.Primary : Color.Tertiary
          }
          onPress={() => setLoginMode(LoginMode.SignIn)}>
          Connexion
        </Button>
        <Spacing horizontal={10} />
        <Button
          color={
            loginMode === LoginMode.SignUp ? Color.Primary : Color.Tertiary
          }
          onPress={() => setLoginMode(LoginMode.SignUp)}>
          Inscription
        </Button>
      </StyledView>

      <Wrapper marginVertical={20}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Veuillez entrer votre adresse mail"
              placeholder="Email"
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
              label="Veuillez entrer votre mot de passe"
              placeholder="Mot de passe"
              value={value}
              onChange={text => {
                onChange(text);
                resetStatus();
              }}
            />
          )}
        />

        <StyledViewError>
          {status === Status.Rejected && (
            <Text.Regular color="red" textAlign="center">
              Une erreur est survenue
            </Text.Regular>
          )}
        </StyledViewError>
      </Wrapper>
      <Button onPress={handleSubmit(onSubmit)} color={Color.Secondary}>
        {loginMode === LoginMode.SignIn ? 'Je me connecte' : "Je m'inscris"}
      </Button>
      <RabbitAnimation />
    </Wrapper>
  );
};

export default LoginScreen;

const StyledView = styled.View`
  flex-direction: row;
`;

const StyledViewError = styled.View`
  height: 20px;
  justify-content: center;
  width: auto;
`;
