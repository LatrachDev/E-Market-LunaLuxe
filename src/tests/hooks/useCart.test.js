import { renderHook, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCart } from '../../hooks/useCart';
import { api } from '../../config/api';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cartSlice';
import { toast } from 'react-toastify';

// Mock API et toast
jest.mock('../../config/api');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Helper pour créer un wrapper avec Redux et React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

describe('useCart Hook - Tests complets', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
    jest.clearAllMocks();
  });

  describe('Chargement initial du panier', () => {
    it('devrait charger le panier au mount si userId est fourni', async () => {
      // Arrange
      const mockCart = {
        items: [
          {
            _id: 'item1',
            productId: {
              _id: 'prod1',
              title: 'Test Product',
              price: 29.99,
              primaryImage: '/image.jpg',
            },
            quantity: 2,
          },
        ],
        total: 59.98,
      };

      api.get.mockResolvedValue({
        data: { data: mockCart },
      });

      // Act
      const { result } = renderHook(() => useCart('user123'), { wrapper });

      // Assert
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/cart', {
          headers: { 'Cache-Control': 'no-cache' },
        });
      });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.items[0]._id).toBe('item1');
      });
    });

    it('ne devrait PAS charger le panier si userId est null', async () => {
      // Act
      renderHook(() => useCart(null), { wrapper });

      // Assert
      await waitFor(() => {
        expect(api.get).not.toHaveBeenCalled();
      });
    });

    it('devrait afficher un toast d\'erreur si le chargement échoue', async () => {
      // Arrange
      api.get.mockRejectedValue(new Error('Network error'));

      // Act
      renderHook(() => useCart('user123'), { wrapper });

      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Impossible de charger le panier');
      });
    });

    it('devrait gérer un panier vide', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      // Act
      const { result } = renderHook(() => useCart('user123'), { wrapper });

      // Assert
      await waitFor(() => {
        expect(result.current.cart.items).toEqual([]);
        expect(result.current.cart.total).toBe(0);
      });
    });
  });

  describe('Ajout de produit (addToCart)', () => {
    it('devrait ajouter un produit au panier avec succès', async () => {
      // Arrange - Initial empty cart
      api.get.mockResolvedValueOnce({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      await waitFor(() => {
        expect(result.current.cart).toBeDefined();
      });

      // Arrange - Add product response
      const newItem = {
        _id: 'item1',
        productId: {
          _id: 'prod1',
          title: 'New Product',
          price: 19.99,
        },
        quantity: 1,
      };

      api.post.mockResolvedValue({
        data: { data: newItem },
      });

      // Mock re-fetch after add
      api.get.mockResolvedValueOnce({
        data: {
          data: {
            items: [newItem],
            total: 19.99,
          },
        },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({
          productId: 'prod1',
          quantity: 1,
        });
      });

      // Assert
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/cart', {
          productId: 'prod1',
          quantity: 1,
        });
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Produit ajouté au panier !');
      });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.total).toBe(19.99);
      });
    });

    it('devrait afficher un toast d\'erreur si l\'ajout échoue', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.post.mockRejectedValue({
        response: { data: { message: 'Product out of stock' } },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({
          productId: 'prod1',
          quantity: 1,
        });
      });

      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Impossible d\'ajouter au panier');
      });
    });

    it('devrait gérer l\'ajout de plusieurs quantités', async () => {
      // Arrange
      api.get.mockResolvedValueOnce({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      const newItem = {
        _id: 'item1',
        productId: { _id: 'prod1', price: 10 },
        quantity: 5,
      };

      api.post.mockResolvedValue({ data: { data: newItem } });
      api.get.mockResolvedValueOnce({
        data: { data: { items: [newItem], total: 50 } },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({
          productId: 'prod1',
          quantity: 5,
        });
      });

      // Assert
      await waitFor(() => {
        expect(result.current.cart.items[0].quantity).toBe(5);
        expect(result.current.cart.total).toBe(50);
      });
    });
  });

  describe('Mise à jour de quantité (updateCartItem)', () => {
    it('devrait mettre à jour la quantité d\'un produit', async () => {
      // Arrange - Cart with one item
      const initialCart = {
        items: [
          {
            _id: 'item1',
            productId: { _id: 'prod1', price: 20 },
            quantity: 2,
          },
        ],
        total: 40,
      };

      api.get.mockResolvedValueOnce({
        data: { data: initialCart },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(1);
      });

      // Arrange - Update response
      api.put.mockResolvedValue({ data: { success: true } });
      
      const updatedCart = {
        items: [
          {
            _id: 'item1',
            productId: { _id: 'prod1', price: 20 },
            quantity: 5,
          },
        ],
        total: 100,
      };

      api.get.mockResolvedValueOnce({
        data: { data: updatedCart },
      });

      // Act
      await act(async () => {
        result.current.updateCartItem.mutate({
          productId: 'prod1',
          quantity: 5,
        });
      });

      // Assert
      await waitFor(() => {
        expect(api.put).toHaveBeenCalledWith('/cart', {
          productId: 'prod1',
          quantity: 5,
        });
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Quantité mise à jour !');
      });

      await waitFor(() => {
        expect(result.current.cart.items[0].quantity).toBe(5);
        expect(result.current.cart.total).toBe(100);
      });
    });

    it('devrait gérer la mise à jour vers quantité 0', async () => {
      // Arrange
      api.get.mockResolvedValueOnce({
        data: {
          data: {
            items: [{ _id: 'item1', productId: { _id: 'prod1', price: 20 }, quantity: 2 }],
            total: 40,
          },
        },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.put.mockResolvedValue({ data: { success: true } });
      api.get.mockResolvedValueOnce({
        data: { data: { items: [], total: 0 } },
      });

      // Act
      await act(async () => {
        result.current.updateCartItem.mutate({
          productId: 'prod1',
          quantity: 0,
        });
      });

      // Assert
      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.total).toBe(0);
      });
    });
  });

  describe('Suppression de produit (removeCartItem)', () => {
    it('devrait supprimer un produit du panier', async () => {
      // Arrange
      const initialCart = {
        items: [
          { _id: 'item1', productId: { _id: 'prod1', price: 20 }, quantity: 2 },
          { _id: 'item2', productId: { _id: 'prod2', price: 30 }, quantity: 1 },
        ],
        total: 70,
      };

      api.get.mockResolvedValueOnce({
        data: { data: initialCart },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(2);
      });

      // Arrange - Remove response
      api.delete.mockResolvedValue({ data: { success: true } });

      const updatedCart = {
        items: [{ _id: 'item2', productId: { _id: 'prod2', price: 30 }, quantity: 1 }],
        total: 30,
      };

      api.get.mockResolvedValueOnce({
        data: { data: updatedCart },
      });

      // Act
      await act(async () => {
        result.current.removeCartItem.mutate({
          productId: 'prod1',
        });
      });

      // Assert
      await waitFor(() => {
        expect(api.delete).toHaveBeenCalledWith('/cart', {
          data: { productId: 'prod1' },
        });
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Produit supprimé !');
      });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.items[0]._id).toBe('item2');
        expect(result.current.cart.total).toBe(30);
      });
    });

    it('devrait gérer la suppression du dernier produit', async () => {
      // Arrange
      api.get.mockResolvedValueOnce({
        data: {
          data: {
            items: [{ _id: 'item1', productId: { _id: 'prod1', price: 20 }, quantity: 1 }],
            total: 20,
          },
        },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.delete.mockResolvedValue({ data: { success: true } });
      api.get.mockResolvedValueOnce({
        data: { data: { items: [], total: 0 } },
      });

      // Act
      await act(async () => {
        result.current.removeCartItem.mutate({ productId: 'prod1' });
      });

      // Assert
      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.total).toBe(0);
      });
    });
  });

  describe('Vidage du panier (clearCart)', () => {
    it('devrait vider complètement le panier', async () => {
      // Arrange
      const initialCart = {
        items: [
          { _id: 'item1', productId: { _id: 'prod1', price: 20 }, quantity: 2 },
          { _id: 'item2', productId: { _id: 'prod2', price: 30 }, quantity: 1 },
        ],
        total: 70,
      };

      api.get.mockResolvedValueOnce({
        data: { data: initialCart },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(2);
      });

      // Arrange - Clear response
      api.delete.mockResolvedValue({ data: { success: true } });

      // Act
      await act(async () => {
        result.current.clearCart.mutate();
      });

      // Assert
      await waitFor(() => {
        expect(api.delete).toHaveBeenCalledWith('/cart/clear');
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Panier vidé !');
      });

      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.total).toBe(0);
      });
    });
  });

  describe('États de chargement (isPending)', () => {
    it('devrait indiquer le chargement pendant addToCart', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      let resolveMutation;
      api.post.mockReturnValue(
        new Promise((resolve) => {
          resolveMutation = resolve;
        })
      );

      // Act
      act(() => {
        result.current.addToCart.mutate({ productId: 'prod1', quantity: 1 });
      });

      // Assert - Pending
      await waitFor(() => {
        expect(result.current.addToCart.isPending).toBe(true);
      });

      // Resolve
      act(() => {
        resolveMutation({ data: { data: {} } });
      });

      // Assert - Not pending anymore
      await waitFor(() => {
        expect(result.current.addToCart.isPending).toBe(false);
      });
    });
  });

  describe('Synchronisation Redux', () => {
    it('devrait synchroniser Redux après chaque mutation', async () => {
      // Arrange
      api.get.mockResolvedValueOnce({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      const newItem = {
        _id: 'item1',
        productId: { _id: 'prod1', price: 25 },
        quantity: 3,
      };

      api.post.mockResolvedValue({ data: { data: newItem } });
      api.get.mockResolvedValueOnce({
        data: { data: { items: [newItem], total: 75 } },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({ productId: 'prod1', quantity: 3 });
      });

      // Assert - Redux state updated
      await waitFor(() => {
        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.total).toBe(75);
      });
    });
  });

  describe('Gestion des erreurs API', () => {
    it('devrait gérer les erreurs 401 (non authentifié)', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.post.mockRejectedValue({
        response: { status: 401, data: { message: 'Unauthorized' } },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({ productId: 'prod1', quantity: 1 });
      });

      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Impossible d\'ajouter au panier');
      });
    });

    it('devrait gérer les erreurs 404 (produit introuvable)', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.post.mockRejectedValue({
        response: { status: 404, data: { message: 'Product not found' } },
      });

      // Act
      await act(async () => {
        result.current.addToCart.mutate({ productId: 'invalid-id', quantity: 1 });
      });

      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });

    it('devrait gérer les erreurs réseau', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: { items: [], total: 0 } },
      });

      const { result } = renderHook(() => useCart('user123'), { wrapper });

      api.post.mockRejectedValue(new Error('Network Error'));

      // Act
      await act(async () => {
        result.current.addToCart.mutate({ productId: 'prod1', quantity: 1 });
      });

      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Impossible d\'ajouter au panier');
      });
    });
  });
});
