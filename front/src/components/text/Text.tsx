import { TextStyle } from 'react-native';
import { styled } from 'styled-components/native';

const Regular = styled.Text<TextStyle>`
  text-align: ${({ textAlign }) => textAlign};
`;

const Bold = styled(Regular)`
  font-weight: 700;
`;

const Title = styled(Bold)`
  font-size: 32px;
`;

export default { Regular, Bold, Title };
