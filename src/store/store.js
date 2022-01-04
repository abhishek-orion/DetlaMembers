import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const appStore = createStore(reducers, {}, applyMiddleware(thunk));

export default appStore;
