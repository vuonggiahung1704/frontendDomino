import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS } from '../../constants/userConstants';
import { RESET_CART } from '../../constants/cartConstants';

const Navbar = ({ isShowMenu, handle }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const totalItem = (list) => list.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingInfo');
    dispatch({ type: RESET_CART });
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <header className="l-header" id="header">
      <nav className="nav bd-container">
        <Link to="/" className="nav__logo">
          <img
            src="https://dominos.vn/img/logo/domino-horizontal-dark.svg"
            alt=""
          />
        </Link>

        <div className={`nav__menu ${isShowMenu ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Trang chủ
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/products" className="nav__link">
                Thực đơn
              </Link>
            </li>
            <li className="nav__item">
              <Link to="#about" className="nav__link">
                Về chúng tôi
              </Link>
            </li>
            <li className="nav__item">
              <Link to="#contact" className="nav__link">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav__icons" id="nav-icon">
          <ul className="nav__list__icons">
            {isAuthenticated ? (
              <>
                <li className="nav__item" id="user">
                  <Link to="#" className="nav__link">
                    <i className="bx bx-user"></i>
                  </Link>
                  <ul className="dropdown-user">
                    {user.isAdmin && (
                      <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </li>
                    )}
                    <li>
                      <Link to="/order/mine">Đơn hàng của tôi</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={logoutHandler}>
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  <i className="bx bx-log-in-circle"></i>
                </Link>
              </li>
            )}
            <li className="nav__item" id="cart">
              <Link to="/cart" className="nav__link">
                <i className="bx bx-basket"></i>
                {totalItem(cartItems) > 0 ? (
                  <div className="badge">{totalItem(cartItems)}</div>
                ) : (
                  ''
                )}
              </Link>
            </li>
          </ul>
          <div className="nav__toggle" onClick={() => handle(!isShowMenu)}>
            <i className="bx bx-menu"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
