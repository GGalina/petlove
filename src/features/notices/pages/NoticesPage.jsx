import React, { useState, useEffect } from "react";
import Title from "@/shared/components/Title/Title";
import NoticesFilters from "@/features/notices/components/NoticesFilters/NoticesFilters";
import NoticesList from "@/features/notices/components/NoticesList/NoticesList";
import Pagination from "@/shared/components/Pagination/Pagination";
import { fetchNotices } from "@/features/notices/api/noticesApi";
import styles from "./NoticesPage.module.scss";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    species: "",
    locationId: "",
    sex: "",
    byDate: true,
    byPrice: null,
    byPopularity: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const loadNotices = async () => {
    try {
      const { data, totalPages } = await fetchNotices({ ...filters, page: currentPage });
      setNotices(data);
      setTotalPages(totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [filters, currentPage]);

  return (
    <div className={styles.noticesPage}>
      <Title text="Find your favorite pet" className={styles.customTitle} />
      <NoticesFilters filters={filters} setFilters={setFilters} />
      {notices.length > 0 ? (
        <NoticesList notices={notices} />
      ) : (
        <p className={styles.noticesPage__noResults}>No animals found.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default NoticesPage;