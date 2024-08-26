const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const previousPage = () => {
    currentPage > 1 ? onPageChange(currentPage - 1) : "null";
  };

  const nextPage = () => {
    currentPage < totalPages ? onPageChange(currentPage + 1) : "null";
  };

  return (
    <nav>
      <ul className="flex flex-row items-center">
        <li className="my-0 mx-8">
          <button
            className={`text-3xl ${currentPage === 1 ? "cursor-not-allowed text-[#454545]" : "cursor-pointer text-[#D9D9D9] hover:text-[#459DDE]"}`}
            onClick={previousPage}
          >
            {`<-`}
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className="my-0 mx-2">
            <button
              className={`text-xl cursor-pointer ${currentPage === page ? "text-[#459DDE]" : "text-[#D9D9D9]"} `}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={`my-0 mx-8 ${currentPage === totalPages && "cursor-not-allowed text-[#454545]"}`}
        >
          <button
            className={`text-3xl ${currentPage === totalPages ? "cursor-not-allowed text-[#454545]" : "cursor-pointer text-[#D9D9D9] hover:text-[#459DDE]"}`}
            onClick={nextPage}
          >
            {`->`}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
