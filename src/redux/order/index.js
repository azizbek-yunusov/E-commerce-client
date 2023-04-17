import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { orderUrl } from "../../utils/baseUrls";

export const getMyOrders = createAsyncThunk(
  "order/get-my-orders",
  async (access_token, thunkAPI) => {
    try {
      const response = await axios.get(`${orderUrl}my`, {
        headers: {
          Authorization: access_token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const newOrder = createAsyncThunk(
  "order/new-order",
  async ({ access_token, orderData }) => {
    try {
      const { data } = await axios.post(orderUrl, orderData, {
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

const initialState = {
  orders: [],
  myOrders: [],
  order: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(newOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.orders.push(action.payload);
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default orderSlice.reducer;
