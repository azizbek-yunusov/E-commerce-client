import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authUrl, token, userUrl } from "../../utils/baseUrls";

export const signUp = createAsyncThunk(
  "auth/sign-up",
  async ({ formState }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authUrl}signup`, formState);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.err);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({ otp }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authUrl}verify`, { otp });
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.err);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async ({ formState }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authUrl}signin`, formState);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.err);
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refresh-token", async () => {
  try {
    if (token) {
      const response = await axios.post(`${authUrl}refreshtoken`, {
        refresh_token: token,
      });
      if (response.status === 401) {
        localStorage.removeItem("refresh_token");
      }
      return response.data;
    }
  } catch (error) {
    localStorage.removeItem("refresh_token");
    return console.log(error);
  }
});

export const googleOauth = createAsyncThunk(
  "auth/google-oauth",
  async ({ access_token }) => {
    try {
      const { data } = await axios.post(`${authUrl}google-oauth`, {
        access_token,
      });

      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/edit-profile",
  async ({ userData, access_token }) => {
    try {
      const { data } = await axios.put(`${userUrl}update`, userData, {
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

export const uploadAvatar = createAsyncThunk(
  "auth/upload-avatar",
  async ({ avatar, access_token }) => {
    try {
      const { data } = await axios.put(
        `${userUrl}avatar`,
        { avatar },
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

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async ({ passwords, access_token }) => {
    try {
      const { data } = await axios.put(`${userUrl}change-password`, passwords, {
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
  user: null,
  access_token: "",
  isLoading: false,
  isLogged: false,
  isError: false,
  isAdmin: false,
  isLoginShow: false,
  activModal: "signin",
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.isError = false;
      state.message = "";
    },
    toggleLoginModal: (state) => {
      state.isLoginShow = !state.isLoginShow;
    },
    setActiveModal: (state, action) => {
      state.activModal = action.payload;
    },
    signOut: (state) => {
      localStorage.removeItem("refresh_token");
      state.isLoading = false;
      state.isError = false;
      state.isLogged = false;
      state.user = null;
      state.access_token = "";
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLogged = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLogged = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.isLogged = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(googleOauth.pending, (state) => {})
      .addCase(googleOauth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(googleOauth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(editProfile.pending, (state) => {})
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = true;
        state.user = action.payload.user;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(uploadAvatar.pending, (state) => {})
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = true;
        state.user = action.payload.user;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.payload;
      })
      .addCase(() => {});
  },
});
export const { toggleLoginModal, clearErrors, setActiveModal, signOut } =
  authSlice.actions;

export default authSlice.reducer;
