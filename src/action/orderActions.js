import axios from 'axios';
import { URL } from '../urlConfig';
import { CLEAR_CART } from '../constants/cartConstants';
import {
  ORDER_ADMIN_FAIL,
  ORDER_ADMIN_REQUEST,
  ORDER_ADMIN_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.post(`${URL}/api/order/create`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.newOrder });
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.get(`${URL}/api/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderByUser = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.get(`${URL}/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderByAdmin = (filter) => async (dispatch) => {
  const { currentPage, pageSize } = filter;
  try {
    dispatch({ type: ORDER_ADMIN_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.get(
      `${URL}/api/orders?page=${currentPage}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ORDER_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDelivered = (id, isDelivered) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    const { data } = await axios.put(
      `${URL}/api/order/${id}/deliver`,
      { isDelivered },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
