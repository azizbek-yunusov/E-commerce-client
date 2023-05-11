import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../utils/baseUrls";
import { refreshToken } from "../auth";

export const addToFavorite = createAsyncThunk(
  "favorite/add-to-favorite",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.post(`${userUrl}favorite/${id}`, null, {
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

export const deleteFromFavorite = createAsyncThunk(
  "favorite/delete-from-favorite",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.put(`${userUrl}favorite/${id}`, null, {
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

export const clearFavorite = createAsyncThunk(
  "favorite/clear-favorite",
  async (access_token) => {
    try {
      console.log(access_token);
      const { data } = await axios.put(`${userUrl}favorites`, null, {
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

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const favoriteSlice = createSlice({
  name: "favorite",
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
        state.favorites = action.payload.favorites;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.favorites = action.payload.favorite.products;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.favorites = action.payload.favorite.products;
      })
      .addCase(deleteFromFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(clearFavorite.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(clearFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.favorites = [];
      })
      .addCase(clearFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default favoriteSlice.reducer;
