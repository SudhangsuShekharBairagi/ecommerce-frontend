import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  checkout,
  getProductImageUrl,
} from '../api/productsApi';

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedProductId: null,
  selectedProductImageUrl: null,
  imageUrls: {},
  searchResults: [],
  searchLoading: false,
  searchError: null,
  checkoutStatus: null,
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const data = await getProducts();
  return Array.isArray(data) ? data : [];
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const product = await getProductById(id);
  return product;
});

export const fetchProductImage = createAsyncThunk('products/fetchProductImage', async (id) => {
  const imageUrl = await getProductImageUrl(id);
  return { id, imageUrl };
});

export const searchProductsThunk = createAsyncThunk('products/searchProducts', async (keyword) => {
  const data = await searchProducts(keyword);
 // Log the search results for debugging
  
  console.log('Search results:', data); 
  return Array.isArray(data) ? data : [];
});

export const createProductThunk = createAsyncThunk('products/createProduct', async (formData) => {
  const created = await createProduct(formData);
  return created;
});

export const updateProductThunk = createAsyncThunk('products/updateProduct', async ({ id, formData }) => {
  await updateProduct(id, formData);
  const updated = await getProductById(id);
  return updated;
});

export const deleteProductThunk = createAsyncThunk('products/deleteProduct', async (id) => {
  const message = await deleteProduct(id);
  return message;
});

export const checkoutThunk = createAsyncThunk('products/checkout', async ({ productId, quantity }) => {
  const message = await checkout(productId, quantity);
  return { productId, quantity, message };
});


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProductId = null;
      state.selectedProductImageUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.upsertOne(state, action.payload);
        state.selectedProductId = action.payload.id;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductImage.fulfilled, (state, action) => {
        state.selectedProductImageUrl = action.payload.imageUrl;
        state.imageUrls[action.payload.id] = action.payload.imageUrl;
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message;
        state.searchResults = [];
      })
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkoutThunk.pending, (state) => {
        state.loading = true;
        state.checkoutStatus = null;
        state.error = null;
      })
      .addCase(checkoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutStatus = action.payload.message;
      })
      .addCase(checkoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
       
  },
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
