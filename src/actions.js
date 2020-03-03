import { INIT, SUCCESS, ERROR } from "./action-types";

export const init = () => ({
  type: INIT
});

export const success = data => ({
  type: SUCCESS,
  payload: data
});

export const error = err => ({
  type: ERROR,
  payload: err
});
