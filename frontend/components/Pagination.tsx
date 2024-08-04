'use client'

import { PaginationProps } from "@/types/types";

const Pagination: React.FC<PaginationProps> = ({ pages, nextPage, currentPage }) => {
  const pageLinks = [];

  for (let i = 1; i <= pages; i++) {
    const isActive = currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500';

    pageLinks.push(
      <button
        key={i}
        className={`px-4 py-2 border rounded ${isActive} hover:bg-blue-300`}
        onClick={() => nextPage(i)}
        aria-current={currentPage === i ? 'page' : undefined}
      >
        {i}
      </button>
    );
  }

  return (
    <nav aria-label="Pagination" className="my-3">
      <ul className="flex space-x-2 my-2">
        { currentPage > 1 && (
           
           <button
            className={`px-4 py-2 border rounded hover:bg-blue-300`}
            onClick={() => nextPage(currentPage - 1)}
          >
            Prev
          </button>
        ) }
        {pageLinks}
        { currentPage < pages && (
           
           <button
            className={`px-4 py-2 border rounded hover:bg-blue-300 text-purple-600 font-semibold`}
            onClick={() => nextPage(currentPage + 1)}
            aria-label="Next Page"
          >
            Next
          </button>
        ) }
      </ul>
    </nav>
  );
};

export default Pagination;
