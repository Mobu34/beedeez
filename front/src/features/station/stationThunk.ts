import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { getData } from '../../services/axios';

export const getStations = createAsyncThunk<any, string, { state: TRootState }>(
  'station/getStations',
  async (search, { getState }) => {
    const { pagination } = getState().stationReducer;
    let route = `stations?skip=${pagination}`;
    if (search) {
      route = `${route}&search=${search}`;
    }
    const res = (await getData(route))?.data;
    return res.data;
  },
);

export const getStationsBySearch = createAsyncThunk<
  any,
  string,
  { state: TRootState }
>('station/getStationsBySearch', async search => {
  let route = `stations`;
  if (search) {
    route = `${route}?search=${search}`;
  }
  const res = (await getData(route))?.data;
  return res.data;
});
