import { combineReducers } from "redux";
import memberReducer from "./membersReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  members: memberReducer,
  auth: authReducer,
});

export default reducers;
