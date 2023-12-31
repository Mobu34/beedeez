import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { getData } from '../../services/axios';
import { IGetStationsInput, IGetStationsOutput } from './types';

export const getStations = createAsyncThunk<
  IGetStationsOutput,
  IGetStationsInput,
  { state: TRootState }
>('station/getStations', async filters => {
  let route = `stations?skip=${filters.pagination.toString()}`;
  if (filters.search) {
    route = `${route}&search=${filters.search}`;
  }
  if (filters.bikeType) {
    route = `${route}&bikeType=${filters.bikeType}`;
  }
  const res = (await getData(route))?.data;
  const reset = filters.pagination === 0 ? true : false;
  return { stations: res.data, reset };
});
