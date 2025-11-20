import React, { useState } from "react";
import useOrders from "../../hooks/UseOrders";
import { useSelector } from "react-redux";

export default function CreateOrder() {
  const userId = useSelector((state) => state.auth.user?._id);
  const { addOrder, loading } = useOrders(userId);

  const [coupon, setCoupon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addOrder({
      coupons: [coupon],
    });
  };

  return (
    <div className="p-4 mt-[70px]">
      <h1>Créer une commande</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Coupon (optionnel)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        <button type="submit">
          {loading ? "En cours..." : "Créer la commande"}
        </button>
      </form>
    </div>
  );
}
