import { useState } from "react";
import styles from "./SearchField.module.scss";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const SearchField = ({
    placeholder = "Search",
    onSearch,
    initialValue = "",
    }) => {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(value.trim());
    };

    const handleClear = () => {
        setValue("");
        onSearch?.("");
    };

    return (
        <form className={styles.searchField} onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={styles.searchField__input}
            />

            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className={styles.searchField__clear}
                    aria-label="Clear search"
                >
                    <IoClose size={18} />
                </button>
            )}

            <button
                type="submit"
                className={styles.searchField__submit}
                aria-label="Search"
            >
                <IoSearch size={18}/>
            </button>
        </form>
    );
};

export default SearchField;