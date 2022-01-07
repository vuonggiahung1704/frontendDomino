import React, { useEffect, useState } from 'react';
import { generatePublicUrl } from '../../urlConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '..';
import './styles.css';
import { getProductDetails } from '../../action/productActions';
import { addItemsToCart } from '../../action/cartActions';
import { useNotification } from '../../components/Notifications/NotificationProvider';

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = useNotification();

  const [isShowModal, setIsShowModal] = useState(false);

  const { product, loading, error } = useSelector((state) => state.getProduct);

  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const increaseQuantity = () => {
    if (product.quantity <= qty) return;
    setQty(qty + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= qty) return;

    setQty(qty - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, qty));
    callNotification({
      type: 'success',
      message: 'Thêm vào giỏ hàng thành công!',
    });
    setQty(1);
    handleCloseModal();
  };

  useEffect(() => {
    if (id) {
      setIsShowModal(true);
      dispatch(getProductDetails(id));
      console.log(product);
    }
  }, [dispatch, id]);

  const handleCloseModal = () => {
    setIsShowModal(false);
    navigate('/products');
  };

  return (
    <div className={`modal-container ${isShowModal ? 'show' : ''}`}>
      <div className="modal">
        <div className="modal__header" onClick={handleCloseModal}>
          <i className="bx bx-x"></i>
        </div>
        <div className="modal__data">
          {loading ? (
            <Loading />
          ) : error === 'Không tìm thấy sản phẩm' ||
            error === 'Lỗi hệ thống' ? (
            <div className="cart__empty">
              <img
                src="https://dominos.vn/img/illustration/empty-cart.svg"
                alt=""
              />
              <div className="title">Không tìm thấy</div>
              <div
                className="btn btn__red btn__cart"
                onClick={() => navigate('/')}
              >
                Trang chủ
              </div>
            </div>
          ) : (
            <>
              <div className="modal__img">
                {isShowModal && (
                  <img src={generatePublicUrl(product.image)} alt="" />
                )}
              </div>
              <div className="modal__info">
                <Link to="#">{product.name}</Link>
                <div>{product.description}</div>

                <p className={`${product.sale > 0 ? 'price__sale' : ''}`}>
                  {product.price}$
                </p>
                {product.sale > 0 && (
                  <p>{product.price - product.price * (product.sale / 100)}đ</p>
                )}
              </div>
              <div className="modal__button">
                {product.quantity > 0 ? (
                  <>
                    <div className="group__button">
                      <button
                        className="btn__amount"
                        onClick={decreaseQuantity}
                      >
                        <i className="bx bx-minus"></i>
                      </button>
                      <div className="form__amount">{qty}</div>
                      <button
                        className="btn__amount"
                        onClick={increaseQuantity}
                      >
                        <i className="bx bx-plus"></i>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn__red"
                      disabled={product.quantity < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </>
                ) : (
                  <>
                    <div className="group__button">
                      <button className="btn__amount">
                        <i className="bx bx-minus"></i>
                      </button>
                      <div className="form__amount">{product.quantity}</div>
                      <button className="btn__amount">
                        <i className="bx bx-plus"></i>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn__red"
                      onClick={handleCloseModal}
                    >
                      Sản phẩm không có sẵn (Đóng)
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
