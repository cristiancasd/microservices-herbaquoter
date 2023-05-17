import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: {},
    errorMessage: null,
    successMessage: null,
  },
  reducers: {
    onUpdateImageProfile: (state, { payload }) => {
      state.user = { ...state.user, image: payload };
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    onSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLogin,
  onLogout,
  checkingCredentials,
  clearErrorMessage,
  clearSuccessMessage,
  onErrorMessage,
  onSuccessMessage,
  onUpdateImageProfile,
} = authSlice.actions;
