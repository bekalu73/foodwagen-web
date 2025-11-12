import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center w-full py-16", className)}
    >
      <Loader2Icon className={cn("animate-spin text-primary")} size={45} />
    </div>
  );
};

export default Loader;
