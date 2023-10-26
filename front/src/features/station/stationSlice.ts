import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStationState } from './types';
import { getStations } from './stationThunk';
import { Status } from '../../services/axios/enum';
import { disconnectionAction } from '../../actions/disconnection';

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
        const { stations, reset } = action.payload;
        if (reset) {
          state.stations = stations;
        } else {
          state.stations.push(...stations);
        }
        state.status = Status.Fulfilled;
      },
    );
    builder.addCase(disconnectionAction, () => {
      return initialState;
    });
  },
});

export const { setPagination } = stationSlice.actions;

export default stationSlice.reducer;
