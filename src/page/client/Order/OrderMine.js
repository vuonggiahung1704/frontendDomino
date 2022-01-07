import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderByUser } from '../../../action/orderActions';
import { Layout, Loading } from '../../../components';
import './ordermine.css';

const OrderMine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.getOrderMine);

  const totalItems = (list) => list.reduce((c, item) => c + item.qty, 0);
  const parseDate = (date) =>
    new Intl.DateTimeFormat('vn-VN', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(date));

  useEffect(() => {
    dispatch(getOrderByUser());
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : orders.length === 0 || error === 'Something went wrong' ? (
        <div className="cart__empty">
          <img
            src="https://dominos.vn/img/illustration/empty-cart.svg"
            alt=""
          />
          <div className="title">Không tìm thấy đơn hàng</div>
          <div
            className="btn btn__red btn__cart"
            onClick={() => navigate('/products')}
          >
            Đặt hàng ngay
          </div>
        </div>
      ) : (
        <div className="my__order">
          <div className="header">Đơn hàng của bạn</div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Số sản phẩm</td>
                  <td>Tổng tiền</td>
                  <td>Ngày thanh toán</td>
                  <td>Trạng thái</td>
                  <td>Xem chi tiết</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id}</td>
                    <td>{totalItems(o.orderItems)}</td>
                    <td className="td__price">{o.totalPrice}$</td>
                    <td>{parseDate(o.paidAt)}</td>
                    <td
                      className={
                        o.isDelivered ? 'green__text' : 'warning__text'
                      }
                    >
                      {o.isDelivered ? 'Đã nhận' : 'Đang chờ'}
                    </td>
                    <td>
                      <span
                        className="view__icon"
                        onClick={() => navigate(`/order/${o._id}`)}
                      >
                        <i className="bx bx-show"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderMine;
