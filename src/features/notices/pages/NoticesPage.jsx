import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Title from "@/shared/components/Title/Title";
import NoticesFilters from "@/features/notices/components/NoticesFilters/NoticesFilters";
import NoticesList from "@/features/notices/components/NoticesList/NoticesList";
import Pagination from "@/shared/components/Pagination/Pagination";
import Loader from "@/shared/components/Loader/Loader";

import { fetchNotices } from "@/features/notices/api/noticesApi";

import styles from "./NoticesPage.module.scss";

const NoticesPage = () => {
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isLoggedIn = useSelector((state) => state.auth.user);

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const loadNotices = async () => {
    setLoading(true);

    try {
      const { data, totalPages } = await fetchNotices({
        ...filters,
        page: currentPage,
      });

      setNotices(data);
      setTotalPages(totalPages);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [filters, currentPage]);

  if (loading) {
    return (
      <div className={styles.noticesPage}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.noticesPage}>
      <Title text="Find your favorite pet" className={styles.customTitle} />

      <NoticesFilters filters={filters} setFilters={setFilters} />

      <NoticesList
        notices={notices}
        favoriteIds={favoriteIds}
        isLoggedIn={!!isLoggedIn}
      />

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