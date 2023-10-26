import { createSlice } from '@reduxjs/toolkit';
import { authentication } from './userThunk';
import { Status } from '../../services/axios/enum';
import { IUserState } from './types';
import { disconnectionAction } from '../../actions/disconnection';

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
    builder.addCase(authentication.fulfilled, (state, action) => {
      const { user, authToken } = action.payload as any;
      state.user = user;
      state.authToken = authToken;
      state.status = Status.Fulfilled;
    });
    builder.addCase(authentication.rejected, state => {
      state.status = Status.Rejected;
    });
    builder.addCase(disconnectionAction, () => {
      return initialState;
    });
  },
});

export default userSlice.reducer;
