import axiosInstance from "@/shared/api/axiosInstance";

const handleApiError = error => {
  if (error.response) {
    throw new Error(
      error.response.data.message ||
      "Server error. Please try again."
    );
  }

  if (error.request) {
    throw new Error(
      "No response from server. Please check your network connection."
    );
  }

  throw new Error(
    error.message ||
    "Something went wrong. Please try again."
  );
};

export const currentUser = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/users/current/full"
    );
    console.log(data)
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logOut = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/users/signout"
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};