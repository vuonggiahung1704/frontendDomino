import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

import { URL } from '../urlConfig';

// Get All User By Admin
export const getAllUser = (filter) => async (dispatch) => {
  try {
    const { keyword, currentPage, pageSize } = filter;

    dispatch({ type: ALL_USERS_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'));

    let link = `${URL}/api/admin/user?keyword=${keyword}&page=${currentPage}&pageSize=${pageSize}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${URL}/api/user/login`, {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (register) => async (dispatch) => {
  try {
    const { email, password, username } = register;
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post(`${URL}/api/user/register`, {
      email,
      password,
      username,
    });
    console.log(data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const isUserLoggedIn = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user) {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } else {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
