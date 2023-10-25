import { View } from 'react-native';
import React, { FC } from 'react';
import { IInputProps } from './input.d';
import { styled } from 'styled-components/native';
import { Color } from '../../enums';
import { Spacing } from '../spacing';
import { Text } from '../text';

const Input: FC<IInputProps> = ({ label, placeholder }) => {
  return (
    <View>
      <Text.Regular>{label}</Text.Regular>
      <Spacing vertical={2} />
      <StyledTextInput placeholder={placeholder} />
    </View>
  );
};

export default Input;

const StyledTextInput = styled.TextInput`
  background-color: ${Color.GREY};
  padding: 8px;
  border-radius: 8px;
`;