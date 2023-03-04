import { configureStore } from "@reduxjs/toolkit" 
import { authSlice } from "./auth/authSlice" 
import { quoterSlice } from "./quoter/quoterSlice"

export const store = configureStore( 
    {
        reducer :{
            auth: authSlice.reducer,
            quoter: quoterSlice.reducer,
        }
 })