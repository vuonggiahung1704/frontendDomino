import React, { useEffect, useState } from 'react';
import { generatePublicUrl } from '../../urlConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '..';
import { getOrderDetail, updateDelivered } from '../../action/orderActions';
import './styles.css';
import { ORDER_DELIVER_RESET } from '../../constants/orderConstants';
import { useNotification } from '../Notifications/NotificationProvider';

const ModalOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = useNotification();

  const { orderID } = useParams();

  const { order, loading, error } = useSelector((state) => state.getOrderId);
  const {
    message,
    success,
    loading: loadDeli,
    error: errDeli,
  } = useSelector((state) => state.isDeliveredOrder);

  const [isShowModal, setIsShowModal] = useState(false);
  const [status, setStatus] = useState(false);

  const totalItems = (list) => list.reduce((c, item) => c + item.qty, 0);

  const calcPrice = (item) =>
    (item.price - item.price * (item.sale / 100)) * item.qty;

  const parseDate = (date) =>
    new Intl.DateTimeFormat('vn-VN', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(date));

  const updateHandle = () => {
    dispatch(updateDelivered(orderID, status));
  };

  const handleNewNotification = (type, message) => {
    callNotification({
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    if (orderID) {
      dispatch(getOrderDetail(orderID));
      setIsShowModal(true);
      // dispatch({ type: ORDER_DELIVER_RESET });
    }
    if (success) {
      handleNewNotification('success', message);
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, orderID, success]);

  const handleCloseModal = () => {
    setIsShowModal(false);
    setStatus(false);
    navigate('/admin/orders');
  };

  return (
    <div className={`modal-container ${isShowModal ? 'show' : ''}`}>
      <div className="modal max-width">
        <div className="modal__header" onClick={handleCloseModal}>
          <i className="bx bx-x"></i>
        </div>
        <div className="modal__data">
          {loading || loadDeli ? (
            <Loading />
          ) : error === 'L???i h??? th???ng' ||
            error === 'Kh??ng t??m th???y ????n h??ng' ||
            errDeli === 'L???i h??? th???ng' ? (
            <div className="cart__empty">
              <img
                src="https://dominos.vn/img/illustration/empty-cart.svg"
                alt=""
              />
              <div className="title">Kh??ng t??m th???y ho???c x???y ra l???i</div>
              <div
                className="btn btn__red btn__cart"
                onClick={() => navigate('/admin/orders')}
              >
                ????ng
              </div>
            </div>
          ) : (
            <div className="order__container__modal">
              <div className="order__data">
                <div className="header">
                  <div className="title">
                    M?? ????n h??ng: <span>#{order._id}</span>
                  </div>
                </div>
                <div className="order__data__price">
                  <div className="price m-t">
                    <label htmlFor="status">C???p nh???t ????n h??ng</label>
                    <select
                      className="status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      id="status"
                    >
                      <option name="status" value={false}>
                        ??ang ch???
                      </option>
                      <option name="status" value={true}>
                        ???? nh???n
                      </option>
                    </select>
                  </div>
                </div>

                <div className="order__data__price">
                  <div className="price">
                    <div>Kh??ch h??ng</div>
                    <div>{order.info.name}</div>
                  </div>
                  <div className="price">
                    <div>S??T</div>
                    <div>{order.info.phone}</div>
                  </div>
                  <div className="price">
                    <div>?????a ch???</div>
                    <div>{order.info.address}</div>
                  </div>
                </div>

                <div className="order__data__price">
                  <div className="price">
                    <div>T???ng s???n ph???m</div>
                    <div>{totalItems(order.orderItems)}</div>
                  </div>
                  <div className="price">
                    <div>Tr???ng th??i</div>
                    <div
                      className={
                        order.isDelivered ? 'green__text' : 'warning__text'
                      }
                    >
                      {order.isDelivered ? '???? nh???n' : '??ang ch???'}
                    </div>
                  </div>

                  <div className="price">
                    <div>Ng??y thanh to??n</div>
                    <div>{parseDate(order.paidAt)}</div>
                  </div>
                  <div className="price">
                    <div>Ng??y nh???n</div>
                    <div>
                      {order.isDelivered ? parseDate(order.deliveredAt) : ''}
                    </div>
                  </div>
                  <div className="price red__text">
                    <div>T???ng ti???n</div>
                    <div>{order.totalPrice}$</div>
                  </div>
                </div>
                <div className="order__data__items">
                  {order.orderItems.map((item) => (
                    <div className="order__data__item" key={item.product}>
                      <div>{item.qty}</div>
                      <div>X</div>
                      <div className="description">
                        <div className="header">{item.name}</div>
                        <div className="main">
                          <div className="price">{calcPrice(item)}$</div>
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
                <div
                  className="btn btn__red btn__cart"
                  onClick={() => updateHandle()}
                >
                  C???p nh???t
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
