import React, { useEffect } from 'react'
import useOrders from '../../Hooks/UseOrders';

function OrdersDeleted() {
const { orders,loadDeletedOrders } = useOrders();
console.log(orders);


  useEffect(() => {
    loadDeletedOrders();
  }, []);

  return (
    <div>
        <h1>Orders Deleted</h1>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.data}</li>
          ))}
        </ul>
    </div>
  );
}

export default OrdersDeleted;