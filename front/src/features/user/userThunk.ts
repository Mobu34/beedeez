import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { postData } from '../../services/axios';
import { IFormData } from '../login/types';
import { IAuthenticationInput, IAuthenticationOutput } from './types';
import { LoginMode } from '../login/enums';
import { RequestStatus } from '../../services/axios/enum';

export const authentication = createAsyncThunk<
  IAuthenticationOutput,
  IAuthenticationInput,
  { state: TRootState }
>('user/authentication', async dataInput => {
  const route = dataInput.loginMode === LoginMode.SignUp ? 'signup' : 'login';
  const body = { email: dataInput.email, password: dataInput.password };
  const res = await postData<IFormData>(route, body);
  const { data, authToken } = res?.data;
  return {
    user: data,
    authToken,
    status: RequestStatus.Success,
  };
});
