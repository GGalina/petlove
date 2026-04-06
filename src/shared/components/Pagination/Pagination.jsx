import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import styles from "./Pagination.module.scss";

const getVisiblePages = (current, total) => {
  const pages = [];

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 3) pages.push("...");

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
};

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        <MdKeyboardDoubleArrowLeft size={20} />
      </button>

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <IoIosArrowBack size={20} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
          <button
            type="button"
            key={page}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => page !== currentPage && onChange(page)}
            className={page === currentPage ? styles.pagination__active : ""}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <IoIosArrowForward size={20} />
      </button>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(totalPages)}
      >
        <MdKeyboardDoubleArrowRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;