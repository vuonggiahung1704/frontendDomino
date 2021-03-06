import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getProduct } from '../../../action/productActions';
import { LayoutAdmin, Loading, Pagination } from '../../../components';
import {
  CLEAR_ERRORS,
  DELETE_PRODUCT_RESET,
} from '../../../constants/productConstants';
import { useNotification } from '../../../components/Notifications/NotificationProvider';
import './styles.css';

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = useNotification();

  const pageSize = 6;

  const [filter, setFilter] = useState({
    keyword: '',
    currentPage: 1,
    category: '',
    sale: false,
    pageSize: 6,
    order: 'lowest',
  });

  const { products, loading, error, productsCount, pages } = useSelector(
    (state) => state.getProducts
  );

  const {
    message,
    loading: loadDelete,
    error: errDelete,
    isDeleted,
  } = useSelector((state) => state.actionProduct);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const parseDate = (date) =>
    new Intl.DateTimeFormat('vn-VN', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(date));

  const handleNewNotification = (type, message) => {
    callNotification({
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    dispatch(getProduct(filter));
    if (isDeleted) {
      setFilter({ ...filter, currentPage: 1 });
      handleNewNotification('success', message);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    if (errDelete) {
      handleNewNotification('err', errDelete);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, filter, isDeleted, errDelete]);

  return (
    <LayoutAdmin>
      <div className="order__page">
        <div className="header">
          <div>
            <Link to="/admin/dashboard">Dasshboard</Link>
            <span>S???n ph???m</span>
          </div>
          <div>
            <button
              className="btn btn__red"
              onClick={() => navigate('/admin/products/add')}
            >
              <i className="bx bx-plus"></i>
              Th??m s???n ph???m
            </button>
          </div>
        </div>
        {loading || loadDelete ? (
          <Loading />
        ) : error === 'Something went wrong' ? (
          <div className="cart__empty">
            <img
              src="https://dominos.vn/img/illustration/empty-cart.svg"
              alt=""
            />
            <div className="title">Kh??ng t??m th???y ho???c x???y ra l???i</div>
            <div
              className="btn btn__red btn__cart"
              onClick={() => navigate('/admin/dashboard')}
            >
              Quay l???i
            </div>
          </div>
        ) : (
          <>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>T??n s???n ph???m</td>
                    <td>Th??? lo???i</td>
                    <td>?????c t???</td>
                    <td>S??? l?????ng</td>
                    <td>Gi?? ti???n</td>
                    <td>Khuy???n m??i</td>
                    <td>Ng??y t???o</td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>#{p._id}</td>
                      <td className="td__description">{p.name}</td>
                      <td>{p.category}</td>
                      <td className="td__description">{p.description}</td>
                      <td>{p.quantity}</td>
                      <td className="td__price">{p.price} $</td>
                      <td>{p.sale} %</td>
                      <td>{parseDate(p.createdAt)}</td>
                      <td>
                        <span
                          className="view__icon"
                          onClick={() => navigate(`/admin/products/${p._id}`)}
                        >
                          <i className="bx bxs-edit-alt"></i>
                        </span>
                      </td>
                      <td>
                        <span
                          className="view__icon red__icon"
                          onClick={() => handleDelete(p._id)}
                        >
                          <i className="bx bx-trash-alt"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="end">
              {pageSize < productsCount && (
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

export default ProductAdmin;
