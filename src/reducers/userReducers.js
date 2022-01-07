import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUserByAdminReducer = (state = { users: [] }, action) => {
  console.log(action);
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return { loading: true };
    case ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        usersCount: action.payload.usersCount,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
      };
    case ALL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
