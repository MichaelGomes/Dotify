import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_RESET,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_EMAIL_FAIL,
  USER_EMAIL_REQUEST,
  USER_EMAIL_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_RESET_EMAIL_FAIL,
  USER_RESET_EMAIL_REQUEST,
  USER_RESET_EMAIL_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_REQUEST:
      return { loading: true };
    case USER_EMAIL_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userResetEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_EMAIL_REQUEST:
      return { loading: true };
    case USER_RESET_EMAIL_SUCCESS:
      return { loading: false, success: true };
    case USER_RESET_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
