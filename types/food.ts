export interface Restaurant {
  name: string;
  logo: string;
  status?: string;
  isOpen?: boolean;
}

export interface FoodItem {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  rating: string;
  open: boolean;
  logo: string;
  Price: string;
  image: string;
  price: number;
  restaurant: Restaurant;
  restaurantName: string;
  status: string;
}
