import { createSlice } from '@reduxjs/toolkit';

export const searcherSlice = createSlice({
  name: 'searcher',

  initialState: {
    currentSearch: 'users', // user | quoter | product | category
    wordToSearch: '',
    usersFinded: undefined,
  },

  reducers: {
    setCurrentSearch: (state, { payload }) => {
      state.currentSearch = payload;
    },
    setWordToSearch: (state, { payload }) => {
      state.wordToSearch = payload;
    },
    onUsersFinded: (state, { payload }) => {
      state.usersFinded = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentSearch, setWordToSearch, onUsersFinded } = searcherSlice.actions;
