import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../action/userActions';
import { LayoutAdmin, Loading, Pagination } from '../../../components';
import './styles.css';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageSize = 7;

  const [filter, setFilter] = useState({
    keyword: '',
    currentPage: 1,
    pageSize: 7,
  });

  const { users, loading, error, usersCount, pages } = useSelector(
    (state) => state.allUser
  );

  console.log(users);

  const parseDate = (date) =>
    new Intl.DateTimeFormat('vn-VN', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(date));

  useEffect(() => {
    dispatch(getAllUser(filter));
  }, [dispatch, filter]);

  return (
    <LayoutAdmin>
      <div className="order__page">
        <div className="header">
          <div>
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>Tài khoản</span>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : error === 'Something went wrong' ? (
          <div className="cart__empty">
            <img
              src="https://dominos.vn/img/illustration/empty-cart.svg"
              alt=""
            />
            <div className="title">Lỗi hệ thống</div>
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
                    <td>Username</td>
                    <td>Email</td>
                    <td>Ngày lập</td>
                    <td>Ngày cập nhật</td>
                    <td>Quyền</td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>#{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{parseDate(user.createdAt)}</td>
                      <td>{parseDate(user.updatedAt)}</td>
                      <td
                        className={
                          user.isAdmin ? 'green__text' : 'warning__text'
                        }
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="end">
              {pageSize < usersCount && (
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

export default Account;
