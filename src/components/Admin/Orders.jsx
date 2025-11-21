import React, { useEffect } from "react";
import useOrders from "../../Hooks/UseOrders";

export default function OrdersPage() {
  const {
    orders,
    loading,
    error,
    loadOrdersAdmin,
    deleteOrder,
  } = useOrders();

  useEffect(() => {
    loadOrdersAdmin();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <span className="text-brandRed font-montserrat text-lg animate-pulse">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-brandWhite">
        <span className="text-red-600 font-montserrat text-lg">{error}</span>
      </div>
    );

  return (
    
    <div className="min-h-screen bg-linear-to-br  px-6 py-10">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-brandRed mb-12 text-center uppercase tracking-wide">
          Orders Management
        </h1>

        <div className="overflow-x-auto shadow-xl rounded-3xl border border-brandRed/20 bg-white">
          <table className="min-w-full text-left text-sm font-montserrat">
            <thead className="bg-brandRed text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Total (MAD)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-[#fbf4fa] transition-all"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">{order._id}</td>

                  <td className="px-6 py-4">
                    {order.userId?.fullname || (
                      <span className="text-gray-400">Deleted User</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {order.userId?.email || (
                      <span className="text-gray-400">Unknown Email</span>
                    )}
                  </td>

                  <td className="px-6 py-4 font-bold text-brandRed">{order.finalAmount}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                      ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <details className="cursor-pointer">
                      <summary className="text-brandRed font-semibold">
                        View Items
                      </summary>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        {order.items.map((item) => (
                          <li
                            key={item._id}
                            className="bg-neutral-100 rounded-lg p-2"
                          >
                            <p>
                              <b>Product:</b> {item.productId?.title || "Deleted"}
                            </p>
                            <p>
                              <b>Qty:</b> {item.quantity}
                            </p>
                            <p>
                              <b>Price:</b> {item.price} MAD
                            </p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </td>

                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                    >
                      Delete
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