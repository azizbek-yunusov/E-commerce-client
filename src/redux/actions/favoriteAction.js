import axios from "axios";
import { userUrl } from "../../utils/baseUrls";

export const addToFavorite = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.post(`${userUrl}fovorite/${id}`, null, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavoriteItem = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.delete(`${userUrl}fovorite/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const cleanWishList = (access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.put(`${userUrl}fovorites`, null, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};