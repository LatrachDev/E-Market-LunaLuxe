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

export const updateStatusOrder = createAsyncThunk(
  "orders/updateStatusOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/orders/${id}/status`, { status });
      return res.data.data;
    }
    catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const deletOrder =createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/orders/${id}/soft`);
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
export const restoreOrder = createAsyncThunk(
  "orders/restoreOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/orders/${id}/restore`);
      return res.data.data;
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
// delet order 
.addCase(deletOrder.pending, (state) => {
  state.loading = true;
})
  .addCase(deletOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload?._id ?? action.payload?.id ?? action.payload;
        if (!deletedId) return; // nothing to remove or unexpected payload
        if (!Array.isArray(state.orders)) return;
        state.orders = state.orders.filter(order => order && order._id !== deletedId);
      })
.addCase(deletOrder.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// restore order
      .addCase(restoreOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(restoreOrder.rejected, (state, action) => {
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
