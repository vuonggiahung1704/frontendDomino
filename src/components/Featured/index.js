import React from 'react';
import Product from '../Product';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const Featured = ({ products }) => {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="featured">
      <div className="featured__header">
        <Link to="/products">
          <span> Best seller </span>
        </Link>
      </div>
      <div className="featured__list">
        {/* <Product />
        <Product />
        <Product />
        <Product /> */}
      </div>
      <div className="featured__footer">
        <button type="button" className="btn" onClick={navigateToProducts}>
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default Featured;
