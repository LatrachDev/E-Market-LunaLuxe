import { describe, it, expect, vi, beforeEach } from "vitest";
import * as ordersSliceThunks from "../features/orderSlice";
import { api } from "../config/api";

// Mock de l'api
vi.mock("../config/api", async (importOriginal) => {
  const actual = await importOriginal();
  const mockApi = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };
  return {
    ...actual,
    api: mockApi,
  };
});
describe("Orders Slice Thunks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("fetchOrders", () => {
    it("should fetch orders successfully", async () => {
      const mockOrders = [
        { _id: "1", totalAmount: 100 },
        { _id: "2", totalAmount: 50 },
      ];
      api.get.mockResolvedValue({ data: { data: mockOrders } });

      const result = await ordersSliceThunks.fetchOrders("user123")(
        vi.fn(),
        vi.fn(),
        vi.fn()
      );

      expect(api.get).toHaveBeenCalledWith("/orders/user123");
      expect(result.payload).toEqual(mockOrders);
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Network Error");
      api.get.mockRejectedValue(mockError);

      const result = await ordersSliceThunks.fetchOrders("user123")(
        vi.fn(),
        vi.fn(),
        vi.fn()
      );

      expect(result.type).toBe("orders/fetchOrders/rejected");
      expect(result.payload).toBe("Network Error");
    });
  });

  describe("createOrder", () => {
    it("should create order successfully", async () => {
      const mockOrderData = { items: [], totalAmount: 100 };
      const mockOrder = { ...mockOrderData, _id: "order1" };
      api.post.mockResolvedValue({ data: { data: { order: mockOrder } } });

      const result = await ordersSliceThunks.createOrder(mockOrderData)(
        vi.fn(),
        vi.fn(),
        vi.fn()
      );

      expect(api.post).toHaveBeenCalledWith("/orders", mockOrderData);
      expect(result.payload).toEqual(mockOrder);
    });

    it("should handle errors gracefully", async () => {
      const mockOrderData = { items: [] };
      const mockError = new Error("Failed to create order");
      api.post.mockRejectedValue(mockError);

      const result = await ordersSliceThunks.createOrder(mockOrderData)(
        vi.fn(),
        vi.fn(),
        vi.fn()
      );

      expect(result.type).toBe("orders/createOrder/rejected");
      expect(result.payload).toBe("Failed to create order");
    });
  });

  describe("updateStatusOrder", () => {
    it("should update order status successfully", async () => {
      const mockUpdatedOrder = { _id: "1", status: "shipped" };
      api.patch.mockResolvedValue({ data: { data: mockUpdatedOrder } });

      const result = await ordersSliceThunks.updateStatusOrder({
        id: "1",
        newStatus: "shipped",
      })(vi.fn(), vi.fn(), vi.fn());

      expect(api.patch).toHaveBeenCalledWith("/orders/1/status", {
        newStatus: "shipped",
      });
      expect(result.payload).toEqual(mockUpdatedOrder);
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Failed to update");
      api.patch.mockRejectedValue(mockError);

      const result = await ordersSliceThunks.updateStatusOrder({
        id: "1",
        newStatus: "shipped",
      })(vi.fn(), vi.fn(), vi.fn());

      expect(result.type).toBe("orders/updateStatusOrder/rejected");
      expect(result.payload).toBe("Failed to update");
    });
  });

  // Même logique pour deletOrder, restoreOrder, fetchOrdersAdmin, fetchOrdersDeleted, getSellerOrders
});
