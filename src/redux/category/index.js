import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryUrl, config } from "../../utils/baseUrls";

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (thunkAPI) => {
    try {
      const response = await axios.get(categoryUrl, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/get-category",
  async ({ slug }) => {
    try {
      const { data } = await axios.get(`${categoryUrl}client/${slug}`, config);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const initialState = {
  categories: [],
  category: null,
  subCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.category = action.payload.category;
        state.subCategories = action.payload.subCategories;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default categorySlice.reducer;
