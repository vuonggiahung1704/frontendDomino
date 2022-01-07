import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="cart__empty">
        <img src="https://dominos.vn/img/illustration/empty-cart.svg" alt="" />
        <div className="title">Không tìm thấy trang</div>
        <div className="btn btn__red btn__cart" onClick={() => navigate('/')}>
          Trang chủ
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
