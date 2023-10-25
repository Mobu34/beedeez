import { ReactNode } from 'react';
import { RequestStatus, Status } from '../services/axios/enum';

export interface IChildren {
  children: ReactNode;
}

export interface IStatus {
  status: Status;
}

export interface IRequestStatus {
  status: RequestStatus;
}
