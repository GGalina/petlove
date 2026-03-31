import { useCallback, useEffect, useState } from "react";
import Title from "@/shared/components/Title/Title";
import SearchField from "@/shared/components/SearchField/SearchField";
import NewsList from "@/features/news/components/NewsList/NewsList";
import Pagination from "@/shared/components/Pagination/Pagination";
import Loader from "@/shared/components/Loader/Loader";
import { fetchNews } from "@/features/news/api/newsApi";
import styles from "./NewsPage.module.scss";

const ITEMS_PER_PAGE = 6;

const News = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadNews = useCallback(async (page = 1, search = "") => {
        try {
            setLoading(true);
            setError("");

            const response = await fetchNews({
                page,
                limit: ITEMS_PER_PAGE,
                search,
            });

            setNews(response.results || response.items || []);
            setTotalPages(response.totalPages || 1);
        } catch (err) {
            setError(err.message || "Failed to load news");
            setNews([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadNews(currentPage, keyword);
    }, [currentPage, keyword, loadNews]);

    const handleSearch = (value) => {
        setCurrentPage(1);
        setKeyword(value);
    };

    const handlePageChange = (page) => {
        if (page === currentPage) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className={styles.news}>
            {loading && <Loader />}
            <div className={styles.news__container}>
                <div className={styles.news__header}>
                    <Title text="News" className={styles.customTitle}/>

                    <SearchField
                        placeholder="Search"
                        onSearch={handleSearch}
                        initialValue={keyword}
                    />
                </div>
                
                {error && <p className={styles.news__error}>{error}</p>}

                {!loading && !error && <NewsList items={news} />}

                {!loading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                />
                )}
            </div>
        </section>
    );
};

export default News;