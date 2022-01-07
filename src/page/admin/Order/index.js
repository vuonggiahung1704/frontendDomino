import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getOrderByAdmin } from '../../../action/orderActions';
import { LayoutAdmin, Loading, Pagination } from '../../../components';
import './styles.css';

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageSize = 5;

  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: 5,
  });

  const { orders, loading, error, ordersCount, pages } = useSelector(
    (state) => state.getOrderAdmin
  );

  const {
    success,
    loading: loadDeli,
    error: errDeli,
  } = useSelector((state) => state.isDeliveredOrder);

  const totalItems = (list) => list.reduce((c, item) => c + item.qty, 0);
  const parseDate = (date) =>
    new Intl.DateTimeFormat('vn-VN', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(date));

  useEffect(() => {
    dispatch(getOrderByAdmin(filter));
  }, [dispatch, filter, success]);

  return (
    <LayoutAdmin>
      <div className="order__page">
        <div className="header">
          <div>
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>Đơn hàng</span>
          </div>
        </div>
        {loading || loadDeli ? (
          <Loading />
        ) : errDeli === 'Something went wrong' ||
          error === 'Something went wrong' ||
          error === 'Order Not Found' ? (
          <div className="cart__empty">
            <img
              src="https://dominos.vn/img/illustration/empty-cart.svg"
              alt=""
            />
            <div className="title">Không tìm thấy</div>
            <div
              className="btn btn__red btn__cart"
              onClick={() => navigate('/admin/dashboard')}
            >
              Quay lại
            </div>
          </div>
        ) : (
          <>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Số sản phẩm</td>
                    <td>SĐT</td>
                    <td>Tổng tiền</td>
                    <td>Ngày thanh toán</td>
                    <td>Trạng thái</td>
                    <td>Ngày nhận</td>
                    <td>Xem chi tiết</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td>#{o._id}</td>
                      <td>{totalItems(o.orderItems)}</td>
                      <td>{o.info.phone}</td>
                      <td className="td__price">{o.totalPrice}$</td>
                      <td>{parseDate(o.paidAt)}</td>
                      <td
                        className={
                          o.isDelivered ? 'green__text' : 'warning__text'
                        }
                      >
                        {o.isDelivered ? 'Đã nhận' : 'Đang chờ'}
                      </td>
                      <td>{o.isDelivered ? parseDate(o.deliveredAt) : ''}</td>
                      <td>
                        <span
                          className="view__icon"
                          onClick={() => navigate(`/admin/orders/${o._id}`)}
                        >
                          <i className="bx bx-show"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="end">
              {pageSize < ordersCount && (
                <Pagination
                  pages={pages}
                  currentPage={filter.currentPage}
                  filter={filter}
                  handle={setFilter}
                />
              )}
            </div>
          </>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default OrderAdmin;
