import { combineReducers } from "redux";
import app from "./app/reducers";
import user from "./user/reducers";
import game from "./game/reducers";


export default combineReducers({
  app,
  user,
  game
});

