import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  }
);

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
};

interface ProductsSliceState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsSliceState = {
  products: [],
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке продуктов";
      });
  },
});

export default productsSlice.reducer;
