import {
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import stationReducer from './features/station/stationSlice';

const rootReducer = combineReducers({ userReducer, stationReducer });

export default configureStore({
  reducer: rootReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, void, Action>;
