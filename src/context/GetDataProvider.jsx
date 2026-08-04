import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById, getProductImageUrl, getProducts } from '../api/productsApi';

const AllDataContext = createContext();

export const GetDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllProduct = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const products = await getProducts();
      setData(Array.isArray(products) ? products : []);
      if (!products || products.length === 0) {
        setError('No products found');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);

  const value = useMemo(() => ({ data, fetchAllProduct, loading, error }), [data, fetchAllProduct, loading, error]);

  return <AllDataContext.Provider value={value}>{children}</AllDataContext.Provider>;
};

export const useAllProduct = () => useContext(AllDataContext);

const getByIdContext = createContext();

export const GetProductByIdProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchById = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const product = await getProductById(id);
      setData(product);
    } catch (err) {
      setError(err.message || 'Product not found');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({ data, fetchById, loading, error }), [data, fetchById, loading, error]);

  return <getByIdContext.Provider value={value}>{children}</getByIdContext.Provider>;
};

export const useProductById = () => useContext(getByIdContext);

const getImageByIdProvider = createContext();

export const GetImageByIdContext = ({ children }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchImage = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    setError('');

    try {
      const objectUrl = await getProductImageUrl(id);
      setImageUrl(objectUrl);
    } catch (err) {
      setError(err.message || 'Failed to fetch image');
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({ imageUrl, fetchImage, loading, error }), [imageUrl, fetchImage, loading, error]);

  return <getImageByIdProvider.Provider value={value}>{children}</getImageByIdProvider.Provider>;
};

export const useImage = () => useContext(getImageByIdProvider);
