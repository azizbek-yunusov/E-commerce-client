import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { bannerUrl, config } from "../../utils/baseUrls";

export const getBanners = createAsyncThunk(
  "banner/get-banners",
  async (thunkAPI) => {
    try {
      const response = await axios.get(bannerUrl, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBanner = createAsyncThunk(
  "banner/get-banner",
  async ({ id }) => {
    try {
      const { data } = await axios.get(`${bannerUrl}${id}`, config);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const initialState = {
  banners: [],
  currentBanner: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentBanner = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default bannerSlice.reducer;
