"use client";
import DeleteMealModal from "@/components/modals/DeleteMealModal";
import EditMealModal from "@/components/modals/EditMealModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queryKeys } from "@/lib/query-keys";
import { useFetchData } from "@/lib/use-fetch-data";
import { FoodItem } from "@/types/food";
import {
  ChevronRight,
  DollarSign,
  MoreVertical,
  Star,
  TagIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const FeaturedCards = () => {
  const [displayCount, setDisplayCount] = useState(8);
  const [mounted, setMounted] = useState(false);
  const [editMeal, setEditMeal] = useState<FoodItem | null>(null);
  const [deleteMeal, setDeleteMeal] = useState<FoodItem | null>(null);

  const { data: foodItems = [], isLoading } = useFetchData(
    [queryKeys.food.all],
    "/Food",
    undefined,
    mounted
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayedItems = foodItems.slice(0, displayCount);
  const hasMore = displayCount < foodItems.length;

  const getRestaurantImage = (item: FoodItem) => {
    const logo = item.restaurant?.logo || item.logo;
    return logo && logo.trim() !== "" ? logo : "/placeholder-restaurant.svg";
  };

  const getFoodImage = (item: FoodItem) => {
    const image = item.image || item.avatar;
    return image && image.trim() !== "" ? image : "/placeholder-food.svg";
  };

  const getPrice = (item: FoodItem) => {
    const price =
      item.Price || item.price || (item as any).cost || (item as any).amount;
    if (price !== undefined && price !== null && price !== "") {
      return typeof price === "number" ? `$${price}` : price;
    }
    return "$0";
  };

  const loadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  if (!mounted || isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-2xl h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 flex-center">Featured Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item: FoodItem) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl  border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <Image
                src={getFoodImage(item)}
                alt={item.name}
                width={300}
                height={200}
                className="w-full h-56 object-cover rounded-2xl"
              />
              <div className="absolute top-3 left-3 bg-[#F17228] text-white px-2 py-1 rounded-lg flex items-center gap-2 text-sm font-medium">
                <TagIcon className="w-4 h-4" />
                <div className="flex-center">
                  <DollarSign className="w-4 h-4" />
                  {getPrice(item)}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={getRestaurantImage(item)}
                    alt={
                      item.restaurant?.name ||
                      item.restaurantName ||
                      "restaurant image"
                    }
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-restaurant.svg";
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {item.restaurant?.name || item.restaurantName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditMeal(item)}>
                      {/* <Edit className="w-4 h-4 mr-2" /> */}
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteMeal(item)}
                      className="text-red-600 focus:text-red-600"
                    >
                      {/* <Trash2 className="w-4 h-4 mr-2" /> */}
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-sm">
                <span
                  className={`font-medium px-3 py-1 rounded-2xl text-xs ${
                    (item.restaurant?.status || item.status) === "Open" ||
                    (item.restaurant?.status || item.status) === "Open Now"
                      ? "bg-[#79B93C33] text-[#79B93C]"
                      : "bg-[#F1722833] text-[#F17228]"
                  }`}
                >
                  {item.restaurant?.status || item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            className="px-6 py-3 rounded-lg flex items-center gap-2 font-medium food-gradient text-white btn-shadow"
          >
            Load More
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {editMeal && (
        <EditMealModal
          isOpen={!!editMeal}
          onClose={() => setEditMeal(null)}
          meal={editMeal}
        />
      )}

      {deleteMeal && (
        <DeleteMealModal
          isOpen={!!deleteMeal}
          onClose={() => setDeleteMeal(null)}
          meal={deleteMeal}
        />
      )}
    </div>
  );
};

export default FeaturedCards;
