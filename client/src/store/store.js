import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commonSlice } from './common/commonSlice';
import { quoterSlice } from './quoter/quoterSlice';
import { searcherSlice } from './searcher/searcherSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    quoter: quoterSlice.reducer,
    common: commonSlice.reducer,
    searcher: searcherSlice.reducer,
  },
});
