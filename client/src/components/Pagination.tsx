import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    
    // Determine range of page numbers to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-4 py-2 border-t border-b border-neutral-200 ${
            i === currentPage ? "bg-primary text-white" : "hover:bg-neutral-100"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          className="px-4 py-2 border border-neutral-200 rounded-r-lg hover:bg-neutral-100"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        
        {renderPageButtons()}
        
        <button
          className="px-4 py-2 border border-neutral-200 rounded-l-lg hover:bg-neutral-100"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
