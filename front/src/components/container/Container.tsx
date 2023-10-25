import { FlexStyle } from 'react-native';
import React, { FC } from 'react';
import { styled } from 'styled-components/native';
import { IContainerProps } from './container.d';

const Container: FC<IContainerProps> = ({ children, ...styleProps }) => {
  return <StyledView {...styleProps}>{children}</StyledView>;
};

export default Container;

const StyledView = styled.View<FlexStyle>`
  flex: 1;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
