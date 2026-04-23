import * as yup from "yup";

export const addPetSchema = yup.object().shape({
  title: yup.string().required("Title is required"),

  name: yup.string().required("Pet name is required"),

  imgUrl: yup.string().required("Image URL is required"),

  species: yup.string().required("Species is required"),

  birthday: yup
    .date()
    .typeError("Birthday is required")
    .required("Birthday is required"),

  sex: yup.string().required("Sex is required"),
});