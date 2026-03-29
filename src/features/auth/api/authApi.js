import axiosInstance from "@/shared/api/axiosInstance";

export const signup = async (userData) => {
    try {
        const { data } = await axiosInstance.post("/users/signup", userData);
        return data;
    } catch (error) {

        if (error.response) {
            throw new Error(error.response.data.message || "Server error. Please try again.");
        }

        if (error.request) {
            throw new Error("No response from server. Please check your network connection.");
        }

        throw new Error(error.message || "Something went wrong. Please try again.");
    }
};