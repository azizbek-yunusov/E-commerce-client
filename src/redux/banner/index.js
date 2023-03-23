import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { bannerUrl } from "../../utils/baseUrls";

export const getBanners = createAsyncThunk(
  "banner/get-banners",
  async (thunkAPI) => {
    try {
      const response = await axios.get(bannerUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBanner = createAsyncThunk("banner/get-banner", async ({ id }) => {
  try {
    const { data } = await axios.get(`${bannerUrl}${id}`);
    return data;
  } catch (error) {
    return console.log(error);
  }
});
export const createBanner = createAsyncThunk(
  "banner/create-banner",
  async ({ access_token, bannerData }) => {
    try {
      const { data } = await axios.post(bannerUrl, bannerData, {
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
export const updateBanner = createAsyncThunk(
  "banner/update-banner",
  async ({ access_token, id, bannerData }) => {
    try {
      const { data } = await axios.put(`${bannerUrl}${id}`, bannerData, {
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

export const deleteBanner = createAsyncThunk(
  "banner/delete-banner",
  async ({ access_token, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(`${bannerUrl}${id}`, {
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
export const selectedDeleteBanner = createAsyncThunk(
  "banner/selected-delete-banner",
  async ({ access_token, selectedIds }, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${bannerUrl}/selected`,
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
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners.push(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
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
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedbanner = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners = state.banners.filter(
          (banner) => banner._id !== action.payload._id
        );
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(selectedDeleteBanner.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectedDeleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners = state.banners.filter(
          (banner) => banner._id !== action.payload._id
        );
      })
      .addCase(selectedDeleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default bannerSlice.reducer;
