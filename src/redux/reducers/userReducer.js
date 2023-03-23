const initialState = {
  user: [],
  cart: [],
  favorites: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_PENDING":
      return {
        isLoading: true,
      };
    case "USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        cart: action.payload.cart,
        favorites: action.payload.favorites,
      };
    case "USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default userReducer;
