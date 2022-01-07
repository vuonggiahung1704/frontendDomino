import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, login, register } from '../../../action/userActions';
import { Layout } from '../../../components';
import { useNotification } from '../../../components/Notifications/NotificationProvider';
import validator from 'validator';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const callNotification = useNotification();

  const [isRegister, setIsRegister] = useState(false);

  const { isAuthenticated, user, error } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [validationMsgLOG, setValidationMsgLOG] = useState('');
  const [validationMsgREG, setValidationMsgREG] = useState('');

  const [userREG, setUserREG] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserREG({ ...userREG, [id]: value });
  };

  const validateAllLOG = () => {
    const msg = {};
    if (!validator.isEmail(loginEmail)) {
      msg.emailLG = 'Vui lòng nhập email hợp lệ';
    }

    if (validator.isEmpty(loginPassword)) {
      msg.passwordLG = 'Vui lòng nhập mật khẩu';
    }
    setValidationMsgLOG(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const validateAllREG = () => {
    const msg = {};
    if (validator.isEmpty(userREG.username)) {
      msg.username = 'Vui lòng nhập tên người dùng';
    }
    if (!validator.isEmail(userREG.email)) {
      msg.email = 'Vui lòng nhập email hợp lệ';
    }

    if (validator.isEmpty(userREG.password)) {
      msg.password = 'Vui lòng nhập mật khẩu';
    }
    setValidationMsgREG(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAllLOG();
    if (!isValid) return;
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAllREG();
    if (!isValid) return;
    dispatch(register(userREG));
  };

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const handleNewNotification = (type, message) => {
    callNotification({
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      handleNewNotification('err', error);
    }

    if (isAuthenticated) {
      redirect !== '/' ? navigate(`/${redirect}`) : navigate(redirect);
    }
  }, [dispatch, navigate, redirect, error, isAuthenticated, user]);

  return (
    <Layout>
      <div className="login__page">
        <div className="login__hotline">
          <Link to="/" className="logo">
            <img src="https://dominos.vn/img/logo/domino.svg" alt="" />
          </Link>
          <div>
            <i className="bx bxs-phone"></i> Hotline đặt hàng
          </div>
          <div>
            <span>1900 6099</span>
          </div>
        </div>
        <div className="login__form">
          <div className="form__header">
            <span
              className={`${isRegister ? '' : 'active'}`}
              onClick={() => setIsRegister(false)}
            >
              Đăng nhập
            </span>
            <span
              className={`${isRegister ? 'active' : ''}`}
              onClick={() => setIsRegister(true)}
            >
              Đăng ký
            </span>
          </div>

          <div className="form">
            <form
              className={`form__input login ${isRegister ? '' : 'active'}`}
              onSubmit={loginSubmit}
            >
              <div className="form__group">
                <label>Email</label>
                <input
                  type="text"
                  className={validationMsgLOG.emailLG ? 'err' : ''}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Nhập email"
                />
                {validationMsgLOG.emailLG ? (
                  <div className="err__input">*{validationMsgLOG.emailLG}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className={validationMsgLOG.passwordLG ? 'err' : ''}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
                {validationMsgLOG.passwordLG ? (
                  <div className="err__input">
                    *{validationMsgLOG.passwordLG}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <button type="submit" className="btn btn__red">
                Đăng nhập
              </button>
              <div className="forget__password">Quên mật khẩu</div>
            </form>
            <form
              className={`form__input register ${isRegister ? 'active' : ''}`}
              onSubmit={registerSubmit}
            >
              <div className="form__group">
                <label>Username</label>
                <input
                  type="text"
                  value={userREG.username || ''}
                  id="username"
                  className={validationMsgREG.username ? 'err' : ''}
                  onChange={onChangeInput}
                  placeholder="Nhập họ tên"
                />
                {validationMsgREG.username ? (
                  <div className="err__input">*{validationMsgREG.username}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group">
                <label>Email</label>
                <input
                  type="email"
                  value={userREG.email || ''}
                  id="email"
                  className={validationMsgREG.email ? 'err' : ''}
                  onChange={onChangeInput}
                  placeholder="Nhập email"
                />
                {validationMsgREG.email ? (
                  <div className="err__input">*{validationMsgREG.email}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={userREG.password || ''}
                  id="password"
                  className={validationMsgREG.password ? 'err' : ''}
                  onChange={onChangeInput}
                  placeholder="Nhập mật khẩu"
                />
                {validationMsgREG.password ? (
                  <div className="err__input">*{validationMsgREG.password}</div>
                ) : (
                  ''
                )}
              </div>
              <button type="submit" className="btn btn__red">
                Tạo tài khoản
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
