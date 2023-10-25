import { createSlice } from '@reduxjs/toolkit';
import { IStationState } from './types';

const initialState: IStationState = {
  stations: [
    {
      _id: '653826f113202381a0bfc35f',
      name: 'Mairie de Rosny-sous-Bois',
      num_bikes_available_types: [
        {
          mechanical: 4,
        },
        {
          ebike: 8,
        },
      ],
      updatedAt: '2023-10-24T20:30:06.577Z',
      last_reported: 1698178305,
      numBikesAvailable: 12,
      numDocksAvailable: 15,
    },
    {
      _id: '653826f113202381a0bfc360',
      name: 'Benjamin Godard - Victor Hugo',
      num_bikes_available_types: [
        {
          mechanical: 2,
        },
        {
          ebike: 2,
        },
      ],
      updatedAt: '2023-10-24T20:30:06.577Z',
      last_reported: 1698178319,
      numBikesAvailable: 4,
      numDocksAvailable: 31,
    },
    {
      _id: '653826f113202381a0bfc363',
      name: "Rouget de L'isle - Watteau",
      num_bikes_available_types: [
        {
          mechanical: 1,
        },
        {
          ebike: 4,
        },
      ],
      updatedAt: '2023-10-24T20:30:06.577Z',
      last_reported: 1698178184,
      numBikesAvailable: 5,
      numDocksAvailable: 14,
    },
    {
      _id: '653826f113202381a0bfc366',
      name: 'Toudouze - Clauzel',
      num_bikes_available_types: [
        {
          mechanical: 2,
        },
        {
          ebike: 1,
        },
      ],
      updatedAt: '2023-10-24T20:30:06.578Z',
      last_reported: 1698178210,
      numBikesAvailable: 3,
      numDocksAvailable: 18,
    },
    {
      _id: '653826f113202381a0bfc368',
      name: 'Mairie du 12ème',
      num_bikes_available_types: [
        {
          mechanical: 14,
        },
        {
          ebike: 8,
        },
      ],
      updatedAt: '2023-10-24T20:30:06.578Z',
      last_reported: 1698178365,
      numBikesAvailable: 22,
      numDocksAvailable: 7,
    },
  ],
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {},
});

export default stationSlice.reducer;
