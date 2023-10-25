import { IStatus } from '../../../types';

export interface IStation {
  _id: string;
  name: string;
  num_bikes_available_types: [
    {
      mechanical: number;
    },
    {
      ebike: number;
    },
  ];
  updatedAt: string;
  last_reported: number;
  numBikesAvailable: number;
  numDocksAvailable: number;
}

export interface IStationState extends IStatus {
  stations: IStation[];
  pagination: number;
}
