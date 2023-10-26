import { styled } from 'styled-components/native';
import { FlexStyle } from 'react-native';

const Wrapper = styled.View<FlexStyle>`
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex = 'none' }) => flex};
`;

export default Wrapper;
