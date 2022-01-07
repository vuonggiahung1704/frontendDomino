import axios from 'axios';
import { URL } from '../urlConfig';

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  STOCK_REQUEST,
  STOCK_SUCCESS,
  STOCK_FAIL,
} from '../constants/productConstants';
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
} from '../constants/userConstants';

// Get Category
export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });

    const { data } = await axios.get(`${URL}/api/product/category`);

    dispatch({
      type: CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Get Out Of Stock
export const getOutOfStock = () => async (dispatch) => {
  try {
    dispatch({ type: STOCK_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'));

    const { data } = await axios.get(`${URL}/api/admin/product/stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: STOCK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Get All Products
export const getProduct = (filter) => async (dispatch) => {
  try {
    const { keyword, currentPage, pageSize, category, sale, order } = filter;

    dispatch({ type: ALL_PRODUCT_REQUEST });
    // const token = JSON.parse(localStorage.getItem('token'));

    let link = `${URL}/api/product?keyword=${keyword}&page=${currentPage}&pageSize=${pageSize}&category=${category}&order=${order}`;

    if (sale) {
      link = `${URL}/api/product?keyword=${keyword}&page=${currentPage}&pageSize=${pageSize}&category=${category}&sale=0&order=${order}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL}/api/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Product
export const newProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.post(`${URL}/api/admin/product/create`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Product
export const updateProduct = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.put(`${URL}/api/admin/product/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product
export const deleteProduct = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.delete(`${URL}/api/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
