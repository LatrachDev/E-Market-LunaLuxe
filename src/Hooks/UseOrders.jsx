import { useDispatch, useSelector } from "react-redux";
import {api} from "../config/api";
import { setOrders, setLoading, setError } from "../features/orderSlice";
import { fetchOrders } from "../features/orderSlice";
import { useEffect } from "react";


export default function useOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const userId = useSelector((state) => state.auth.user?._id);

  const loadOrders = async () => {
    dispatch(setLoading(true));

    try {
      const response = await api.get("/orders");
      console.log("ORDERS FROM API:", response.data.data);

      dispatch(setOrders(response.data.data));
    } catch (err) {
        console.log(err);
      dispatch(setError(err.message));
    }

    dispatch(setLoading(false));
  };

   useEffect(() => {
    if(userId) dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  return {
    orders,
    loading,
    error,
    loadOrders,
  };
}
