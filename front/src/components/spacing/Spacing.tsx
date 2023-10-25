import { styled } from 'styled-components/native';
import { ISpacingProps } from './spacing.d';

const Spacing = styled.View<ISpacingProps>`
  margin-horizontal: ${({ horizontal = 0 }) => horizontal}px;
  margin-vertical: ${({ vertical = 0 }) => vertical}px;
`;

export default Spacing;
