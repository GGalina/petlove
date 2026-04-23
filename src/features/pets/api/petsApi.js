import axiosInstance from "@/shared/api/axiosInstance";

export const addPet = async (petData) => {
    try {
        const { data } = await axiosInstance.post(
        "/users/current/pets/add",
        petData
        );
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data.message || "Failed to add pet."
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