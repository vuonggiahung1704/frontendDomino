import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutAdmin, Loading } from '../../../components';
import validator from 'validator';
import { newProduct } from '../../../action/productActions';
import {
  CLEAR_ERRORS,
  NEW_PRODUCT_RESET,
} from '../../../constants/productConstants';
import './add.css';
import { useNotification } from '../../../components/Notifications/NotificationProvider';

const initialProduct = {
  name: '',
  category: '',
  description: '',
  price: '',
  quantity: '',
  sale: '',
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = useNotification();

  const [validationMsg, setValidationMsg] = useState('');
  const [product, setProduct] = useState(initialProduct);

  const { message, success, loading, error } = useSelector(
    (state) => state.newProduct
  );

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
    e.preventDefault();
  };

  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const validateAll = () => {
    const msg = {};
    if (validator.isEmpty(product.name || '')) {
      msg.name = 'Vui lòng nhập tên sản phẩm';
    }
    if (validator.isEmpty(product.category)) {
      msg.category = 'Vui lòng nhập thể loại';
    }
    if (validator.isEmpty(product.price.toString()) || product.price < 0) {
      msg.price = 'Vui lòng nhập giá';
    }
    if (
      validator.isEmpty(product.sale.toString()) ||
      product.sale < 0 ||
      product.sale > 100
    ) {
      msg.sale = 'Vui lòng nhập khuyến mãi (EX: 0-100%)';
    }
    if (
      validator.isEmpty(product.quantity.toString()) ||
      product.quantity < 0
    ) {
      msg.quantity = 'Vui lòng nhập số lượng';
    }
    if (!product.image) {
      msg.image = 'Vui lòng chọn ảnh';
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const saveHandle = (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    const formdata = new FormData();
    formdata.append('name', product.name);
    formdata.append('category', product.category);
    formdata.append('price', product.price);
    formdata.append('quantity', product.quantity);
    formdata.append('sale', product.sale);
    formdata.append('description', product.description);
    formdata.append('image', product.image);

    dispatch(newProduct(formdata));
  };

  const handleNewNotification = (type, message) => {
    callNotification({
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    if (success) {
      setProduct(initialProduct);
      handleNewNotification('success', message);
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    if (error) {
      handleNewNotification('err', error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, success, error]);

  return (
    <LayoutAdmin>
      <div className="order__page">
        <div className="header">
          <div>
            <Link to="/admin/dashboard" className="header__link">
              Dashboard
            </Link>
            <Link to="/admin/products" className="header__link">
              Sản phẩm
            </Link>
            <span>Thêm mới</span>
          </div>
          <div>
            <button
              className="btn btn__red"
              onClick={() => {
                navigate('/admin/products');
              }}
            >
              <i className="bx bx-arrow-back"></i>
              Quay lại
            </button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <form className="form__add__product" onSubmit={saveHandle}>
            <div className="form__add__product-input">
              <div className="form__group__modal">
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  className={validationMsg.name ? 'err' : ''}
                  value={product.name || ''}
                  onChange={onChangeInput}
                  placeholder="Nhập tên sản phẩm"
                />
                {validationMsg.name ? (
                  <div className="err__input">*{validationMsg.name}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label>Thể loại</label>
                <input
                  type="text"
                  name="category"
                  className={validationMsg.category ? 'err' : ''}
                  value={product.category || ''}
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Nhập tên thể loại"
                />
                {validationMsg.category ? (
                  <div className="err__input">*{validationMsg.category}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  className={validationMsg.quantity ? 'err' : ''}
                  value={product.quantity || ''}
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Nhập số lượng"
                />
                {validationMsg.quantity ? (
                  <div className="err__input">*{validationMsg.quantity}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label>Giá</label>
                <input
                  type="number"
                  name="price"
                  className={validationMsg.price ? 'err' : ''}
                  value={product.price || ''}
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Nhập giá"
                />
                {validationMsg.price ? (
                  <div className="err__input">*{validationMsg.price}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label>Khuyến mãi</label>
                <input
                  type="number"
                  name="sale"
                  className={validationMsg.sale ? 'err' : ''}
                  value={product.sale || ''}
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Nhập khuyến mãi (nếu có)"
                />
                {validationMsg.sale ? (
                  <div className="err__input">*{validationMsg.sale}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label htmlFor="file">Hình ảnh</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImage}
                  className={validationMsg.image ? 'err' : ''}
                />
                {validationMsg.image ? (
                  <div className="err__input">*{validationMsg.image}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="form__group__modal">
                <label>Nội dung</label>
                <textarea
                  rows={5}
                  value={product.description || ''}
                  name="description"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Nhập nội dung"
                />
              </div>
            </div>
            <div className="form__group__modal">
              <button type="submit" className="btn btn__red block">
                Lưu
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AddProduct;
