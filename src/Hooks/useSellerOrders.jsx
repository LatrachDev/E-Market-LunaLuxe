// src/hooks/useSellerOrders.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { getSellerOrders, updateStatusOrder } from "../features/orderSlice";

export default function useSellerOrders() {
  const dispatch = useDispatch();

  const { sellerOrders, loading, error } = useSelector((state) => state.orders);

  const loadSellerOrders = useCallback(() => {
    dispatch(getSellerOrders());
  }, [dispatch]);

  const updateOrderStatus = (data) => {
    dispatch(updateStatusOrder(data));
  };

  return {
    sellerOrders,
    loading,
    error,
    loadSellerOrders,
    updateOrderStatus,
  };
}
