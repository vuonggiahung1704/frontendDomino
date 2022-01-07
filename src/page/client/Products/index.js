import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Product,
  Filter,
  Loading,
  Pagination,
} from '../../../components';
import { getProduct } from '../../../action/productActions';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pageSize = 6;

  const { products, loading, error, productsCount, pages } = useSelector(
    (state) => state.getProducts
  );

  const [isShowFilter, setIsShowFilter] = useState(false);

  const [filter, setFilter] = useState({
    keyword: '',
    currentPage: 1,
    category: '',
    sale: false,
    pageSize: 6,
    order: 'highest',
  });

  useEffect(() => {
    dispatch(getProduct(filter));
  }, [dispatch, filter]);

  return (
    <Layout>
      <div className="products__filter">
        <Filter
          isShowFilter={isShowFilter}
          setIsShowFilter={setIsShowFilter}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="products">
          <div className="products__header">
            <div>
              <span>Sắp xếp theo</span>
              <select
                name="sort"
                className="sort__input"
                value={filter.sort}
                onChange={(e) =>
                  setFilter({ ...filter, order: e.target.value })
                }
              >
                <option value="highest">Giá (cao - thấp)</option>
                <option value="lowest">Giá (thấp - cao)</option>
                <option value="a-z">Tên (a-z)</option>
                <option value="z-a">Tên (z-a)</option>
              </select>
            </div>
            <div
              className="icon__filter"
              onClick={() => setIsShowFilter(!isShowFilter)}
            >
              <i className="bx bx-filter-alt"></i>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="cart__empty">
              <img
                src="https://dominos.vn/img/illustration/empty-cart.svg"
                alt=""
              />
              <div className="title">Xảy ra lỗi , quý khách vui lòng đợi</div>
              <div
                className="btn btn__red btn__cart"
                onClick={() => navigate('/')}
              >
                Trang chủ
              </div>
            </div>
          ) : (
            <>
              <div className="products__list">
                {products.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
              {pageSize < productsCount && (
                <Pagination
                  pages={pages}
                  currentPage={filter.currentPage}
                  filter={filter}
                  handle={setFilter}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
