import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.scss'; // Подключаем стили

const Pagination = ({ currentProducts, pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"← Prev"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination-container"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      disabledClassName={"disabled"}
    />
  );
};

export default Pagination;
