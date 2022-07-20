import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateDetailsReducer,
  userEmailReducer,
  userVerifyReducer,
  userResetEmailReducer,
  userResetPasswordReducer,
} from "./reducers/userReducers";
import {
  playlistsGetReducer,
  playlistGetReducer,
  playlistAddReducer,
  playlistDeleteReducer,
  playlistEditReducer,
} from "./reducers/playlistReducers";
import { imagesGetReducer } from "./reducers/imageReducers";
import { songRemoveReducer } from "./reducers/songReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  userEmail: userEmailReducer,
  userVerify: userVerifyReducer,
  userResetEmail: userResetEmailReducer,
  userResetPassword: userResetPasswordReducer,
  playlistsGet: playlistsGetReducer,
  playlistGet: playlistGetReducer,
  playlistAdd: playlistAddReducer,
  playlistDelete: playlistDeleteReducer,
  playlistEdit: playlistEditReducer,
  imagesGet: imagesGetReducer,
  songRemove: songRemoveReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
