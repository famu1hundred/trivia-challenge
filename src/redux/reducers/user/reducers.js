import { LOGIN, LOGOUT, REGISTER, ERROR, RESET, UPDATE_USER, LOAD_USERS } from "./types";

const user = (state = {
  users: [],
  user: {},
  error: null
}, action) => {
  switch (action.type) {
    case REGISTER: 
      return { ...state, user: action.user, error: null };
    case LOGIN: 
      return { ...state, user: action.user, error: null };
    case LOGOUT: 
      return { ...state, user: {}, error: null };
    case UPDATE_USER: 
      return { ...state, user: action.user, error: null };
    case LOAD_USERS: 
      return { ...state, users: action.users };
    case ERROR: 
      return { ...state, user: {}, error: action.error };
    case RESET: 
      return { user: {}, error: null };
    default: 
      return state;
  }
};

export default user;
