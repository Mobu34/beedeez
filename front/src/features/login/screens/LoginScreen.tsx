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

const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(LoginMode.SIGN_UP);

  const dispatch = useAppDispatch();

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
        <Input label="Veuillez entrer votre email" placeholder="Email" />
        <Spacing vertical={8} />
        <Input
          label="Veuillez entrer votre mot de passe"
          placeholder="Mot de passe"
        />
      </Wrapper>
      <Button onPress={() => dispatch(signUp())}>
        {loginMode === LoginMode.SIGN_IN ? 'Je me connecte' : "Je m'inscris"}
      </Button>
    </Container>
  );
};

export default LoginScreen;

const StyledView = styled.View`
  flex-direction: row;
`;
