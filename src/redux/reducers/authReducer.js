const initialState = {
  user: [],
  access_token: "",
  isLoading: false,
  isLogged: false,
  isAdmin: false,
  isError: false,
  message: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_PENDING":
    case "REFRESH_PENDING":
      return {
        isLoading: true,
      };
    case "SIGN_IN_FULFILLED":
    case "REFRESH_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        isError: false,
        access_token: action.payload.access_token,
        user: action.payload.user,
        isAdmin: action.payload.user.admin ? true : false,
      };
    case "SIGN_IN_REJECTED":
    case "REFRESH_REJECTED":
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        isError: true,
        message: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        isError: false,
        message: "",
      };
    case "SIGN_OUT": {
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        isAdmin: false,
        isError: false,
        user: [],
        access_token: "",
        message: "",
      };
    }
    default:
      return state;
  }
};

export default authReducer;
