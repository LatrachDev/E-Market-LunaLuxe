import React, { useEffect, useState } from "react";
import useSellerOrders from "../../hooks/useSellerOrders";
import { X } from "lucide-react";

export default function SellerOrdersPage() {
  const { sellerOrders, loading, error, loadSellerOrders, updateOrderStatus } = useSellerOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    loadSellerOrders();
  }, []);


  if (loading) return <p className="text-center mt-20">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <h1 className="text-4xl font-playfair font-bold text-brandRed mb-12 text-center uppercase tracking-wide">
          Commandes de vos produits
        </h1>

        {/* TABLE */}
        <div className="overflow-x-auto shadow-xl rounded-3xl border border-brandRed/20 bg-white">
          <table className="min-w-full text-left text-sm font-montserrat">
            <thead className="bg-brandRed text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total (MAD)</th>
                <th className="px-6 py-4">Produits</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {sellerOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-[#fbf4fa] transition-all"
                >
                  {/* Date */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
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

                  {/* View Items */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-brandRed font-semibold hover:underline"
                    >
                      Voir produits ({order.items.length})
                    </button>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        updateOrderStatus({
                          id: order._id,
                          newStatus: "cancelled",
                        })
                      }
                      className="px-5 py-2 rounded-xl bg-brandRed text-white font-semibold hover:bg-hoverBrandRed transition shadow-sm"
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-brandRed text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-xl font-bold font-playfair">
                Commande - {selectedOrder._id}
              </h2>
              <button className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition">
                <X size={24} onClick={() => setSelectedOrder(null)} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Total:{" "}
                  <span className="font-bold text-brandRed">
                    {selectedOrder.finalAmount} MAD
                  </span>
                </p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 border border-gray-200 rounded-xl bg-[#fef7f5] hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-800 text-lg mb-2">
                      {item.productId?.title || "Produit supprimé"}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>
                        Quantité : <strong>{item.quantity}</strong>
                      </span>
                      <span>
                        Prix :{" "}
                        <strong className="text-brandRed">
                          {item.price} MAD
                        </strong>
                      </span>
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                      Sous-total :{" "}
                      <strong>{item.price * item.quantity} MAD</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-5 py-3 rounded-xl bg-brandRed text-white font-semibold hover:bg-hoverBrandRed transition shadow-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
