import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productUrl, reviewUrl } from "../../utils/baseUrls";

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

export const addReview = createAsyncThunk(
  "product/add-review",
  async ({ access_token, productId, rating, comment, pictures }, thunkApi) => {
    try {
      const { data } = await axios.post(
        reviewUrl,
        {
          productId,
          rating,
          comment,
          pictures,
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

export const likeReview = createAsyncThunk(
  "product/like-review",
  async ({ access_token, id }, thunkApi) => {
    try {
      const response = await axios.patch(`${reviewUrl}${id}/like`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const unLikeReview = createAsyncThunk(
  "product/unlike-review",
  async ({ access_token, id }, thunkApi) => {
    try {
      const response = await axios.patch(`${reviewUrl}${id}/unlike`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const initialState = {
  products: [],
  productDetails: {
    product: null,
    reviews: [],
  },
  reviews: [],
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

      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productDetails = action.payload;
        state.reviews = action.payload.reviews;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addReview.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.reviews = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(likeReview.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(likeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.reviews = action.payload;
      })
      .addCase(likeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(unLikeReview.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(unLikeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.reviews = action.payload;
      })
      .addCase(unLikeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(() => {});
  },
});

export default productSlice.reducer;
