
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, createOrder,fetchOrdersDeleted, fetchOrdersAdmin,deletOrder} from "../features/orderSlice";
// import { setOrders, setLoading, setError } from "../features/orderSlice";

import { useEffect } from "react";

export default function useOrders(userId) {
  
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  // Charger les commandes du user connecté
  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [dispatch, userId]);

const loadOrdersAdmin = () => {
    dispatch(fetchOrdersAdmin());
};

const loadOrdersUser = () => {
  dispatch(fetchOrders(userId));
}
  
  // Créer une commande
  const addOrder = (orderData) => {
    dispatch(createOrder(orderData));
  };
  const loadDeletedOrders = () => {
    dispatch(fetchOrdersDeleted());
  };

  const deleteOrder = (orderId) => {
    dispatch(deletOrder(orderId));
  }

  return {
    orders,
    loading,
    error,
    addOrder,
    loadOrdersAdmin,
    loadDeletedOrders,
    loadOrdersUser,
    deleteOrder,
  };
}

