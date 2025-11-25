import { createSlice } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  totalProducts: number;
  selectedCategory: string;
  filterByPrice: string;
  search: string;
  categories: string[];
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  totalProducts: 0,
  selectedCategory: 'all',
  filterByPrice: 'default',
  search: '',
  categories: [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting'
  ]
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.total;
      state.hasMore = action.payload.products.length < action.payload.total;
      state.page = 2;
      state.loading = false;
      state.error = null;
    },
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload.products];
      state.hasMore = state.products.length < action.payload.total;
      state.page += 1;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
    setFilterByPrice: (state, action) => {
      state.filterByPrice = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
    incrementPage: (state) => {
      state.page += 1;
    }
  }
});

export const { 
  setProducts, 
  addProducts, 
  setLoading, 
  setError, 
  setSelectedCategory,
  setFilterByPrice,
  setSearch,
  resetProducts,
  incrementPage
} = productSlice.actions;

export default productSlice.reducer;