import { createSlice } from '@reduxjs/toolkit';

const initialState = { _id: '', email: '' };

const userSlice = createSlice({ name: 'user', initialState, reducers: {} });

export default userSlice.reducer;
