import React, { FC } from 'react';
import { IWrapperProps } from './wrapper.d';
import { styled } from 'styled-components/native';
import { FlexStyle } from 'react-native';

const Wrapper: FC<IWrapperProps> = ({ children, ...styleProps }) => {
  return <StyledView {...styleProps}>{children}</StyledView>;
};

export default Wrapper;

const StyledView = styled.View<FlexStyle>`
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex = 'none' }) => flex};
`;
