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

    updateUsersFinded: (state, { payload }) => {
      state.usersFinded=state.usersFinded.map((user)=>{
        return user.id===payload.id ? payload : user
      })
    },

    updateUserDeleted: (state, { payload }) => {
      state.usersFinded=state.usersFinded.map((user)=>{
        return user.id===payload ? {...user, isactive:false} : user
      })
    },

    updateUserActivated: (state, { payload }) => {
      state.usersFinded=state.usersFinded.map((user)=>{
        return user.id===payload ? {...user, isactive:true} : user
      })
    },



    updateImageUserFinded: (state, { payload }) => {
      state.usersFinded=state.usersFinded.map((user)=>{
        return user.id===payload.id ? {...user, image:payload.image} : user
      })
    },

    onResetSearcher: (state, { payload }) => {
      state.currentSearch= 'users'// user | quoter | product | category
      state.wordToSearch= ''
      state.usersFinded= undefined
    },
    
  },
});

// Action creators are generated for each case reducer function
export const {updateUserActivated, updateUserDeleted, setCurrentSearch, setWordToSearch, onUsersFinded,onResetSearcher , updateUsersFinded, updateImageUserFinded} = searcherSlice.actions;
