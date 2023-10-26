import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Spacing, Text, Wrapper } from '../../../components';
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
import { Animated, View, useWindowDimensions } from 'react-native';

const DEFAULT_FORM_VALUES = { email: '', password: '' };

const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(LoginMode.SIGN_UP);

  const animatedValue = useRef(new Animated.Value(-300)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: width / 2 - 150,
      useNativeDriver: false,
      duration: 2500,
    }).start();
  }, []);

  const { status } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();

  useAuthentication();

  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = async (data: IFormData) => {
    const res = (await dispatch(authentication({ loginMode, ...data })))
      .payload as IAuthenticationOutput;
    if (res.status === RequestStatus.Success) {
      reset();
    }
  };

  if (status === Status.Rejected) {
    alert('Oups! Something wrong happened');
  }

  return (
    <Wrapper alignItems="center" flex={1}>
      <View
        style={{
          marginTop: 100,
          transform: [{ rotate: '-10deg' }],
        }}>
        <Text.Title color={Color.TERTIARY}>Velib Rabbit</Text.Title>
      </View>
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
      <Button onPress={handleSubmit(onSubmit)} color={Color.TERTIARY}>
        {loginMode === LoginMode.SIGN_IN ? 'Je me connecte' : "Je m'inscris"}
      </Button>
      <Animated.Image
        source={{
          uri: 'https://media.tenor.com/YNm9Vo2rAlAAAAAi/bicycles-bikes.gif',
        }}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          bottom: 150,
          right: animatedValue,
        }}
      />
    </Wrapper>
  );
};

export default LoginScreen;

const StyledView = styled.View`
  flex-direction: row;
`;
