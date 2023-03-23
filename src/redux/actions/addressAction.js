import axios from "axios";
import { userUrl } from "../../utils/baseUrls";


export const newAddress = (addressData, access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "ADDRESS_PENDING",
    });
    const { data } = await axios.post(`${userUrl}address`, addressData, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "ADDRESS_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = (id, access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "ADDRESS_PENDING",
    });
    const { data } = await axios.delete(`${userUrl}address/${id}`, {
      headers: { Authorization: access_token },
    });
    dispatch({
      type: "ADDRESS_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};