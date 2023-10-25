import React, { FC } from 'react';
import { IButtonProps, IStyledTouchableOpacityProps } from './button.d';
import { styled } from 'styled-components/native';
import { Color } from '../../enums';
import { Text } from '../text';

const Button: FC<IButtonProps> = ({
  children,
  color = Color.PRIMARY,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity color={color} onPress={onPress}>
      <Text.Regular>{children}</Text.Regular>
    </StyledTouchableOpacity>
  );
};

export default Button;

const StyledTouchableOpacity = styled.TouchableOpacity<IStyledTouchableOpacityProps>`
  border-width: 1px;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  background-color: ${({ color }) => color};
`;
