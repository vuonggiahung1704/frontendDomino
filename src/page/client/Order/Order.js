import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetail } from '../../../action/orderActions';
import { Layout, Loading } from '../../../components';
import { generatePublicUrl } from '../../../urlConfig';
import './styles.css';

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderID } = useParams();

  const { order, loading, error } = useSelector((state) => state.getOrderId);

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

  useEffect(() => {
    dispatch(getOrderDetail(orderID));
  }, [dispatch, orderID]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : error === 'Lỗi hệ thống' || error === 'Không tìm thấy đơn hàng' ? (
        <div className="cart__empty">
          <img
            src="https://dominos.vn/img/illustration/empty-cart.svg"
            alt=""
          />
          <div className="title">Không tìm thấy</div>
          <div className="btn btn__red btn__cart" onClick={() => navigate('/')}>
            Trang chủ
          </div>
        </div>
      ) : (
        <div className="order__container">
          <div className="order__data">
            <div className="header">
              <div className="title">
                Mã đơn hàng: <span>#{order._id}</span>
              </div>
            </div>
            <div className="order__data__price">
              <div className="price">
                <div>Khách hàng</div>
                <div>{order.info.name}</div>
              </div>
              <div className="price">
                <div>SĐT</div>
                <div>{order.info.phone}</div>
              </div>
              <div className="price">
                <div>Địa chỉ</div>
                <div>{order.info.address}</div>
              </div>
            </div>
            <div className="order__data__price">
              <div className="price">
                <div>Tổng sản phẩm</div>
                <div>{totalItems(order.orderItems)}</div>
              </div>
              <div className="price">
                <div>Trạng thái</div>
                <div
                  className={
                    order.isDelivered ? 'green__text' : 'warning__text'
                  }
                >
                  {order.isDelivered ? 'Đã nhận' : 'Đang chờ'}
                </div>
              </div>

              <div className="price">
                <div>Ngày thanh toán</div>
                <div>{parseDate(order.paidAt)}</div>
              </div>
              <div className="price">
                <div>Ngày nhận</div>
                <div>
                  {order.isDelivered ? parseDate(order.deliveredAt) : ''}
                </div>
              </div>
              <div className="price red__text">
                <div>Tổng tiền</div>
                <div>{order.totalPrice}$</div>
              </div>
            </div>{' '}
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
              onClick={() => navigate('/order/mine')}
            >
              Danh sách đơn hàng
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
