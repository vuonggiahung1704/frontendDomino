import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '..';
import {
  getProduct,
  getProductDetails,
  newProduct,
  updateProduct,
} from '../../action/productActions';
import {
  CLEAR_ERRORS,
  NEW_PRODUCT_RESET,
  PRODUCT_DETAILS_RESET,
  UPDATE_PRODUCT_RESET,
} from '../../constants/productConstants';
import validator from 'validator';
import './styles.css';

const initialProduct = {
  name: '',
  category: '',
  description: '',
  price: '',
  quantity: '',
  sale: '',
};

const ModalProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const search = location.search;
  const params = new URLSearchParams(search);

  const isEdit = JSON.parse(params.get('isEdit'));

  const { id } = useParams();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  const [title, setTitle] = useState('Thêm sản phẩm');
  const [validationMsg, setValidationMsg] = useState('');
  const [product, setProduct] = useState(initialProduct);

  const {
    product: prodDetail,
    loading: loadDetail,
    error: errDetail,
  } = useSelector((state) => state.getProduct);

  const {
    message: messNew,
    success: sucNew,
    loading: loadNew,
    error: errNew,
  } = useSelector((state) => state.newProduct);

  const {
    message: messUpdate,
    success: sucUpdate,
    loading: loadUpdate,
    error: errUpdate,
  } = useSelector((state) => state.updateProduct);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
    e.preventDefault();
  };

  const handleImage = (e) => {
    if (isEdit === true) setIsUpdateImage(true);
    setProduct({ ...product, image: e.target.files[0] });
  };

  const validateAll = () => {
    const msg = {};
    if (validator.isEmpty(product.name || '')) {
      msg.name = 'Please enter product name';
    }
    if (validator.isEmpty(product.category)) {
      msg.category = 'Please enter category';
    }
    if (validator.isEmpty(product.price.toString()) || product.price < 0) {
      msg.price = 'Please enter valid price';
    }
    if (
      validator.isEmpty(product.sale.toString()) ||
      product.sale < 0 ||
      product.sale > 100
    ) {
      msg.sale = 'Please enter valid sale (EX: 0-100%)';
    }
    if (
      validator.isEmpty(product.quantity.toString()) ||
      product.quantity < 0
    ) {
      msg.quantity = 'Please enter valid quantity';
    }
    if (isEdit === false) {
      if (!product.image) {
        msg.image = 'Please choose a image';
      }
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

    if (isEdit === true) {
      if (isUpdateImage) {
        formdata.append('image', product.image);
      }
      dispatch(updateProduct(product._id, formdata));
    } else if (isEdit === false) {
      formdata.append('image', product.image);
      dispatch(newProduct(formdata));
    }
  };

  useEffect(() => {
    if (isEdit !== null) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      setIsShowModal(true);

      if (id && prodDetail?.name === undefined) {
        setTitle(`Cập nhật :#${id}`);
        dispatch(getProductDetails(id));
      }
      if (prodDetail?.name) {
        setProduct(prodDetail);
      } else {
        setProduct(initialProduct);
      }
      console.log(prodDetail);
      console.log(product);
    }

    // if (sucUpdate) {
    //   setIsUpdateImage(false);
    //   setTimeout(() => {
    //     dispatch({ type: UPDATE_PRODUCT_RESET });
    //   }, 4000);
    //   // clearTimeout();
    // }

    // if (sucNew) {
    //   setProduct(initialProduct);
    //   setTimeout(() => {
    //     dispatch({ type: NEW_PRODUCT_RESET });
    //   }, 4000);
    //   clearTimeout();
    // }

    // if (errNew) {
    //   dispatch({ type: CLEAR_ERRORS });
    // }
  }, [dispatch, id, isEdit, sucNew, sucUpdate]);

  const handleCloseModal = () => {
    setIsShowModal(false);
    // setIsUpdateImage(false);
    setValidationMsg({});
    setTitle('Thêm sản phẩm');
    navigate('/admin/products');
    // setProduct(initialProduct);
  };

  return (
    <div className={`modal-container ${isShowModal ? 'show' : ''}`}>
      <div className="modal max-width">
        <div className="modal__header" onClick={handleCloseModal}>
          <i className="bx bx-x"></i>
        </div>
        <div className="modal__data">
          {loadDetail || loadNew || loadUpdate ? (
            <Loading />
          ) : errDetail === 'Product Not Found' ||
            errDetail === 'Something went wrong' ||
            errNew === 'Something went wrong' ||
            errUpdate === 'Something went wrong' ? (
            <div className="cart__empty">
              <img
                src="https://dominos.vn/img/illustration/empty-cart.svg"
                alt=""
              />
              <div className="title">Không tìm thấy hoặc xảy ra lỗi</div>
              <div
                className="btn btn__red btn__cart"
                onClick={() => navigate('/admin/products')}
              >
                Đóng
              </div>
            </div>
          ) : (
            <div className="order__container__modal">
              <div className="order__data">
                <div className="header">
                  <div className="title">
                    <span>{title}</span>
                  </div>
                  {sucNew && (
                    <div className="green__text">
                      <span>{messNew}</span>
                    </div>
                  )}
                  {sucUpdate && (
                    <div className="green__text">
                      <span>{messUpdate}</span>
                    </div>
                  )}
                </div>
                <form className="form__product__modal" onSubmit={saveHandle}>
                  <div className="form__data__modal">
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
                    </div>
                    <div className="form__group__modal">
                      <label>Số lượng</label>
                      <input
                        type="number"
                        name="quantity"
                        className={validationMsg.quantity ? 'err' : ''}
                        value={product.quantity || '0'}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="Nhập số lượng"
                      />
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
                    </div>
                    <div className="form__group__modal">
                      <label>Khuyến mãi</label>
                      <input
                        type="number"
                        name="sale"
                        className={validationMsg.sale ? 'err' : ''}
                        value={product.sale || '0'}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="Nhập khuyến mãi (nếu cần)"
                      />
                    </div>
                    <div className="form__group__modal">
                      <label htmlFor="file">Hình ảnh</label>
                      <input
                        type="file"
                        id="file"
                        onChange={handleImage}
                        className={validationMsg.image ? 'err' : ''}
                      />
                    </div>
                    <div className="form__group__modal">
                      <label>Nội dung</label>
                      <textarea
                        rows={3}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
