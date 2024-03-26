import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from '../reducers/RootState';
import setupInterceptors from '../../interceptor/interceptor';
import { getInitialAuthState } from '../../interceptor/authUtils';

const initialState = getInitialAuthState();
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

setupInterceptors();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;