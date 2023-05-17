import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',

  initialState: {
    currentPage: 'quoter',
  },

  reducers: {
    setCurrentProcess: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentProcess } = commonSlice.actions;
