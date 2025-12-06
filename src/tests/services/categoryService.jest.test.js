import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../services/categoryService';

// Mock le module de configuration API
jest.mock('../../config/api');

// Importer l'API mockée après le mock
import { api } from '../../config/api';

// Spy sur console.error sans le désactiver
const consoleErrorSpy = jest.spyOn(console, 'error');

describe('CategoryService - Tests avec Jest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockClear();
  });

  describe('fetchCategories', () => {
    it('devrait retourner un tableau de catégories en cas de succès', async () => {
      // Arrange
      const mockCategories = [
        { _id: '1', name: 'Skincare', description: 'Soins de la peau' },
        { _id: '2', name: 'Makeup', description: 'Maquillage' }
      ];
      
      api.get.mockResolvedValue({
        data: { categories: mockCategories }
      });

      // Act
      const result = await fetchCategories();

      // Assert
      expect(result).toEqual(mockCategories);
      expect(api.get).toHaveBeenCalled();
    });

    it('devrait retourner un tableau vide si aucune catégorie', async () => {
      // Arrange
      api.get.mockResolvedValue({
        data: { categories: [] }
      });

      // Act
      const result = await fetchCategories();

      // Assert
      expect(result).toEqual([]);
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    it('devrait retourner undefined et logger une erreur en cas d\'échec', async () => {
      // Arrange
      const mockError = new Error('Network Error');
      api.get.mockRejectedValue(mockError);

      // Act
      const result = await fetchCategories();

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching categories:', mockError);
    });

    it('devrait gérer les erreurs 404', async () => {
      // Arrange
      const mockError = {
        response: { status: 404, data: { message: 'Not found' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act
      const result = await fetchCategories();

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs 500', async () => {
      // Arrange
      const mockError = {
        response: { status: 500, data: { message: 'Internal Server Error' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act
      const result = await fetchCategories();

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('fetchCategoryById', () => {
    it('devrait retourner une catégorie valide', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const mockCategory = {
        _id: categoryId,
        name: 'Skincare',
        description: 'Produits de soin'
      };
      
      api.get.mockResolvedValue({
        data: { category: mockCategory }
      });

      // Act
      const result = await fetchCategoryById(categoryId);

      // Assert
      expect(result).toEqual(mockCategory);
      expect(api.get).toHaveBeenCalled();
    });

    it('devrait retourner undefined si ID invalide (400)', async () => {
      // Arrange
      const invalidId = 'invalid-id';
      const mockError = {
        response: { status: 400, data: { message: 'Invalid ID' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act
      const result = await fetchCategoryById(invalidId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait retourner undefined si catégorie introuvable (404)', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const mockError = {
        response: { status: 404, data: { message: 'Category not found' } }
      };
      api.get.mockRejectedValue(mockError);

      // Act
      const result = await fetchCategoryById(categoryId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait remplacer :id dans l\'URL correctement', async () => {
      // Arrange
      const categoryId = 'abc123';
      api.get.mockResolvedValue({
        data: { category: { _id: categoryId, name: 'Test' } }
      });

      // Act
      await fetchCategoryById(categoryId);

      // Assert
      expect(api.get).toHaveBeenCalled();
    });
  });

  describe('createCategory', () => {
    it('devrait créer une nouvelle catégorie avec succès', async () => {
      // Arrange
      const categoryData = {
        name: 'New Category',
        description: 'New Description'
      };
      const mockResponse = {
        _id: '507f1f77bcf86cd799439011',
        ...categoryData,
        createdAt: '2025-01-01T00:00:00.000Z'
      };
      
      api.post.mockResolvedValue({
        data: { category: mockResponse }
      });

      // Act
      const result = await createCategory(categoryData);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith(expect.any(String), categoryData);
    });

    it('devrait envoyer les bonnes données au serveur', async () => {
      // Arrange
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description'
      };
      api.post.mockResolvedValue({
        data: { category: { _id: '1', ...categoryData } }
      });

      // Act
      await createCategory(categoryData);

      // Assert
      expect(api.post).toHaveBeenCalledWith(expect.any(String), categoryData);
      expect(api.post).toHaveBeenCalledTimes(1);
    });

    it('devrait gérer les erreurs de validation (400)', async () => {
      // Arrange
      const invalidData = { name: '' }; // Nom vide
      const mockError = {
        response: { status: 400, data: { message: 'Validation error' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act
      const result = await createCategory(invalidData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les doublons (409)', async () => {
      // Arrange
      const duplicateData = { name: 'Existing Category' };
      const mockError = {
        response: { status: 409, data: { message: 'Category already exists' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act
      const result = await createCategory(duplicateData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs d\'authentification (401)', async () => {
      // Arrange
      const categoryData = { name: 'Test' };
      const mockError = {
        response: { status: 401, data: { message: 'Unauthorized' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act
      const result = await createCategory(categoryData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs d\'autorisation (403)', async () => {
      // Arrange
      const categoryData = { name: 'Test' };
      const mockError = {
        response: { status: 403, data: { message: 'Forbidden - Admin only' } }
      };
      api.post.mockRejectedValue(mockError);

      // Act
      const result = await createCategory(categoryData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('updateCategory', () => {
    it('devrait mettre à jour une catégorie avec succès', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const updateData = {
        name: 'Updated Category',
        description: 'Updated Description'
      };
      const mockResponse = {
        _id: categoryId,
        ...updateData,
        updatedAt: '2025-01-02T00:00:00.000Z'
      };
      
      api.patch.mockResolvedValue({
        data: { category: mockResponse }
      });

      // Act
      const result = await updateCategory(categoryId, updateData);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalled();
    });

    it('devrait gérer les champs partiels', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const partialUpdate = { name: 'New Name Only' };
      
      api.patch.mockResolvedValue({
        data: { category: { _id: categoryId, ...partialUpdate } }
      });

      // Act
      const result = await updateCategory(categoryId, partialUpdate);

      // Assert
      expect(result).toBeDefined();
      expect(api.patch).toHaveBeenCalled();
    });

    it('devrait retourner undefined en cas d\'erreur 404', async () => {
      // Arrange
      const categoryId = 'nonexistent';
      const updateData = { name: 'Test' };
      const mockError = {
        response: { status: 404, data: { message: 'Category not found' } }
      };
      api.patch.mockRejectedValue(mockError);

      // Act
      const result = await updateCategory(categoryId, updateData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait utiliser la méthode PATCH', async () => {
      // Arrange
      const categoryId = '1';
      const updateData = { name: 'Test' };
      api.patch.mockResolvedValue({
        data: { category: { _id: categoryId, ...updateData } }
      });

      // Act
      await updateCategory(categoryId, updateData);

      // Assert
      expect(api.patch).toHaveBeenCalled();
      expect(api.post).not.toHaveBeenCalled();
      expect(api.put).not.toHaveBeenCalled();
    });

    it('devrait gérer les erreurs de validation (400)', async () => {
      // Arrange
      const categoryId = '1';
      const invalidData = { name: '' };
      const mockError = {
        response: { status: 400, data: { message: 'Invalid data' } }
      };
      api.patch.mockRejectedValue(mockError);

      // Act
      const result = await updateCategory(categoryId, invalidData);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('deleteCategory', () => {
    it('devrait supprimer une catégorie avec succès', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const mockResponse = {
        _id: categoryId,
        name: 'Deleted Category'
      };
      
      api.delete.mockResolvedValue({
        data: { category: mockResponse }
      });

      // Act
      const result = await deleteCategory(categoryId);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs 404', async () => {
      // Arrange
      const categoryId = 'nonexistent';
      const mockError = {
        response: { status: 404, data: { message: 'Category not found' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act
      const result = await deleteCategory(categoryId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les conflits - catégorie liée à des produits (409)', async () => {
      // Arrange
      const categoryId = '507f1f77bcf86cd799439011';
      const mockError = {
        response: { 
          status: 409, 
          data: { message: 'Cannot delete category with associated products' } 
        }
      };
      api.delete.mockRejectedValue(mockError);

      // Act
      const result = await deleteCategory(categoryId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs d\'autorisation (403)', async () => {
      // Arrange
      const categoryId = '1';
      const mockError = {
        response: { status: 403, data: { message: 'Forbidden' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act
      const result = await deleteCategory(categoryId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs serveur (500)', async () => {
      // Arrange
      const categoryId = '1';
      const mockError = {
        response: { status: 500, data: { message: 'Server error' } }
      };
      api.delete.mockRejectedValue(mockError);

      // Act
      const result = await deleteCategory(categoryId);

      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Gestion générale des erreurs', () => {
    it('devrait logger toutes les erreurs dans la console', async () => {
      // Arrange
      const mockError = new Error('Test error');
      api.get.mockRejectedValue(mockError);

      // Act
      await fetchCategories();

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        mockError
      );
    });

    it('ne devrait jamais throw d\'erreur', async () => {
      // Arrange
      const mockError = new Error('Critical error');
      api.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(fetchCategories()).resolves.toBeUndefined();
    });
  });
});
