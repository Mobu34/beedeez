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
  let textColor;
  switch (color) {
    case Color.PRIMARY:
    case Color.TERTIARY:
      textColor = 'white';
      break;
    case Color.SECONDARY:
      textColor = 'black';
      break;
  }

  return (
    <StyledTouchableOpacity color={color} onPress={onPress}>
      <Text.Regular color={textColor}>{children}</Text.Regular>
    </StyledTouchableOpacity>
  );
};

export default Button;

const StyledTouchableOpacity = styled.TouchableOpacity<IStyledTouchableOpacityProps>`
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  background-color: ${({ color }) => color};
`;
