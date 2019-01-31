import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import ProfileReducer from "./profileReducer";
import UserReducer from "./userReducer";
import PostReducer from "./postReducer";
import ChannelReducer from "./channelReducer";
import FeedbackReducer from "./feedbackReducer";
import TransactionReducer from "./transactionReducer";

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  users: UserReducer,
  posts: PostReducer,
  channels: ChannelReducer,
  feedback: FeedbackReducer,
  transactions: TransactionReducer
});
