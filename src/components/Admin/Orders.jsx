import React, { useEffect, useState } from 'react'
import API_ENDPOINTS, { api } from '../../config/api';

function Orders() {
    const [orders, setOrders] = useState([]); 
       useEffect(() => {
          const fetchOrders = async () => {
           const order=await api.get(API_ENDPOINTS.ORDERS.GET_ALL);
              setOrders([order.data]);
          };
      
          fetchOrders();
        }, []);
  return (
    <div>
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
  )
}

export default Orders