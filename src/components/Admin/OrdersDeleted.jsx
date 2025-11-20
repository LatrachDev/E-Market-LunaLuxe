import React, { useEffect } from "react";
import useOrders from "../../Hooks/UseOrders";

export default function OrdersDeleted() {
  const { orders, loadDeletedOrders, restorOrder } = useOrders();

  useEffect(() => {
    loadDeletedOrders();
  }, []);

  return (
    <div className="min-h-screen p-24">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-playfair font-bold text-brandRed mb-12 text-center uppercase tracking-wide">
          Deleted Orders
        </h1>

        {/* Table */}
        <div className="overflow-x-auto shadow-xl rounded-3xl border border-brandRed/20 bg-white">
          <table className="min-w-full text-left text-sm font-montserrat">
            <thead className="bg-brandRed text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Creation Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total (MAD)</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-[#fbf4fa] transition-all"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-semibold text-gray-800">{order._id}</td>

                  {/* Creation Date */}
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm bg-red-100 text-red-700">
                      {order.status}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-bold text-brandRed">
                    {order.finalAmount} MAD
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => restorOrder(order._id)}
                      className="px-5 py-2 rounded-xl bg-brandRed text-white font-semibold hover:bg-hoverBrandRed transition shadow-sm"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}