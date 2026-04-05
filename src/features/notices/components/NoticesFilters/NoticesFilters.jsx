import { useEffect, useState } from "react";
import SearchField from "@/shared/components/SearchField/SearchField";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import {
  fetchCategories,
  fetchGenders,
  fetchPetTypes,
  fetchCities,
} from "@/features/notices/api/noticesApi";
import { IoSearch, IoClose } from "react-icons/io5";
import styles from "./NoticesFilters.module.scss";

const SearchIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoSearch size={18} />
    </components.DropdownIndicator>
  );
};

const NoticesFilters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    const showAllOption = { value: "all", label: "Show all" };

    fetchCategories().then((data) =>
      setCategories([
        showAllOption,
        ...data.map((c) => ({ value: c, label: c })),
      ])
    );

    fetchGenders().then((data) =>
      setGenders([
        showAllOption,
        ...data.map((g) => ({ value: g, label: g })),
      ])
    );

    fetchPetTypes().then((data) =>
      setPetTypes([
        showAllOption,
        ...data.map((p) => ({ value: p, label: p })),
      ])
    );
  }, []);

  const loadCityOptions = async (inputValue) => {
    return fetchCities(inputValue);
  };

  const handleSortToggle = (group, option) => {
    if (group === "byPopularity") {
      setFilters({
        ...filters,
        byPopularity:
          option === "popular"
            ? false
            : option === "unpopular"
            ? true
            : null,
      });
    }

    if (group === "byPrice") {
      setFilters({
        ...filters,
        byPrice:
          option === "cheap"
            ? true
            : option === "expensive"
            ? false
            : null,
      });
    }
  };

  const isActive = (group, option) => {
    if (group === "byPopularity") {
      return (
        (option === "popular" && filters.byPopularity === false) ||
        (option === "unpopular" && filters.byPopularity === true)
      );
    }

    if (group === "byPrice") {
      return (
        (option === "cheap" && filters.byPrice === true) ||
        (option === "expensive" && filters.byPrice === false)
      );
    }

    return false;
  };

  const renderFilterButton = (label, option, group) => {
    const active = isActive(group, option);

    return (
      <button
        type="button"
        className={`${styles.noticesFilters__sortButton} ${
          active ? styles["noticesFilters__sortButton--active"] : ""
        }`}
        onClick={() => handleSortToggle(group, active ? null : option)}
      >
        <span>{label}</span>
        {active && <IoClose size={18} />}
      </button>
    );
  };

  return (
    <div className={styles.noticesFilters}>
      <div className={styles.noticesFilters__styleWrap}>
        <SearchField
          placeholder="Search"
          initialValue={filters.keyword}
          className={styles.customSearch}
          onSearch={(value) =>
            setFilters({ ...filters, keyword: value })
          }
        />

        <div className={styles.noticesFilters__wrapper}>
          <Select
            className={styles.noticesFilters__select}
            classNamePrefix="select"
            options={categories}
            value={
              categories.find(
                (c) => c.value === filters.category
              ) || null
            }
            onChange={(option) =>
              setFilters({
                ...filters,
                category:
                  option?.value === "all"
                    ? ""
                    : option?.value || "",
              })
            }
            placeholder="Category"
            isClearable
          />

          <Select
            className={styles.noticesFilters__select}
            classNamePrefix="select"
            options={genders}
            value={
              genders.find((g) => g.value === filters.sex) ||
              null
            }
            onChange={(option) =>
              setFilters({
                ...filters,
                sex:
                  option?.value === "all"
                    ? ""
                    : option?.value || "",
              })
            }
            placeholder="By gender"
            isClearable
          />
        </div>

        <div className={styles.noticesFilters__secondWrapper}>
          <Select
            className={styles.noticesFilters__select}
            classNamePrefix="select"
            options={petTypes}
            value={
              petTypes.find(
                (p) => p.value === filters.species
              ) || null
            }
            onChange={(option) =>
              setFilters({
                ...filters,
                species:
                  option?.value === "all"
                    ? ""
                    : option?.value || "",
              })
            }
            placeholder="By type"
            isClearable
          />

          <AsyncSelect
            className={styles.noticesFilters__select}
            classNamePrefix="select"
            cacheOptions
            loadOptions={loadCityOptions}
            defaultOptions={false}
            components={{
              DropdownIndicator: SearchIndicator,
            }}
            value={
              filters.locationId
                ? {
                    value: filters.locationId,
                    label: filters.locationLabel,
                  }
                : null
            }
            onChange={(option) =>
              setFilters({
                ...filters,
                locationId: option?.value || "",
                locationLabel: option?.label || "",
              })
            }
            placeholder="Location"
            isClearable
          />
        </div>
      </div>

      <div className={styles.noticesFilters__divider}></div>

      <div className={styles.noticesFilters__sort}>
        <div className={styles.noticesFilters__sortGroup}>
          {renderFilterButton(
            "Popular",
            "popular",
            "byPopularity"
          )}
          {renderFilterButton(
            "Unpopular",
            "unpopular",
            "byPopularity"
          )}
        </div>

        <div className={styles.noticesFilters__sortGroup}>
          {renderFilterButton("Cheap", "cheap", "byPrice")}
          {renderFilterButton(
            "Expensive",
            "expensive",
            "byPrice"
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticesFilters;