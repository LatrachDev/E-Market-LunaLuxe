import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/orders/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchOrdersAdmin = createAsyncThunk(
  "orders/fetchOrdersAdmin",
  async (_, { rejectWithValue }) => {
    
    try {
      const res = await api.get("/orders");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchOrdersDeleted = createAsyncThunk(
  "orders/fetchOrdersDeleted",
  async (userId, { rejectWithValue }) => {
    try {
    const res = await api.get("/orders/deleted");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
  }
  }
);
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("ORDER DATA =", orderData);
      const res = await api.post("/orders", orderData);

      return res.data.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ORDERS ADMIN
      .addCase(fetchOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // push la nouvelle commande
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // orders deleted
      .addCase(fetchOrdersDeleted.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersDeleted.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersDeleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
