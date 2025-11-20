import React, { useEffect } from 'react'
import useOrders from '../../Hooks/UseOrders';

function OrdersDeleted() {
const { orders,loadDeletedOrders,restorOrder } = useOrders();
console.log(orders);


  useEffect(() => {
    loadDeletedOrders();
  }, []);


  return (
    <div>
        <h1>Orders Deleted</h1>
        <ul>
          {orders.map((order) => (
            <table>

                <li key={order.id}>date:{order.createdAt}</li>
                <li key={order.id}>status:{order.status}</li>
                <li key={order.id}>finalAmount:{order.finalAmount}</li>
                <button onClick={() => restorOrder(order._id)}>Restore Order</button>
            
            </table>
          ))}
        </ul>
    </div>
  );
}

export default OrdersDeleted;