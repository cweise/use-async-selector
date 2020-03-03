import { INIT, SUCCESS, ERROR } from "./action-types";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case INIT:
      return {
        ...state,
        loading: true
      };
    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        data: null
      };
    default:
      return state;
  }
};

export default reducer;
