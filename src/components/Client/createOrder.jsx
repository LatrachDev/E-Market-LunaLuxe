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
      coupons: coupon ? [coupon] : [],
    });
  };

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-3xl border border-brandRed/20 p-10">

        {/* --- Title --- */}
        <h1 className="text-4xl font-playfair font-bold text-brandRed mb-10 text-center uppercase tracking-wide">
          Create Order
        </h1>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Coupon Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Coupon (optional)
            </label>
            <input
              type="text"
              placeholder="Enter your coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brandRed/30 focus:ring-2 focus:ring-brandRed/40 outline-none transition bg-[#fbf4fa]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brandRed text-white font-semibold text-lg shadow-md hover:bg-hoverBrandRed transition"
          >
            {loading ? "Creating..." : "Create Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
