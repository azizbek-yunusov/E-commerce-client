const initialState = {
  addresses: [],
  standart: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDRESS_PENDING":
      return {
        isLoading: true,
      };
    case "ADDRESS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        addresses: action.payload,
        standart: action.payload[0],
      };
    case "ADDRESS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.error
      };

    default:
      return state;
  }
};

export default addressReducer;
