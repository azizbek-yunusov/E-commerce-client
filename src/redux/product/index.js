import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, productUrl, reviewUrl } from "../../utils/baseUrls";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(productUrl, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getNewProducts = createAsyncThunk(
  "product/get-new-products",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`${productUrl}home/new`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getDiscountProducts = createAsyncThunk(
  "product/get-discount-products",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`${productUrl}home/discounts`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "product/get-search-products",
  async (
    { query = "", currentPage = 0, price = [0, 20000000], ratings = 0 },
    thunkAPI
  ) => {
    try {
      console.log("keyword:", query);
      let querys = `keyword=${query}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      const { data } = await axios.get(`${productUrl}search?${querys}`, config);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (slug) => {
    try {
      const { data } = await axios.get(`${productUrl}view/${slug}`, config);
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
  async ({ access_token, id }, thunkAPI) => {
    try {
      const response = await axios.patch(`${reviewUrl}${id}/unlike`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const replyComment = createAsyncThunk(
  "product/reply-review",
  async ({ access_token, id, text }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${reviewUrl}reply/${id}`,
        { text },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  products: [],
  newProducts: [],
  discountProducts: [],
  filteredProducts: [],
  product: null,
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
      .addCase(getNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newProducts = action.payload;
      })
      .addCase(getNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getDiscountProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDiscountProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.discountProducts = action.payload;
      })
      .addCase(getDiscountProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.filteredProducts = action.payload.products;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
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
        state.product = action.payload.product;
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
      .addCase(addReview.fulfilled, (state) => {
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
        // state.isLoading = true;
      })
      .addCase(likeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const likedReview = action.payload;
        const reviewIndex = state.reviews.findIndex(
          (rev) => rev._id === likedReview._id
        );
        if (reviewIndex !== -1) {
          state.reviews[reviewIndex] = likedReview;
        }
      })
      .addCase(likeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(unLikeReview.pending, (state) => {
        state.isSuccess = false;
        // state.isLoading = true;
      })
      .addCase(unLikeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const unLikedReview = action.payload;
        const reviewIndex = state.reviews.findIndex(
          (rev) => rev._id === unLikedReview._id
        );
        if (reviewIndex !== -1) {
          state.reviews[reviewIndex] = unLikedReview;
        }
      })
      .addCase(unLikeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(replyComment.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const replyComment = action.payload;
        const reviewIndex = state.reviews.findIndex(
          (rev) => rev._id === replyComment._id
        );
        if (reviewIndex !== -1) {
          state.reviews[reviewIndex] = replyComment;
        }
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(() => {});
  },
});

export default productSlice.reducer;
