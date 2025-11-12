export interface AddMealFormValues {
  food_name: string;
  food_rating: number;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed";
}

export interface AddMealPayload {
  name: string;
  rating: number;
  image: string;
  restaurantName: string;
  logo: string;
  status: string;
  price: number;
  createdAt?: string;
}
