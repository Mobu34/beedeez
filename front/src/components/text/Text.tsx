import { TextStyle } from 'react-native';
import { styled } from 'styled-components/native';

const Regular = styled.Text<TextStyle>`
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ color = 'black' as any }) => color};
  font-family: Alegreya Sans;
  font-weight: 400;
`;

const Bold = styled(Regular)`
  font-weight: 700;
  font-size: ${({ fontSize = 16 }) => fontSize}px;
`;

const Title = styled(Bold)`
  font-size: ${({ fontSize = 48 }) => fontSize}px;
  font-family: Rowdies;
`;

export default { Regular, Bold, Title };
