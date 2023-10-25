import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { postData } from '../../services/axios';
import { IFormData } from '../login/types';

export const signUp = createAsyncThunk<any, IFormData, { state: TRootState }>(
  'user/signUp',
  async data => {
    const route = 'signup';
    const res = await postData<IFormData>(route, data);
    if (res?.status === 201) {
      const { data, authToken } = res.data;
      return {
        user: data,
        authToken,
      };
    }
  },
);
