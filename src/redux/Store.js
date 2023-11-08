import { configureStore } from "@reduxjs/toolkit";
import  authSlice from './fetures/Auth/Auth'

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
