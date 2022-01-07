import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../components';
import { generatePublicUrl } from '../../../urlConfig';
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../action/cartActions';
import './styles.css';

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const totalItem = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (item.price - item.price * (item.sale / 100)) * item.qty,
    0
  );

  const calcPrice = (item) =>
    (item.price - item.price * (item.sale / 100)) * item.qty;

  const increaseQuantity = (id, qty, quantityP) => {
    if (quantityP <= qty) {
      return;
    }
    dispatch(addItemsToCart(id, qty + 1));
  };

  const decreaseQuantity = (id, qty) => {
    if (1 >= qty) {
      return;
    }
    dispatch(addItemsToCart(id, qty - 1));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=confirm');
  };

  return (
    <Layout>
      {totalItem === 0 ? (
        <div className="cart__empty">
          <img
            src="https://dominos.vn/img/illustration/empty-cart.svg"
            alt=""
          />
          <div className="title">Giỏ hàng trống</div>
          <div className="description">
            Hiện tại bạn chưa đặt món nào trong giỏ hàng cả. Dạo vòng quanh chọn
            món nhé bạn ơi, ở đây nhiều món ngon lắm ;)
          </div>
          <div
            className="btn btn__red btn__cart"
            onClick={() => navigate('/products')}
          >
            Chọn món ngay
          </div>
        </div>
      ) : (
        <div className="cart cart-container">
          <div className="cart__header">
            <div>Giỏ hàng của bạn</div>
            <div>{totalItem} món</div>
          </div>
          <div className="cart__items">
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart__item" key={item.product}>
                  <div className="info">
                    <div className="image">
                      <img
                        src={generatePublicUrl(item.image)}
                        alt={item.name}
                      />
                    </div>
                    <div className="description">
                      <div className="name">{item.name}</div>
                      <div className="price">{calcPrice(item)}$</div>
                    </div>
                  </div>
                  <div className="action">
                    <div className="group__button min">
                      <div
                        className="btn__amount"
                        onClick={() => decreaseQuantity(item.product, item.qty)}
                      >
                        <i className="bx bx-minus"></i>
                      </div>
                      <div className="form__amount">{item.qty}</div>
                      <div
                        className="btn__amount"
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.qty,
                            item.quantity
                          )
                        }
                      >
                        <i className="bx bx-plus"></i>
                      </div>
                    </div>
                    <div
                      className="delete"
                      onClick={() => deleteCartItems(item.product)}
                    >
                      Xóa
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="cart__end">
            <div className="cart__total">
              <div className="price">
                <div>Thành tiền</div>
                <div>{totalPrice}$</div>
              </div>
              <div className="price">
                <div>Phí giao hàng</div>
                <div>0$</div>
              </div>
              <div className="price red__text">
                <div>Tổng</div>
                <div>{totalPrice}$</div>
              </div>
              <div className="btn btn__red" onClick={checkoutHandler}>
                Đặt hàng
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
