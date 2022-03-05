import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const logger = (store) => (next) => (action) => {
  // console.group(action.type);
  // console.info("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
  // console.groupEnd();
  return result;
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
