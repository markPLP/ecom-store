import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  const { search, pathname } = useLocation();
  //pathname: A string representing the path of the current URL (e.g., /products) - searchParams.
  //search: A string representing the query parameters in the URL (e.g., ?id=10).
  //hash: The URL fragment identifier (e.g., #section2).
  //state: An optional object that can hold any custom state you pass when navigating (useful for data without including it in the URL).
  const navigate = useNavigate();
  const handleChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber); // this sets a new value parameter ex. ?page=pageNumber
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // construct the pages/button
  // number of pages/button
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (pages < 2) return null;

  return (
    <div className="mt-9 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount; // bring to last array/item
            handleChange(prevPage);
          }}
        >
          prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                page === pageNumber && 'bg-base-300 border-base-300'
              }`}
              onClick={() => handleChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1; // bring to the 1st item
            handleChange(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
