import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../action/productActions';
import './styles.css';

const Filter = ({ isShowFilter, setIsShowFilter, filter, setFilter }) => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.getCategories
  );

  const handleCategory = (item) => {
    setFilter({ ...filter, category: item });
  };

  const clearFilter = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      category: '',
      currenPage: 1,
      keyword: '',
      sale: false,
    });
  };

  const handleChange = (e) => {
    setFilter({ ...filter, sale: e.target.checked });
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className={`filter ${isShowFilter ? 'show-filter' : ''}`}>
      <div className="filter__header">
        <div>Bộ lọc</div>
        <div
          className="icon__cancel"
          onClick={() => setIsShowFilter(!isShowFilter)}
        >
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="filter__group">
        <input
          type="text"
          value={filter.keyword}
          onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
          placeholder="Search... "
        />
      </div>
      <div className="filter__group">
        <div className="filter__group__header">Danh mục</div>
        <ul className="categories">
          {loading ? (
            ''
          ) : (
            <>
              <li onClick={() => handleCategory('')}>
                <span className={`${filter.category === '' ? 'active' : ''}`}>
                  All
                </span>
              </li>
              {categories.map((item, index) => (
                <li key={index} onClick={(e) => handleCategory(item)}>
                  <span
                    className={`${filter.category === item ? 'active' : ''}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
      <div className="filter__group">
        <div className="filter__group__header">Khuyến mãi</div>
        <ul className="sales">
          <li>
            <input
              type="checkbox"
              checked={filter.sale}
              onChange={(e) => handleChange(e)}
            />
            Sale
          </li>
        </ul>
      </div>
      <div className="btn" onClick={(e) => clearFilter(e)}>
        Xóa bộ lọc
      </div>
    </div>
  );
};

export default Filter;
