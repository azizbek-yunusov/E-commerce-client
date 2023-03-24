const initialState = {
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_PENDING":
      return {
        isLoading: true,
      };
    case "CART_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        cart: action.payload,
      };
    case "CART_REJECTED":
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.error,
      };

    default:
      return state;
  }
};

export default cartReducer;
