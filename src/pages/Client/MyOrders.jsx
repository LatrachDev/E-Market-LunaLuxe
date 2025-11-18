import React from "react";
import useOrders from "../../Hooks/UseOrders";
import { useSelector } from "react-redux";

export default function OrdersPage() {
  // récupère l'id du user connecté depuis ton authSlice
  const user = useSelector((state) => state.auth.user)
  console.log("hi");
  console.log(user);
  const authState = useSelector(state => state.auth);
console.log("AUTH STATE =", authState);

  
  const { orders, loading, error } = useOrders(user?._id);
console.log(orders);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  

  return (
    <div>
      <h1>Mes commandes</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> {order.finalAmount} MAD</p>

          <h4>Articles :</h4>
          {order.items.map(item => (
            <div key={item._id}>
              <p><strong>Product:</strong> {item.productId?.title || "Produit supprimé"}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price} MAD</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
