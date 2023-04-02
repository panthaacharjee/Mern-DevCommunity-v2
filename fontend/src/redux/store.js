import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";
import {
  allPostReducer,
  createPostReducer,
  likeAndUnlikeReducer,
  myPostReducer,
  singlePostReducer,
} from "./reducers/postReducers";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  myPosts: myPostReducer,
  posts: allPostReducer,
  newPost: createPostReducer,
  likeAndUnlike: likeAndUnlikeReducer,
  post: singlePostReducer,
});
const middleware = [thunk];

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
