import React, { useState } from 'react';
import {
  Button,
  Container,
  Input,
  Spacing,
  Wrapper,
} from '../../../components';
import { styled } from 'styled-components/native';
import { LoginMode } from '../enums';
import { Color } from '../../../enums';
import { signUp } from '../../user/userThunk';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { IFormData } from '../types';
import { useAppSelector } from '../../../hooks';
import { Status } from '../../../services/axios/enum';

const DEFAULT_FORM_VALUES = { email: '', password: '' };

const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(LoginMode.SIGN_UP);

  const { status } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = (data: IFormData) => {
    if (loginMode === LoginMode.SIGN_UP) {
      dispatch(signUp(data));
    } else {
      // dispatch();
    }
  };

  if (status === Status.Rejected) {
    alert('Oups! Something wrong happened');
  }

  return (
    <Container justifyContent="center" alignItems="center">
      <StyledView>
        <Button
          color={
            loginMode === LoginMode.SIGN_IN ? Color.PRIMARY : Color.SECONDARY
          }
          onPress={() => setLoginMode(LoginMode.SIGN_IN)}>
          Connexion
        </Button>
        <Spacing horizontal={10} />
        <Button
          color={
            loginMode === LoginMode.SIGN_UP ? Color.PRIMARY : Color.SECONDARY
          }
          onPress={() => setLoginMode(LoginMode.SIGN_UP)}>
          Inscription
        </Button>
      </StyledView>

      <Wrapper vertical={20}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Veuillez entrer votre adresse mail"
              placeholder="Email"
              value={value}
              onChange={onChange}
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
              onChange={onChange}
            />
          )}
        />
      </Wrapper>
      <Button onPress={handleSubmit(onSubmit)}>
        {loginMode === LoginMode.SIGN_IN ? 'Je me connecte' : "Je m'inscris"}
      </Button>
    </Container>
  );
};

export default LoginScreen;

const StyledView = styled.View`
  flex-direction: row;
`;
