import React, { FC } from 'react';
import { Icon } from '../icon';
import { Spacing } from '../spacing';
import { ICheckboxProps, IStyledView } from './checkbox.d';
import { styled } from 'styled-components/native';

const Checkbox: FC<ICheckboxProps> = ({ onPress, icon, iconColor, color }) => {
  return (
    <StyledPressable onPress={onPress}>
      <Icon icon={icon} color={iconColor} />
      <Spacing horizontal={2} />
      <StyledView color={color} />
    </StyledPressable>
  );
};

export default Checkbox;

const StyledPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const StyledView = styled.View<IStyledView>`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;
