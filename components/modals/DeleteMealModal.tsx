"use client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import useDynamicMutation from "@/lib/use-post-data";
import { FoodItem } from "@/types/food";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DeleteMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: FoodItem;
}

const DeleteMealModal = ({ isOpen, onClose, meal }: DeleteMealModalProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useDynamicMutation({});

  const handleDeleteMeal = async () => {
    try {
      await deleteMutation.mutateAsync({
        url: `/Food/${meal.id}`,
        method: "DELETE",
      });

      toast.success("Meal deleted successfully!", {
        description: "The meal has been removed from the menu.",
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.food.all] });
      onClose();
    } catch (error) {
      toast.error("Failed to delete meal", {
        description: "Something went wrong. Please try again.",
      });
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#FF9A0E] text-center">
            Delete Food
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to delete this food item? This action cannot be undone.
          </p>

          <div className="flex w-full gap-2">
            <Button
              onClick={handleDeleteMeal}
              disabled={deleteMutation.isPending}
              className="w-1/2 text-white font-medium py-3 food-btn"
              style={{
                background:
                  "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
              }}
              data-testid="food-confirm-delete-btn"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting Food...
                </>
              ) : (
                "Delete Food"
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={deleteMutation.isPending}
              className="w-1/2 py-3 food-btn"
              data-testid="food-cancel-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMealModal;
