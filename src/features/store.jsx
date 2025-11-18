// src/features/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ordersReducer from "./orderSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    
  },
});

export default store;
