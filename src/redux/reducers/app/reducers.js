import { LOADING } from "./types";

const app = (state = {
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case LOADING: 
      return { ...state, loading: action.loading };
    default: 
      return state;
  }
};

export default app;
