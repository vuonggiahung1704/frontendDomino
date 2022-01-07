import React from 'react';
import { usePagination } from './usePagination';
import { v4 as uuid } from 'uuid';
import './styles.css';

const Pagination = (props) => {
  const { pages, currentPage, filter, handle } = props;

  const handlePrevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage <= 0) {
      prevPage = 1;
    }
    handle({ ...filter, currentPage: prevPage });
  };
  const handleNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > pages) {
      nextPage = pages;
    }
    handle({ ...filter, currentPage: nextPage });
  };

  let paginationRange = usePagination({
    currentPage,
    pages,
  });

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination">
      <li
        className={`pagination-item ${currentPage === 1 ? 'disable' : ''}`}
        onClick={() => handlePrevPage()}
      >
        <i className="bx bx-chevron-left"></i>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === '...') {
          return (
            <li key={uuid()} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`pagination-item ${
              pageNumber === currentPage ? 'active' : ''
            }`}
            onClick={() => handle({ ...filter, currentPage: pageNumber })}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? 'disable' : ''
        }`}
        onClick={() => handleNextPage()}
      >
        <i className="bx bx-chevron-right"></i>
      </li>
    </ul>
  );
};

export default Pagination;
