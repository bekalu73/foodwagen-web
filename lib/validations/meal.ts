import * as Yup from "yup";

export const addMealSchema = Yup.object().shape({
  food_name: Yup.string().required("Food name is required"),
  food_rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  food_image: Yup.string().url("Must be a valid URL").required("Food image is required"),
  restaurant_name: Yup.string().required("Restaurant name is required"),
  restaurant_logo: Yup.string().url("Must be a valid URL").required("Restaurant logo is required"),
  restaurant_status: Yup.string().oneOf(["Open Now", "Closed"]).required("Status is required"),
});