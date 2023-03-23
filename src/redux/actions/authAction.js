import axios from "axios";
import { authUrl } from "../../utils/baseUrls";

export const signIn = (formState) => async (dispatch) => {
  try {
    // dispatch({ type: "SIGN_IN_PENDING" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${authUrl}signin`, formState, config);
    dispatch({
      type: "SIGN_IN_FULFILLED",
      payload: {
        access_token: data.access_token,
        user: data.user,
        isAdmin: data.user.admin ? true : false,
      },
    });
    if (data.user.admin) {
      localStorage.setItem("auth", true);
    } else {
      localStorage.setItem("firstLogin", true);
    }
    dispatch({ type: "USER_FULFILLED", payload: data.user });
    dispatch({
      type: "ADDRESS_FULFILLED",
      payload: data.user.addresses,
    });
    dispatch({
      type: "CART_FULFILLED",
      payload: data.user.cart,
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data.user.favorites,
    });
  } catch (err) {
    dispatch({
      type: "SIGN_IN_REJECTED",
      payload: err.response.data.err,
    });
    console.log(err);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: "REFRESH_PENDING" });
    try {
      const { data } = await axios.post(`${authUrl}refreshtoken`, null);
      dispatch({
        type: "REFRESH_FULFILLED",
        payload: {
          access_token: data.access_token,
          user: data.user,
          isAdmin: data.user.admin === false,
        },
      });
      dispatch({ type: "USER_FULFILLED", payload: data.user });
      dispatch({
        type: "ADDRESS_FULFILLED",
        payload: data.user.addresses,
      });
      dispatch({
        type: "CART_FULFILLED",
        payload: data.user.cart,
      });
      dispatch({
        type: "FAVORITE_FULFILLED",
        payload: data.user.favorites,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

export const signOut = () => async (dispatch) => {
  await axios.get(`${authUrl}logout`);
  localStorage.removeItem("firstLogin");
  dispatch({ type: "SIGN_OUT" });
};
