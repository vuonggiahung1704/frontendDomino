import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../../action/cartActions';
import { Layout, Loading } from '../../../components';
import { generatePublicUrl } from '../../../urlConfig';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import './styles.css';
import { createOrder } from '../../../action/orderActions';
import { ORDER_CREATE_RESET } from '../../../constants/orderConstants';
import { useNotification } from '../../../components/Notifications/NotificationProvider';
import { URL } from '../../../urlConfig';

const Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = useNotification();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { order, loading, success, error } = useSelector(
    (state) => state.order
  );

  const [sdkReady, setSdkReady] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [info, setInfo] = useState(
    shippingInfo?.name
      ? shippingInfo
      : {
          name: '',
          phone: '',
          address: '',
        }
  );

  const [validationMsg, setValidationMsg] = useState('');

  const totalItem = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = Number(
    cartItems
      .reduce(
        (acc, item) =>
          acc + (item.price - item.price * (item.sale / 100)) * item.qty,
        0
      )
      .toFixed(2)
  );

  const calcPrice = (item) =>
    (item.price - item.price * (item.sale / 100)) * item.qty;

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setInfo({ ...info, [id]: value });
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    dispatch(saveShippingInfo(info));
    setIsPay(true);
  };

  const validateAll = () => {
    const msg = {};
    if (validator.isEmpty(info.name)) {
      msg.name = 'Vui l??ng nh???p h??? v?? t??n';
    }
    if (
      validator.isEmpty(info.phone) ||
      info.phone.length < 10 ||
      info.phone.length > 10
    ) {
      msg.phone = 'Vui l??ng nh???p s??? ??i???n tho???i h???p l???';
    }

    if (validator.isEmpty(info.address)) {
      msg.address = 'Vui l??ng nh???p ?????a ch???';
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const successPaymentHandler = (paymentResult) => {
    const newOrder = {
      orderItems: cartItems,
      info: shippingInfo,
      totalPrice: totalPrice,
      paymentResult: {
        id: paymentResult.id,
        status: paymentResult.status,
        email_address: paymentResult.payer.email_address,
        update_time: paymentResult.update_time,
      },
    };
    dispatch(createOrder(newOrder));
  };
  const errorHandler = (error) => {
    console.log(error);
  };

  const handleNewNotification = (type, message) => {
    callNotification({
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(`${URL}/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order) {
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
    if (success) {
      handleNewNotification('success', '?????t h??ng th??nh c??ng');
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (error) {
      handleNewNotification('err', 'X???y ra l???i!');
    }
  }, [dispatch, error, sdkReady, success, order, navigate]);

  return (
    <Layout>
      {totalItem === 0 ? (
        <div className="cart__empty">
          <img
            src="https://dominos.vn/img/illustration/empty-cart.svg"
            alt=""
          />
          <div className="title">Gi??? h??ng tr???ng</div>
          <div className="description">
            Hi???n t???i b???n ch??a ?????t m??n n??o trong gi??? h??ng c???. D???o v??ng quanh ch???n
            m??n nh?? b???n ??i, ??? ????y nhi???u m??n ngon l???m ;)
          </div>
          <div
            className="btn btn__red btn__cart"
            onClick={() => navigate('/products')}
          >
            Ti???p t???c l???a m??n ??n
          </div>
        </div>
      ) : (
        <div className="pay">
          <div className="info">
            <div className="info__header">
              <span
                className={`${isPay ? '' : 'active'}`}
                onClick={() => setIsPay(false)}
              >
                <i className="bx bx-info-circle"></i> Th??ng tin
              </span>
              <span className={`${isPay ? 'active' : ''}`}>
                <i className="bx bx-credit-card"></i> Thanh to??n
              </span>
            </div>
            <div className="info__form">
              <form
                className={`info__customer ${isPay ? '' : 'active'}`}
                onSubmit={shippingSubmit}
              >
                <div className="title">Th??ng tin ?????t h??ng</div>
                <input
                  type="text"
                  value={info.name || ''}
                  id="name"
                  onChange={onChangeInput}
                  placeholder="H??? v?? t??n"
                />
                {validationMsg.name ? (
                  <label className="input__err">*{validationMsg.name}</label>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  value={info.phone || ''}
                  id="phone"
                  onChange={onChangeInput}
                  placeholder="S??T"
                />
                {validationMsg.phone ? (
                  <label className="input__err">*{validationMsg.phone}</label>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  value={info.address || ''}
                  id="address"
                  onChange={onChangeInput}
                  placeholder="?????a ch???"
                />
                {validationMsg.address ? (
                  <label className="input__err">*{validationMsg.address}</label>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  value={info.note || ''}
                  id="note"
                  onChange={onChangeInput}
                  placeholder="Ghi ch??"
                />
                <button type="submit" className="btn btn__red">
                  X??c nh???n
                </button>
              </form>
              <form className={`payment ${isPay ? 'active' : ''}`}>
                <div className="title">Ph????ng th???c thanh to??n</div>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="paypal-button-v2">
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                        onError={errorHandler}
                      />
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="cart__pay">
            <div className="header">
              <div className="title">????n h??ng c???a b???n</div>
              <div className="numer">{totalItem} m??n</div>
            </div>
            <div className="cart__pay__price">
              <div className="price">
                <div>Th??nh ti???n</div>
                <div>{totalPrice}$</div>
              </div>
              <div className="price">
                <div>Ph?? giao h??ng</div>
                <div>0$</div>
              </div>
              <div className="price red__text">
                <div>T???ng</div>
                <div>{totalPrice}$</div>
              </div>
            </div>
            <div className="cart__pay__items">
              {cartItems.map((item) => (
                <div className="cart__pay__item" key={item.product}>
                  <div>{item.qty}</div>
                  <div>X</div>
                  <div className="description">
                    <div className="header">{item.name}</div>
                    <div className="main">
                      <div className="price">{calcPrice(item)}??</div>
                      <div className="image">
                        <img
                          src={generatePublicUrl(item.image)}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Confirm;
