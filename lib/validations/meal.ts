import * as Yup from "yup";

export const addMealSchema = Yup.object().shape({
  food_name: Yup.string().required("Food Name is required"),
  food_rating: Yup.number()
    .typeError("Food Rating must be a number")
    .min(1, "Food Rating must be between 1-5")
    .max(5, "Food Rating must be between 1-5")
    .required("Food Rating is required"),
  food_image: Yup.string()
    .url("Food Image URL must be a valid URL")
    .required("Food Image URL is required"),
  restaurant_name: Yup.string().required("Restaurant Name is required"),
  restaurant_logo: Yup.string()
    .url("Restaurant Logo URL must be a valid URL")
    .required("Restaurant Logo URL is required"),
  restaurant_status: Yup.string()
    .oneOf(["Open Now", "Closed"], "Restaurant Status must be 'Open Now' or 'Closed'")
    .required("Restaurant Status is required"),
});