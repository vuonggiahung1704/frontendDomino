import React from 'react';
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import './styles.css';

const Product = ({ product }) => {
  const sale = product.price - product.price * (product.sale / 100);
  return (
    <>
      <Link to={`/products/${product._id}`} className="card__product">
        {product.sale > 0 && (
          <span>
            <div>sale {product.sale}%</div>
          </span>
        )}
        <div className="product__img">
          <img src={generatePublicUrl(product.image)} alt={product.name} />
        </div>
        <div className="product__info">
          <div className="name">{product.name}</div>
          <p className={`${product.sale > 0 ? 'price__sale' : ''}`}>
            {product.price}$
          </p>
          {product.sale > 0 && <p>{sale}đ</p>}
        </div>
      </Link>
    </>
  );
};

export default Product;
