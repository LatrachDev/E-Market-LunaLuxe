// categories.test.jsx
// Mock the api module - must be before any imports
jest.mock('../config/api', () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  const mockAPI_ENDPOINTS = {
    CATEGORIES: {
      GET_ALL: '/categories',
      GET_ONE: '/categories/:id',
      CREATE_CATEGORY: '/categories',
      UPDATE_CATEGORY: '/categories/:id',
      DELETE_CATEGORY: '/categories/:id',
    },
  };

  return {
    __esModule: true,
    default: mockAPI_ENDPOINTS,
    api: mockApi,
    API_ENDPOINTS: mockAPI_ENDPOINTS,
  };
});

import { fetchCategories, fetchCategoryById, createCategory, updateCategory, deleteCategory }
  from '../services/categoryService';
import { api, API_ENDPOINTS } from '../config/api';

describe('Category Service', () => {
  beforeEach(() => {
    // Clear mocks so each test starts fresh
    jest.clearAllMocks();

    // Silence console.error in tests that check error handling
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error to its original behavior after each test
    console.error.mockRestore();
  });

  describe('fetchCategories', () => {
    it('should fetch all categories successfully', async () => {
      const mockCategories = [
        { _id: '1', name: 'Electronics' },
        { _id: '2', name: 'Clothing' },
      ];

      api.get.mockResolvedValue({ data: { categories: mockCategories } });

      const result = await fetchCategories();

      expect(api.get).toHaveBeenCalledWith(API_ENDPOINTS.CATEGORIES.GET_ALL);
      expect(result).toEqual(mockCategories);
    });

    it('should return empty array when response has no categories', async () => {
      api.get.mockResolvedValue({ data: {} });

      const result = await fetchCategories();

      expect(result).toEqual([]);
    });

    it('should handle errors gracefully', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      const result = await fetchCategories();

      expect(console.error).toHaveBeenCalledWith('Error fetching categories:', mockError);
      expect(result).toBeUndefined();
    });
  });

  describe('fetchCategoryById', () => {
    it('should fetch a category by ID successfully', async () => {
      const categoryId = '123';
      const mockCategory = { _id: categoryId, name: 'Electronics' };
      api.get.mockResolvedValue({ data: { category: mockCategory } });

      const result = await fetchCategoryById(categoryId);

      expect(api.get).toHaveBeenCalledWith('/categories/123');
      expect(result).toEqual(mockCategory);
    });

    it('should return null when category is not found', async () => {
      const categoryId = '123';
      api.get.mockResolvedValue({ data: {} });

      const result = await fetchCategoryById(categoryId);

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const categoryId = '123';
      const mockError = new Error('Category not found');
      api.get.mockRejectedValue(mockError);

      const result = await fetchCategoryById(categoryId);

      expect(console.error).toHaveBeenCalledWith('Error fetching category by ID:', mockError);
      expect(result).toBeUndefined();
    });
  });

  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      const categoryData = { name: 'Test Category', description: 'Test description' };
      const mockCreatedCategory = { _id: '123', ...categoryData };
      api.post.mockResolvedValue({ data: { category: mockCreatedCategory } });

      const result = await createCategory(categoryData);

      expect(api.post).toHaveBeenCalledWith(API_ENDPOINTS.CATEGORIES.CREATE_CATEGORY, categoryData);
      expect(result).toEqual(mockCreatedCategory);
    });

    it('should return null when response has no category', async () => {
      const categoryData = { name: 'Test Category' };
      api.post.mockResolvedValue({ data: {} });

      const result = await createCategory(categoryData);

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const categoryData = { name: 'Test Category' };
      const mockError = new Error('Failed to create category');
      api.post.mockRejectedValue(mockError);

      const result = await createCategory(categoryData);

      expect(console.error).toHaveBeenCalledWith('Error creating category:', mockError);
      expect(result).toBeUndefined();
    });
  });

  describe('updateCategory', () => {
    it('should update a category successfully', async () => {
      const categoryId = '123';
      const categoryData = { name: 'Updated Category' };
      const mockUpdatedCategory = { _id: categoryId, ...categoryData };
      api.patch.mockResolvedValue({ data: { category: mockUpdatedCategory } });

      const result = await updateCategory(categoryId, categoryData);

      expect(api.patch).toHaveBeenCalledWith('/categories/123', categoryData);
      expect(result).toEqual(mockUpdatedCategory);
    });

    it('should return null when response has no category', async () => {
      const categoryId = '123';
      const categoryData = { name: 'Updated Category' };
      api.patch.mockResolvedValue({ data: {} });

      const result = await updateCategory(categoryId, categoryData);

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const categoryId = '123';
      const categoryData = { name: 'Updated Category' };
      const mockError = new Error('Failed to update category');
      api.patch.mockRejectedValue(mockError);

      const result = await updateCategory(categoryId, categoryData);

      expect(console.error).toHaveBeenCalledWith('Error updating category:', mockError);
      expect(result).toBeUndefined();
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category successfully', async () => {
      const categoryId = '123';
      const mockDeletedCategory = { _id: categoryId, name: 'Deleted Category' };
      api.delete.mockResolvedValue({ data: { category: mockDeletedCategory } });

      const result = await deleteCategory(categoryId);

      expect(api.delete).toHaveBeenCalledWith('/categories/123');
      expect(result).toEqual(mockDeletedCategory);
    });

    it('should return null when response has no category', async () => {
      const categoryId = '123';
      api.delete.mockResolvedValue({ data: {} });

      const result = await deleteCategory(categoryId);

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const categoryId = '123';
      const mockError = new Error('Failed to delete category');
      api.delete.mockRejectedValue(mockError);

      const result = await deleteCategory(categoryId);

      expect(console.error).toHaveBeenCalledWith('Error deleting category:', mockError);
      expect(result).toBeUndefined();
    });
  });
});
