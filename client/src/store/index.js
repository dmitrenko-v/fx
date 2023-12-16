import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
