import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }: any) => {
  return (
    <div>
      <button
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 1}
      >
        Önceki
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => handlePageChange("next")}
        disabled={currentPage === totalPages}
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;
