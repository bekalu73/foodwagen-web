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
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const FeaturedCards = () => {
  const [displayCount, setDisplayCount] = useState(8);
  const [mounted, setMounted] = useState(false);
  const [editMeal, setEditMeal] = useState<FoodItem | null>(null);
  const [deleteMeal, setDeleteMeal] = useState<FoodItem | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { data: foodItems = [], isLoading } = useFetchData(
    [queryKeys.food.all],
    "/Food",
    undefined,
    mounted
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && foodItems.length > 0) {
      const cards = cardsRef.current?.querySelectorAll(".food-card");
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.1,
          }
        );
      }
    }
  }, [mounted, isLoading, foodItems.length, displayCount]);

  const displayedItems = foodItems.slice(0, displayCount);
  const hasMore = displayCount < foodItems.length;

  const getRestaurantImage = (item: FoodItem) => {
    const logo = item.restaurant?.logo || item.logo;
    return logo && logo.trim() !== "" ? logo : "/placeholder-restaurant.svg";
  };

  const getFoodImage = (item: FoodItem) => {
    const image = item.image || item.avatar;
    return image && image.trim() !== "" ? image : null;
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
            <div key={i} className="food-card animate-pulse">
              <div className="bg-gray-200 h-56 rounded-2xl mb-4"></div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 flex-center">Featured Meals</h2>
        <div className="empty-state-message">
          <h3 className="text-xl font-semibold mb-2">
            No Food Items Available
          </h3>
          <p className="text-gray-600">
            Start by adding some delicious meals to your menu!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 flex-center">Featured Meals</h2>
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {displayedItems.map((item: FoodItem, index: number) => (
          <div
            key={item.id}
            className="food-card food-item"
            data-testid="food-card"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -8,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                duration: 0.15,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                duration: 0.15,
                ease: "power2.out",
              });
            }}
          >
            <div className="relative">
              {getFoodImage(item) ? (
                <Image
                  src={getFoodImage(item)!}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover rounded-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-food.svg";
                  }}
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Food Image</span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-[#F17228] text-white px-2 py-1 rounded-lg flex items-center gap-2 text-sm font-medium">
                <TagIcon className="w-4 h-4" />
                <div className="food-price">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{getPrice(item)}</span>
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
                    className="restaurant-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-restaurant.svg";
                    }}
                  />
                  <div>
                    <h3 className="restaurant-name">
                      {item.restaurant?.name || item.restaurantName}
                    </h3>
                    <div className="food-rating">
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
                    <DropdownMenuItem
                      onClick={() => setEditMeal(item)}
                      data-testid="food-edit-btn"
                    >
                      Edit Food
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteMeal(item)}
                      className="text-red-600 focus:text-red-600"
                      data-testid="food-delete-btn"
                    >
                      Delete Food
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-sm">
                <span
                  className={`restaurant-status ${
                    (item.restaurant?.status || item.status) === "Open" ||
                    (item.restaurant?.status || item.status) === "Open Now"
                      ? "bg-[#79B93C33] text-[#79B93C]"
                      : "bg-[#F1722833] text-[#F17228]"
                  }`}
                >
                  {item.restaurant?.status ||
                    item.restaurant_status ||
                    item.status}
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
