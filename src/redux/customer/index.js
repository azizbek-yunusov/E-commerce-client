import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../utils/baseUrls";

export const getUsers = createAsyncThunk(
  "user/get-users",
  async (access_token, thunkAPI) => {
    try {
      const { data } = await axios.get(userUrl, {
        headers: {
          Authorization: access_token,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);
export const getUser = createAsyncThunk(
  "user/get-user",
  async ({ id, access_token }) => {
    try {
      const { data } = await axios.get(`${userUrl}${id}`, {
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
export const createUser = createAsyncThunk(
  "user/create-user",
  async ({ access_token, userData }) => {
    try {
      const { data } = await axios.post(userUrl, userData, {
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

export const updateUser = createAsyncThunk(
  "user/update-user",
  async ({ access_token, id, userData }) => {
    try {
      const { data } = await axios.put(`${userUrl}${id}`, userData, {
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

export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async ({ access_token, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(`${userUrl}${id}`, {
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
export const selectedDeleteUser = createAsyncThunk(
  "user/selected-delete-user",
  async ({ access_token, selectedIds }, thunkApi) => {
    try {
      const { data } = await axios.post(`${userUrl}selected`, selectedIds, {
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
  users: [],
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(selectedDeleteUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectedDeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(selectedDeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default customerSlice.reducer;
