import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { current } from '@reduxjs/toolkit';

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  // #useLocation
  //pathname: A string representing the path of the current URL (e.g., /products) - searchParams.
  //search: A string representing the query parameters in the URL (e.g., ?id=10).
  //hash: The URL fragment identifier (e.g., #section2).
  //state: An optional object that can hold any custom state you pass when navigating (useful for data without including it in the URL).
  const navigate = useNavigate();

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Update the currentPage state when the URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    // search is equal to URL (e.g., ?id=10).
    //is a built-in JavaScript API that allows you to work with query string parameters of a URL. It provides a convenient way to create, read, and manipulate the query string parameters of a URL. This can be useful in web development, especially when working with URLs that include query strings for passing data between pages.
    // 1. Creating a URLSearchParams object: You can create an instance of URLSearchParams by passing a query string or creating it empty.
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
  }, [search]);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // 1st button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    //dots
    if (currentPage > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }
    // active/current page
    if (currentPage !== 1 && currentPage !== pageCount) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    // dots
    if (currentPage < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }
    // last button
    pageButtons.push(
      addPageButton({
        pageNumber: pageCount,
        activeClass: currentPage === pageCount,
      })
    );
    // // Add buttons for each page
    // for (let i = 1; i <= pageCount; i++) {
    //   pageButtons.push(
    //     addPageButton({
    //       pageNumber: i,
    //       activeClass: i === currentPage,
    //     })
    //   );
    // }

    return pageButtons;
  };

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = currentPage - 1;
            console.log(prevPage, 'prevPage');

            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = currentPage + 1;
            console.log(nextPage, 'nextPage');

            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
