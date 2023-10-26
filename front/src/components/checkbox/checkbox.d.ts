import { Color } from '../../enums';
import { IconEnum } from '../icon/icon.enum';

export interface IStyledView {
  color: Color;
}

export interface ICheckboxProps extends IStyledView {
  onPress: () => void;
  icon: IconEnum;
  iconColor: Color;
}
