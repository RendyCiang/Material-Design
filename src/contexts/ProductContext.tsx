import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  getProductById: (id: string) => Product | undefined;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // In a real app, we would fetch from an API
        // For demo purposes, we'll use our mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setProducts(mockProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Get featured products (products with discount)
  const featuredProducts = products.filter(product => product.discount > 0);

  // Get new arrivals (sort by newest first based on id for this demo)
  const newArrivals = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 4);

  const value = {
    products,
    featuredProducts,
    newArrivals,
    getProductById,
    loading,
    error,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};