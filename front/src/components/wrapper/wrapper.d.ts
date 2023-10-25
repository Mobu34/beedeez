import { IChildren } from '../../types';

export interface IStyledView {
  vertical?: number;
}

export interface IWrapperProps extends IChildren, IStyledView {}
