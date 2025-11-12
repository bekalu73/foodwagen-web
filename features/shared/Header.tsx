import LogoIcon from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <div className="flex-between container py-2">
      <div className="flex-center gap-2">
        <LogoIcon className="w-6 h-6" />
        <span className="text-[#F17228] font-bold text-lg">
          Food
          <span className="text-[#FFA833]">Wagen</span>
        </span>
      </div>
      <Button className="food-gradient text-white btn-shadow">Add Meal</Button>
    </div>
  );
};

export default Header;
