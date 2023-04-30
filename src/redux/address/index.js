import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../utils/baseUrls";

export const getMyAddresses = createAsyncThunk(
  "address/get-addresses",
  async (access_token, thunkAPI) => {
    try {
      const response = await axios.get(`${userUrl}addresses`, {
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

export const addAddress = createAsyncThunk(
  "address/add-address",
  async ({ addressData, access_token }) => {
    try {
      const { data } = await axios.post(`${userUrl}address`, addressData, {
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

export const standardizationAddress = createAsyncThunk(
  "address/standardization-addres",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.put(
        `${userUrl}address/standardization/${id}`,
        null,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      return data;
    } catch (err) {
      return console.log(err);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete-addres",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.delete(`${userUrl}address/${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (err) {
      return console.log(err);
    }
  }
);

const initialState = {
  addresses: [],
  standart: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses = action.payload.addresses;
      })
      .addCase(getMyAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addAddress.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses.push(action.payload.address);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(standardizationAddress.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(standardizationAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses = action.payload.addresses;
        state.standart = action.payload.standartedAddress;
      })
      .addCase(standardizationAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses = action.payload.addresses;
        state.standart = action.payload.addresses[0];
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default addressSlice.reducer;
