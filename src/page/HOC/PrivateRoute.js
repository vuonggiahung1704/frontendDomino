import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const token = JSON.parse(localStorage.getItem('token'));

  return user && token ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
