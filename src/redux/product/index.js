import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productUrl } from "../../utils/baseUrls";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(productUrl);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);
export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id) => {
    try {
      const { data } = await axios.get(`${productUrl}${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/create-product",
  async ({ access_token, productData }) => {
    try {
      const { data } = await axios.post(productUrl, productData, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update-product",
  async ({ access_token, id, productData }) => {
    try {
      const { data } = await axios.put(`${productUrl}${id}`, productData, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async ({ access_token, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(`${productUrl}${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const selectedDeleteProduct = createAsyncThunk(
  "product/selected-delete-product",
  async ({ access_token, selectedIds }, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${productUrl}selected`,
        selectedIds,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const addReview = createAsyncThunk(
  "product/add-review",
  async ({ access_token, productId, rating, comment, pictures }, thunkApi) => {
    try {
      const { data } = await axios.put(
        `${productUrl}review`,
        {
          productId,
          rating,
          comment,
          pictures
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      return data.product;
    } catch (error) {
      return console.log(error);
    }
  }
);

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(selectedDeleteProduct.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectedDeleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(selectedDeleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default productSlice.reducer;
