"use client";
import LogoIcon from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";
import AddMealModal from "@/components/modals/AddMealModal";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex-between container py-2">
      <Link href="/" className="flex-center gap-2 cursor-pointer">
        <LogoIcon className="w-6 h-6" />
        <span className="text-[#F17228] font-bold text-lg">
          Food
          <span className="text-[#FFA833]">Wagen</span>
        </span>
      </Link>
      
      <AddMealModal />
    </div>
  );
};

export default Header;
