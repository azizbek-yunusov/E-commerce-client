import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryUrl } from "../../utils/baseUrls";

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (thunkAPI) => {
    try {
      const response = await axios.get(categoryUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getCategory = createAsyncThunk(
  "category/get-category",
  async ({ id }) => {
    try {
      const { data } = await axios.get(`${categoryUrl}${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const createCategory = createAsyncThunk(
  "category/create-category",
  async ({ access_token, categoryData }) => {
    try {
      const { data } = await axios.post(categoryUrl, categoryData, {
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
export const updateCategory = createAsyncThunk(
  "category/update-category",
  async ({ access_token, id, categoryData }) => {
    try {
      const { data } = await axios.put(`${categoryUrl}${id}`, categoryData, {
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

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async ({ access_token, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(`${categoryUrl}${id}`, {
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
export const selectedDeleteCategory = createAsyncThunk(
  "category/selected-delete-category",
  async ({ access_token, selectedIds }, thunkApi) => {
    try {
      const { data } = await axios.post(`${categoryUrl}selected`, selectedIds, {
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
  categories: [],
  currentCategory: null,
  items: [],
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
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
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
        state.currentCategory = action.payload.category;
        state.items = action.payload.subCategorys;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedcategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(selectedDeleteCategory.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectedDeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(selectedDeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default categorySlice.reducer;
