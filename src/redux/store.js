import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];

const store = createStore(
  rootReducer, {}, compose(applyMiddleware(...middlewares))
)

export default store;
