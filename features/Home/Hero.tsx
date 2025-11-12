"use client";
import MotorIcon from "@/components/icons/motor-icon";
import PickupIcon from "@/components/icons/pickup-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/lib/query-keys";
import { useFetchData } from "@/lib/use-fetch-data";
import { buildUrl } from "@/utils/buildUrl";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FoodHero = () => {
  const [activeTab, setActiveTab] = useState("delivery");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const FilterUrl = buildUrl("/Food", {
    name: searchQuery,
  });

  const getFood = useFetchData(
    [queryKeys.food.all, searchQuery],
    FilterUrl,
    undefined,
    !!searchQuery
  );

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#FFB30E]" style={{ height: "calc(100vh - 80px)" }}>
      <div className="container flex flex-between h-full items-center max-w-6xl">
        <div className="flex-col gap-6 flex justify-center md:items-start items-center">
          <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[88px] leading-tight md:leading-none tracking-normal text-white text-center md:text-left">
            Are you starving?
          </h2>
          <p className="text-white text-base sm:text-lg md:text-xl text-center md:text-left max-w-md">
            Within a few clicks, find meals that are accessible near you
          </p>
          <div className="bg-white p-6 rounded-2xl w-full ">
            <div className="flex gap-2 mb-6">
              <Button
                variant="ghost"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === "delivery"
                    ? "bg-[#F172281A] text-[#F17228]"
                    : "bg-white text-[#757575]"
                }`}
                onClick={() => setActiveTab("delivery")}
              >
                <MotorIcon
                  className={
                    activeTab === "delivery"
                      ? "[&>path]:fill-[#F17228]"
                      : "[&>path]:fill-[#757575]"
                  }
                />
                Delivery
              </Button>
              <Button
                variant="ghost"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === "pickup"
                    ? "bg-[#F172281A] text-[#F17228]"
                    : "bg-white text-[#757575]"
                }`}
                onClick={() => setActiveTab("pickup")}
              >
                <PickupIcon
                  className={
                    activeTab === "pickup"
                      ? "[&>path]:fill-[#F17228]"
                      : "[&>path]:fill-[#757575]"
                  }
                />
                Pickup
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-1 py-2 items-center bg-[#F5F5F5] rounded-lg overflow-hidden">
                <div className="flex items-center px-3 py-2 gap-2 flex-1">
                  <Search className="w-5 h-5 text-[#F17228]" />
                  <Input
                    type="text"
                    placeholder="Search for food items"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 food-input border-none outline-none text-gray-700 focus-visible:ring-0"
                    data-testid="food-search-input"
                    name="food_search"
                  />
                </div>
              </div>

              <Button
                onClick={handleSearch}
                disabled={getFood.isFetching}
                className="px-4 py-6 text-white rounded-md flex items-center gap-2 food-btn cursor-pointer"
                style={{
                  background:
                    "linear-gradient(95.71deg, #FF7A7A -39.64%, #F75900 135.31%)",
                }}
                data-testid="food-search-btn"
              >
                {getFood.isFetching ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Search className="w-5 h-5 text-white" />
                )}
                Search Food
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-col  justify-end hidden md:flex">
          <Image
            src="/home-img/hero-img.png"
            alt="Food Hero Image"
            width={600}
            height={600}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodHero;
