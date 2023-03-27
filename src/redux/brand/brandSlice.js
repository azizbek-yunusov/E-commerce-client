import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { brandUrl } from "../../utils/baseUrls";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      const response = await axios.get(brandUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBrand = createAsyncThunk("brand/get-brand", async ({ id }) => {
  try {
    const { data } = await axios.get(`${brandUrl}brand/${id}`);
    return data;
  } catch (error) {
    return console.log(error);
  }
});
export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async ({ access_token, brandData }) => {
    try {
      const { data } = await axios.post(`${brandUrl}brand`, brandData, {
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
export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async ({ access_token, id, brandData }) => {
    try {
      const { data } = await axios.put(`${brandUrl}brand/${id}`, brandData, {
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

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async ({ access_token, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(`${brandUrl}brand/${id}`, {
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
export const selectedDeleteBrand = createAsyncThunk(
  "brand/selected-delete-brand",
  async ({ access_token, selectedIds }, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${brandUrl}brand/selected`,
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

const initialState = {
  brands: [],
  currentBrand: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentBrand = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload._id
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(selectedDeleteBrand.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectedDeleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload._id
        );
      })
      .addCase(selectedDeleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default brandSlice.reducer;
