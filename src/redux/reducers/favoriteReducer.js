const initialState = {
  favorites: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAVORITE_PENDING":
      return {
        isLoading: true,
      };
    case "FAVORITE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        favorites: action.payload,
      };
    case "FAVORITE_REJECTED":
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

export default favoriteReducer;
