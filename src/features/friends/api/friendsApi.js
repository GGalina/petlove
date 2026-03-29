import axiosInstance from "@/shared/api/axiosInstance";

export const getFriends = async () => {
    try {
        const { data } = await axiosInstance.get("/friends");
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
            error.response.data.message || "Failed to fetch friends."
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