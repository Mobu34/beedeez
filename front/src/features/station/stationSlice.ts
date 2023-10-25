import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStationState } from './types';
import { getStations, getStationsBySearch } from './stationThunk';
import { Status } from '../../services/axios/enum';

const initialState: IStationState = {
  stations: [],
  pagination: 0,
  status: Status.Pending,
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getStations.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.stations.push(...action.payload);
        state.status = Status.Fulfilled;
      },
    );
    builder.addCase(
      getStationsBySearch.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.stations = action.payload;
        state.status = Status.Fulfilled;
      },
    );
  },
});

export const { setPagination } = stationSlice.actions;

export default stationSlice.reducer;
