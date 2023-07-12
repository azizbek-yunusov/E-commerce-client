import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productUrl } from "../../utils/baseUrls";

export const getSearchProducts = createAsyncThunk(
  "filter/get-search-products",
  async (
    { query = "", currentPage = 0, price = [0, 20000000], ratings = 0 },
    thunkAPI
  ) => {
    try {
      if (price[0] == undefined) {
        price = [0, 20000000];
      }
      let querys = `keyword=${query}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      const { data } = await axios.get(`${productUrl}search?${querys}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

const initialState = {
  products: [],
  count: 0,
  perPage: 0,
  rangePrice: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    gteLtePrice: (state, action) => {
      state.rangePrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = payload.products;
        // state.count = payload.filteredProductsCount;
        // state.perPage = payload.resultPerPage;
        const maxPriceProduct = payload.products.reduce(
          (maxProduct, product) => {
            if (product.price > maxProduct.price) {
              return product;
            }
            return maxProduct;
          }
        );
        const minPriceProduct = payload.products.reduce(
          (minProduct, product) => {
            if (product.price < minProduct.price) {
              return product;
            }
            return minProduct;
          }
        );
        let rangePrice = [minPriceProduct.price, maxPriceProduct.price];
        state.rangePrice = rangePrice;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(() => {});
  },
});
export const { gteLtePrice } = filterSlice.actions;

export default filterSlice.reducer;
