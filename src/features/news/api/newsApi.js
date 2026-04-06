import axiosInstance from "@/shared/api/axiosInstance";

export const fetchNews = async ({ page = 1, limit = 6, search = "" }) => {
    try {
        const { data } = await axiosInstance.get("/news", {
            params: {
            page,
            limit,
            keyword: search,
            },
        });
        
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
            error.response.data.message || "Failed to fetch news."
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