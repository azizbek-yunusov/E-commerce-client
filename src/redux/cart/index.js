import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../utils/baseUrls";
import { refreshToken } from "../auth";

export const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.post(`${userUrl}cart/${id}`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const decrementQtyItem = createAsyncThunk(
  "cart/decrement-quantity",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.put(`${userUrl}decr/${id}`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/delete-from-cart",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.put(`${userUrl}cart/${id}`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear-cart",
  async (access_token) => {
    try {
      console.log(access_token);
      const { data } = await axios.put(`${userUrl}cart`, null, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  cart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload.cart;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload.cart.products;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.err;
      })

      .addCase(decrementQtyItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(decrementQtyItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload.cart.products;
      })
      .addCase(decrementQtyItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload.cart.products;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default cartSlice.reducer;
