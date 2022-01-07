import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  orderByAdminReducer,
  orderByUserReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailReducer,
} from './reducers/orderReducers';
import {
  categoryReducer,
  newProductReducer,
  outOfStockReducer,
  productActionReducer,
  productDetailsReducer,
  productsReducer,
} from './reducers/productReducers';
import { allUserByAdminReducer, userReducer } from './reducers/userReducers';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const reducer = combineReducers({
  user: userReducer,
  allUser: allUserByAdminReducer,
  getCategories: categoryReducer,
  getProducts: productsReducer,
  getProduct: productDetailsReducer,
  newProduct: newProductReducer,
  actionProduct: productActionReducer,
  cart: cartReducer,
  order: orderCreateReducer,
  getOrderId: orderDetailReducer,
  getOrderMine: orderByUserReducer,
  getOrderAdmin: orderByAdminReducer,
  isDeliveredOrder: orderDeliverReducer,
  stock: outOfStockReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
