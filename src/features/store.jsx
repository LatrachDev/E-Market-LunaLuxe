import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ordersReducer from "./orderSlice";
import categoryReducer from "./categorySlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    categories: categoryReducer,
  },
});

export default store;
