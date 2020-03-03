import { useEffect, useReducer } from "react";
import { useStore } from "react-redux";

import reducer from "./reducer";
import { init, success, error } from "./actions";

const defaultState = {
  loading: false,
  error: false,
  data: null
};

export const useAsyncSelector = selector => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const store = useStore();

  useEffect(() => {
    dispatch(init());

    (async () => {
      try {
        const data = await selector(store.getState());
        dispatch(success(data));
      } catch (err) {
        dispatch(error(err));
      }
    })();
  }, [store, selector]);

  return state;
};
