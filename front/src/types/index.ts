import { ReactNode } from 'react';
import { Status } from '../services/axios/enum';

export interface IChildren {
  children: ReactNode;
}

export interface IStatus {
  status: Status;
}
