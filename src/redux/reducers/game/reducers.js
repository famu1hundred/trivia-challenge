import { NEW_GAME, LOAD_QUESTIONS, END_GAME } from "./types";

const game = (state = {
  game: {},
  error: null
}, action) => {
  switch (action.type) {
    case NEW_GAME: 
      return { ...state, game: action.game };
    case END_GAME: 
      return { ...state, game: {} };
    case LOAD_QUESTIONS: 
      return { ...state, game: action.game };
    default: 
      return state;
  }
};

export default game;
