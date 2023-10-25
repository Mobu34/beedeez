import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { postData } from '../../services/axios';

export const signUp = createAsyncThunk<any, void, { state: TRootState }>(
  'user/signUp',
  async () => {
    console.log('hey');
    const body = { email: 'welcome@app.com', password: 'let go!' };
    const route = 'users';
    postData<{ email: string; password: string }>(route, body);
  },
);
