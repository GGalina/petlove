import axiosInstance from "@/shared/api/axiosInstance";

export const fetchNotices = async ({
  page = 1,
  limit = 6,
  keyword = "",
  category = "",
  species = "",
  locationId = "",
  sex = "",
  byDate = true,
  byPrice = false,
  byPopularity = false,
}) => {
  try {
    const { data } = await axiosInstance.get("/notices", {
      params: {
        page,
        limit,
        keyword,
        category,
        species,
        locationId,
        sex,
        byDate,
        byPrice,
        byPopularity,
      },
    });

    return {
      data: data.results,      // array of notices
      totalPages: data.totalPages, // total pages for pagination
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch notices.");
    }
    if (error.request) {
      throw new Error(
        "No response from server. Please check your network connection."
      );
    }
    throw new Error(error.message || "Unexpected error occurred.");
  }
};

export const fetchCategories = async () => {
    try {
        const { data } = await axiosInstance.get("/notices/categories");
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
            error.response.data.message || "Failed to fetch categories."
            );
        }

        if (error.request) {
            throw new Error(
            "No response from server. Please check your network connection."
            );
        }

        throw new Error(error.message || "Unexpected error occurred.");
    }
};

export const fetchGenders = async () => {
    try {
        const { data } = await axiosInstance.get("/notices/sex");
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
            error.response.data.message || "Failed to fetch pet sex."
            );
        }

        if (error.request) {
            throw new Error(
            "No response from server. Please check your network connection."
            );
        }

        throw new Error(error.message || "Unexpected error occurred.");
    }
};

export const fetchPetTypes = async () => {
    try {
        const { data } = await axiosInstance.get("/notices/species");
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
            error.response.data.message || "Failed to fetch pet species."
            );
        }

        if (error.request) {
            throw new Error(
            "No response from server. Please check your network connection."
            );
        }

        throw new Error(error.message || "Unexpected error occurred.");
    }
};

export const fetchCities = async (keyword) => {
  if (!keyword || keyword.length < 3) return []; // API requires min 3 chars
  try {
    const { data } = await axiosInstance.get("/cities", { params: { keyword } });
    return data.map(city => ({
      value: city._id,
      label: `${city.cityEn}, ${city.stateEn}`,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};