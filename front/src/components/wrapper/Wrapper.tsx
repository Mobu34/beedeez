import React, { FC } from 'react';
import { IStyledView, IWrapperProps } from './wrapper.d';
import { styled } from 'styled-components/native';

const Wrapper: FC<IWrapperProps> = ({ children, vertical }) => {
  return <StyledView vertical={vertical}>{children}</StyledView>;
};

export default Wrapper;

const StyledView = styled.View<IStyledView>`
  margin-vertical: ${({ vertical = 0 }) => vertical}px;
`;
