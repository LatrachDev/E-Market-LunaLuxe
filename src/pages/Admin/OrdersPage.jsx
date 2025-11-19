import React, { useEffect } from "react";
import useOrders from "../../Hooks/UseOrders";

export default function OrdersPage() {
  const { orders, loading, error, loadOrdersAdmin } = useOrders();
  console.log(orders);
  console.log("hi");
  console.log(error);
  
console.log("Redux STORE orders:", orders);

  useEffect(() => {
    loadOrdersAdmin();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>les commandes</h1>

     {orders.map(order => (
 <div key={order._id}>
  <h2>Commande : {order._id}</h2>

  <p><b>User :</b> {order.userId?.fullname}</p>
  <p><b>Email :</b> {order.userId?.email}</p>
  <p><b>Status :</b> {order.status}</p>
  <p><b>Total :</b> {order.finalAmount} MAD</p>

  <h4>Articles :</h4>
  {order.items.map(item => (
    <div key={item._id}>
      <p>Product: {item.productId}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.price} MAD</p>
    </div>
  ))}
</div>

))}
    </div>
  );
}
