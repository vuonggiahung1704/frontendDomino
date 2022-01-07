import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const token = JSON.parse(localStorage.getItem('token'));

  return token && user?.isAdmin ? children : <Navigate to="/login" />;
};
export default AdminRoute;
