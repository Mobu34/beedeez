import { TextStyle } from 'react-native';
import { styled } from 'styled-components/native';

const Regular = styled.Text<TextStyle>`
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ color = 'black' as any }) => color};
`;

const Bold = styled(Regular)`
  font-weight: 700;
  font-size: ${({ fontSize = 16 }) => fontSize}px;
`;

const Title = styled(Bold)`
  font-size: 48px;
`;

export default { Regular, Bold, Title };
