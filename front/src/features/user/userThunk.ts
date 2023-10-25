import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { postData } from '../../services/axios';
import { IFormData } from '../login/types';
import { IAuthenticationInput, IAuthenticationOutput } from './types';
import { LoginMode } from '../login/enums';
import { RequestStatus } from '../../services/axios/enum';

export const authentication = createAsyncThunk<
  Promise<IAuthenticationOutput | void>,
  IAuthenticationInput,
  { state: TRootState }
>('user/authentication', async data => {
  const route = data.loginMode === LoginMode.SIGN_UP ? 'signup' : 'login';
  const body = { email: data.email, password: data.password };
  const res = await postData<IFormData>(route, body);
  if (res?.status === 201 || res?.status === 200) {
    const { data, authToken } = res.data;
    return {
      user: data,
      authToken,
      status: RequestStatus.Success,
    };
  }
});
