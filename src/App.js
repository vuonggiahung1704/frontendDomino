import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isUserLoggedIn } from './action/userActions';
import Account from './page/admin/Account';
import Dashboard from './page/admin/Dashboard';
import OrderAdmin from './page/admin/Order';
import ProductAdmin from './page/admin/Products';
import AddProduct from './page/admin/Products/AddProduct';
import EditProduct from './page/admin/Products/EditProduct';
import {
  Cart,
  Confirm,
  Home,
  Login,
  Order,
  OrderMine,
  Products,
} from './page/client';
import AdminRoute from './page/HOC/AdminRoute';
import PageNotFound from './page/HOC/PageNotFound';
import PrivateRoute from './page/HOC/PrivateRoute';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <BrowserRouter>
      <Routes>
        {/* CLIENT */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/order/:orderID"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/mine"
          element={
            <PrivateRoute>
              <OrderMine />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <PrivateRoute>
              <Confirm />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders/:orderID"
          element={
            <AdminRoute>
              <OrderAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/account"
          element={
            <AdminRoute>
              <Account />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
