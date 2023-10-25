import { Color } from '../../enums';
import { IChildren } from '../../types';

export interface IStyledTouchableOpacityProps {
  color?: Color;
}

export interface IButtonProps extends IChildren, IStyledTouchableOpacityProps {
  onPress: () => void;
}
