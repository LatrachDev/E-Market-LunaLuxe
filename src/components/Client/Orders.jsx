import React, { useState, useEffect } from 'react';
import {api} from "../../config/api";     
import API_ENDPOINTS from "../../config/api"; 
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const response = await api.get(
          API_ENDPOINTS.ORDERS.GET_ONE.replace(':userId', user.id)
        );

        setOrders([response.data]);
      } catch (error) {
        console.error("Error fetching orders :", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
        <h1>heloo</h1>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
       orders.map((order, index) => (
  <div key={index}>
    <h3>{order.title}</h3>
    <p>{order.description}</p>
  </div>
))

      )}
    </div>
  );
}

export default Orders;
