import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ordersReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

export default store;
