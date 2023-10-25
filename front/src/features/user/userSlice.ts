import { createSlice } from '@reduxjs/toolkit';
import { signUp } from './userThunk';
import { Status } from '../../services/axios/enum';
import { IUserState } from './types';

const initialState: IUserState = {
  user: { _id: '', email: '' },
  authToken: { expiresIn: 0, token: '' },
  status: Status.Pending,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const { user, authToken } = action.payload;
      state.user = user;
      state.authToken = authToken;
      state.status = Status.Fulfilled;
    });
    builder.addCase(signUp.rejected, state => {
      state.status = Status.Rejected;
    });
  },
});

export default userSlice.reducer;
