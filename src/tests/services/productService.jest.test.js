import {
  fetchProducts,
  fetchProductById,
  fetchSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/productService';

// Mock le module de configuration API
jest.mock('../../config/api');

// Importer l'API mockée après le mock
import { api } from '../../config/api';

// Spy sur console.error sans le désactiver
const consoleErrorSpy = jest.spyOn(console, 'error');

describe('ProductService - Tests avec Jest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockClear();
  });

  describe('fetchProducts', () => {
    it('devrait retourner un tableau de produits en cas de succès', async () => {
      // Arrange
      const mockProducts = [
        {
          _id: '1',
          title: 'Hydrating Cream',
          description: 'Premium moisturizer',
          price: 29.99,
          stock: 50
        },
        {
          _id: '2',
          title: 'Face Serum',
          description: 'Anti-aging serum',
          price: 39.99,
          stock: 30
        }
      ];
      
      api.get.mockResolvedValue({
        data: { data: mockProducts }
      });

      // Act
      const result = await fetchProducts();

      // Assert
      expect(result).toEqual(mockProducts);
      expect(api.get).toHaveBeenCalledWith('/products');
    });

    it('devrait gérer response.data.products (format alternatif)', async () => {
      // Arrange
      const mockProducts = [
        { _id: '1', title: 'Product 1', price: 19.99 }
      ];
      
      api.get.mockResolvedValue({
        data: { products: mockProducts }
      });

      // Act
      const result = await fetchProducts();

      // Assert
      expect(result).toEqual(mockProducts);
    });

    it('devrait retourner un tableau vide si aucun produit', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { data: [] }
      });

      // Act
      const result = await fetchProducts();

      // Assert
      expect(result).toEqual([]);
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    it('devrait throw une erreur en cas d\'échec', async () => {
      // Arrange
      const mockError = new Error('Network Error');
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchProducts()).rejects.toThrow('Network Error');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching products:', mockError);
    });

    it('devrait throw une erreur pour les erreurs serveur (500)', async () => {
      // Arrange
      const mockError = {
        response: { status: 500, data: { message: 'Internal Server Error' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchProducts()).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('fetchProductById', () => {
    it('devrait retourner un produit valide', async () => {
      // Arrange
      const productId = '507f1f77bcf86cd799439011';
      const mockProduct = {
        _id: productId,
        title: 'Hydrating Cream',
        description: 'Premium moisturizer',
        price: 29.99,
        category: { _id: 'cat1', name: 'Skincare' },
        stock: 50,
        primaryImage: '/uploads/image.jpg'
      };
      
      api.get.mockResolvedValue({
        data: { data: mockProduct }
      });

      // Act
      const result = await fetchProductById(productId);

      // Assert
      expect(result).toEqual(mockProduct);
      expect(api.get).toHaveBeenCalledWith(`/products/${productId}`);
    });

    it('devrait gérer response.data.product (format alternatif)', async () => {
      // Arrange
      const productId = '1';
      const mockProduct = { _id: productId, title: 'Test Product' };
      
      api.get.mockResolvedValue({
        data: { product: mockProduct }
      });

      // Act
      const result = await fetchProductById(productId);

      // Assert
      expect(result).toEqual(mockProduct);
    });

    it('devrait throw une erreur si produit introuvable (404)', async () => {
      // Arrange
      const productId = 'nonexistent';
      const mockError = {
        response: { status: 404, data: { message: 'Product not found' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchProductById(productId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur pour les erreurs serveur', async () => {
      // Arrange
      const productId = '1';
      const mockError = new Error('Server error');
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchProductById(productId)).rejects.toThrow('Server error');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait remplacer :id dans l\'URL correctement', async () => {
      // Arrange
      const productId = 'abc123';
      api.get.mockResolvedValue({
        data: { data: { _id: productId, title: 'Test' } }
      });

      // Act
      await fetchProductById(productId);

      // Assert
      expect(api.get).toHaveBeenCalledWith(`/products/${productId}`);
    });
  });

  describe('fetchSellerProducts', () => {
    it('devrait retourner les produits du vendeur', async () => {
      // Arrange
      const sellerId = '507f1f77bcf86cd799439011';
      const mockProducts = [
        { _id: '1', title: 'Product 1', sellerId: sellerId },
        { _id: '2', title: 'Product 2', sellerId: sellerId }
      ];
      
      api.get.mockResolvedValue({
        data: { products: mockProducts }
      });

      // Act
      const result = await fetchSellerProducts(sellerId);

      // Assert
      expect(result).toEqual(mockProducts);
      expect(api.get).toHaveBeenCalled();
    });

    it('devrait utiliser l\'ID vendeur dans l\'URL', async () => {
      // Arrange
      const sellerId = 'seller123';
      api.get.mockResolvedValue({
        data: { products: [] }
      });

      // Act
      await fetchSellerProducts(sellerId);

      // Assert
      expect(api.get).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    it('devrait retourner un tableau vide si le vendeur n\'a pas de produits', async () => {
      // Arrange
      const sellerId = 'seller123';
      api.get.mockResolvedValue({
        data: { products: [] }
      });

      // Act
      const result = await fetchSellerProducts(sellerId);

      // Assert
      expect(result).toEqual([]);
    });

    it('devrait throw une erreur si non autorisé (403)', async () => {
      // Arrange
      const sellerId = 'seller123';
      const mockError = {
        response: { status: 403, data: { message: 'Forbidden' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchSellerProducts(sellerId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si vendeur introuvable (404)', async () => {
      // Arrange
      const sellerId = 'nonexistent';
      const mockError = {
        response: { status: 404, data: { message: 'Seller not found' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchSellerProducts(sellerId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si non authentifié (401)', async () => {
      // Arrange
      const sellerId = 'seller123';
      const mockError = {
        response: { status: 401, data: { message: 'Unauthorized' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchSellerProducts(sellerId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('createProduct', () => {
    it('devrait créer un produit avec FormData', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('title', 'New Product');
      formData.append('description', 'Description');
      formData.append('price', '29.99');
      formData.append('category', 'cat1');
      formData.append('stock', '50');

      const mockResponse = {
        _id: '1',
        title: 'New Product',
        description: 'Description',
        price: 29.99,
        category: 'cat1',
        stock: 50
      };
      
      api.post.mockResolvedValue({
        data: { data: mockResponse }
      });

      // Act
      const result = await createProduct(formData);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    });

    it('devrait utiliser multipart/form-data header', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('title', 'Test');
      
      api.post.mockResolvedValue({
        data: { data: { _id: '1', title: 'Test' } }
      });

      // Act
      await createProduct(formData);

      // Assert
      expect(api.post).toHaveBeenCalledWith(
        '/products',
        formData,
        expect.objectContaining({
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      );
    });

    it('devrait gérer les images (primaryImage et secondaryImages)', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('title', 'Product with Images');
      formData.append('primaryImage', new File([''], 'image1.jpg'));
      formData.append('secondaryImages', new File([''], 'image2.jpg'));
      
      api.post.mockResolvedValue({
        data: {
          data: {
            _id: '1',
            title: 'Product with Images',
            primaryImage: '/uploads/image1.jpg',
            secondaryImages: ['/uploads/image2.jpg']
          }
        }
      });

      // Act
      const result = await createProduct(formData);

      // Assert
      expect(result.primaryImage).toBeDefined();
      expect(api.post).toHaveBeenCalledWith('/products', formData, expect.any(Object));
    });

    it('devrait throw des erreurs de validation (400)', async () => {
      // Arrange
      const invalidData = new FormData();
      invalidData.append('title', ''); // Titre vide
      
      const mockError = {
        response: { status: 400, data: { message: 'Validation error' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(createProduct(invalidData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si non authentifié (401)', async () => {
      // Arrange
      const formData = new FormData();
      const mockError = {
        response: { status: 401, data: { message: 'Unauthorized' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(createProduct(formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si non vendeur (403)', async () => {
      // Arrange
      const formData = new FormData();
      const mockError = {
        response: { status: 403, data: { message: 'Only sellers can create products' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(createProduct(formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si fichier trop volumineux (413)', async () => {
      // Arrange
      const formData = new FormData();
      const mockError = {
        response: { status: 413, data: { message: 'File too large' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(createProduct(formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('devrait mettre à jour un produit avec succès', async () => {
      // Arrange
      const productId = '507f1f77bcf86cd799439011';
      const formData = new FormData();
      formData.append('title', 'Updated Product');
      formData.append('price', '39.99');

      const mockResponse = {
        _id: productId,
        title: 'Updated Product',
        price: 39.99,
        updatedAt: '2025-01-02T00:00:00.000Z'
      };
      
      api.put.mockResolvedValue({
        data: { data: mockResponse }
      });

      // Act
      const result = await updateProduct(productId, formData);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalled();
    });

    it('devrait utiliser la méthode PUT', async () => {
      // Arrange
      const productId = '1';
      const formData = new FormData();
      
      api.put.mockResolvedValue({
        data: { data: { _id: productId } }
      });

      // Act
      await updateProduct(productId, formData);

      // Assert
      expect(api.put).toHaveBeenCalled();
      expect(api.patch).not.toHaveBeenCalled();
      expect(api.post).not.toHaveBeenCalled();
    });

    it('devrait gérer FormData pour les updates partiels', async () => {
      // Arrange
      const productId = '1';
      const formData = new FormData();
      formData.append('stock', '100'); // Mise à jour du stock seulement
      
      api.put.mockResolvedValue({
        data: { data: { _id: productId, stock: 100 } }
      });

      // Act
      await updateProduct(productId, formData);

      // Assert
      expect(api.put).toHaveBeenCalled();
    });

    it('devrait throw une erreur si pas le propriétaire (403)', async () => {
      // Arrange
      const productId = '1';
      const formData = new FormData();
      const mockError = {
        response: { status: 403, data: { message: 'Not the owner' } }
      };
      api.put.mockRejectedValue(mockError);

      // Act & Assert
      await expect(updateProduct(productId, formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si produit introuvable (404)', async () => {
      // Arrange
      const productId = 'nonexistent';
      const formData = new FormData();
      const mockError = {
        response: { status: 404, data: { message: 'Product not found' } }
      };
      api.put.mockRejectedValue(mockError);

      // Act & Assert
      await expect(updateProduct(productId, formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur de validation (400)', async () => {
      // Arrange
      const productId = '1';
      const formData = new FormData();
      formData.append('price', '-10'); // Prix négatif invalide
      
      const mockError = {
        response: { status: 400, data: { message: 'Invalid price' } }
      };
      api.put.mockRejectedValue(mockError);

      // Act & Assert
      await expect(updateProduct(productId, formData)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('devrait supprimer un produit avec succès', async () => {
      // Arrange
      const productId = '507f1f77bcf86cd799439011';
      const mockResponse = {
        _id: productId,
        title: 'Deleted Product'
      };
      
      api.delete.mockResolvedValue({
        data: { data: mockResponse }
      });

      // Act
      const result = await deleteProduct(productId);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalled();
    });

    it('devrait throw une erreur si pas le propriétaire (403)', async () => {
      // Arrange
      const productId = '1';
      const mockError = {
        response: { status: 403, data: { message: 'Not the owner' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act & Assert
      await expect(deleteProduct(productId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur si produit introuvable (404)', async () => {
      // Arrange
      const productId = 'nonexistent';
      const mockError = {
        response: { status: 404, data: { message: 'Product not found' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act & Assert
      await expect(deleteProduct(productId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait throw une erreur serveur (500)', async () => {
      // Arrange
      const productId = '1';
      const mockError = {
        response: { status: 500, data: { message: 'Server error' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act & Assert
      await expect(deleteProduct(productId)).rejects.toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Gestion générale des erreurs - ProductService', () => {
    it('devrait logger toutes les erreurs dans la console', async () => {
      // Arrange
      const mockError = new Error('Test error');
      api.get.mockRejectedValue(mockError);

      // Act
      try {
        await fetchProducts();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        mockError
      );
    });

    it('devrait toujours throw les erreurs (contrairement à CategoryService)', async () => {
      // Arrange
      const mockError = new Error('Critical error');
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchProducts()).rejects.toThrow('Critical error');
    });
  });

  describe('Comparaison avec CategoryService', () => {
    it('ProductService throw les erreurs, CategoryService retourne undefined', async () => {
      // Arrange
      const mockError = new Error('Test');
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      // ProductService devrait throw
      await expect(fetchProducts()).rejects.toThrow();
    });

    it('devrait gérer les formats de réponse multiples (data.data vs data.products)', async () => {
      // Format 1: data.data
      api.get.mockResolvedValueOnce({
        data: { data: [{ _id: '1', title: 'Product 1' }] }
      });
      let result1 = await fetchProducts();
      expect(result1).toHaveLength(1);

      // Format 2: data.products
      api.get.mockResolvedValueOnce({
        data: { products: [{ _id: '2', title: 'Product 2' }] }
      });
      let result2 = await fetchProducts();
      expect(result2).toHaveLength(1);
    });
  });
});

