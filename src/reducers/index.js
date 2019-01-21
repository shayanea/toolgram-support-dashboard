import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import ProfileReducer from "./profileReducer";

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer
});
