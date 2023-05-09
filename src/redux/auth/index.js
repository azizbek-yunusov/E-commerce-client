import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authUrl, token } from "../../utils/baseUrls";

export const signUp = createAsyncThunk(
  "auth/sign-up",
  async ({ formState }) => {
    try {
      const { data } = await axios.post(`${authUrl}signup`, formState);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({ otp }) => {
    try {
      const { data } = await axios.post(`${authUrl}verify`, { otp });
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async ({ formState }) => {
    try {
      const { data } = await axios.post(`${authUrl}signin`, formState);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refresh-token", async () => {
  try {
    if (token) {
      const { data } = await axios.post(`${authUrl}refreshtoken`, {
        refresh_token: token,
      });
      console.log(data);
      return data;
    }
  } catch (error) {
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
      console.log(data);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const signOut = createAsyncThunk("auth/sign-out", async () => {
  try {
    localStorage.removeItem("refresh_token");
    return null;
  } catch (error) {
    return console.log(error);
  }
});

const initialState = {
  user: null,
  access_token: "",
  isLoading: false,
  isLogged: false,
  isError: false,
  isAdmin: false,
  isLoginShow: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      !state.isLoginShow;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {})
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user = action.payload.user;
        // state.access_token = action.payload.access_token;
        // state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.error;
      })
      .addCase(verifyOtp.pending, (state) => {})
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
        state.message = action.error;
      })
      .addCase(signIn.pending, (state) => {})
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
        state.message = action.error;
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
        state.message = action.error;
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
        // state.message = action.error;
      })
      .addCase(signOut.pending, (state) => {})
      .addCase(signOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLogged = false;
        state.user = null;
        state.access_token = "";
        state.isAdmin = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogged = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});
export const { toggleLoginModal } = authSlice.actions;

export default authSlice.reducer;
