import React, { useState } from 'react';
import { sidebar } from './template';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT_SUCCESS } from '../../constants/userConstants';
import { RESET_CART } from '../../constants/cartConstants';
import ModalOrder from '../ModalOrder';
import './styles.css';
import ModalProduct from '../ModalProduct';

const LayoutAdmin = (props) => {
  const dispatch = useDispatch();

  let location = useLocation();

  const [toggle, setToggle] = useState(false);

  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingInfo');
    dispatch({ type: RESET_CART });
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <>
      <div className="admin-container">
        <div className={`navigation ${toggle ? 'active' : ''}`}>
          <ul>
            {sidebar.map((item, index) => (
              <li
                className={
                  location.pathname.includes(item.link) ? 'hovered' : ''
                }
                key={index}
              >
                <NavLink to={item.link}>
                  <span className="icon">{item.icon}</span>
                  <span className="title">{item.title}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/">
                <span className="icon">
                  <i className="bx bx-store-alt"></i>
                </span>
                <span className="title">Shop</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" onClick={handleLogout}>
                <span className="icon out">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="title">Đăng xuất</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className={`admin-main ${toggle ? 'active' : ''}`}>
        <div className="topbar">
          <div className="toggle" onClick={() => setToggle(!toggle)}>
            <i className="bx bx-menu"></i>
          </div>
        </div>
        {props.children}
      </div>
      <ModalOrder />
      {/* <ModalProduct /> */}
    </>
  );
};

export default LayoutAdmin;
