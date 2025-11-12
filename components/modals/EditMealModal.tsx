"use client";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from "sonner";
import { AddMealFormValues, AddMealPayload } from "@/types/meal";
import { addMealSchema } from "@/lib/validations/meal";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import useDynamicMutation from "@/lib/use-post-data";
import { FoodItem } from "@/types/food";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: FoodItem;
}

const EditMealModal = ({ isOpen, onClose, meal }: EditMealModalProps) => {
  const queryClient = useQueryClient();
  const updateMutation = useDynamicMutation({});

  const handleUpdateFood = async (
    values: AddMealFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const payload: AddMealPayload = {
        name: values.food_name,
        rating: values.food_rating,
        image: values.food_image,
        restaurantName: values.restaurant_name,
        logo: values.restaurant_logo,
        status: values.restaurant_status,
        price: meal.price || 0,
      };

      await updateMutation.mutateAsync({
        url: `/Food/${meal.id}`,
        method: "PUT",
        body: payload,
      });

      toast.success("Meal updated successfully!", {
        description: "Your meal has been updated.",
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: [queryKeys.food.all] });
      onClose();
    } catch (error) {
      toast.error(" Failed to update meal", {
        description: "Something went wrong. Please try again.",
      });
      console.error("Error updating meal:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[400px] h-auto max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#FF9A0E] text-center flex items-center justify-center gap-2">
            Edit Meal
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            food_name: meal.name || "",
            food_rating: Number(meal.rating) || 0,
            food_image: meal.image || "",
            restaurant_name: meal.restaurantName || meal.restaurant?.name || "",
            restaurant_logo: meal.logo || meal.restaurant?.logo || "",
            restaurant_status: (meal.status ||
              meal.restaurant?.status ||
              "Open Now") as "Open Now" | "Closed",
          }}
          validationSchema={addMealSchema}
          onSubmit={handleUpdateFood}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="food_name" className="text-sm font-medium">
                  Food Name
                </Label>
                <Input
                  id="food_name"
                  name="food_name"
                  placeholder="Enter food name"
                  value={values.food_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="food_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="food_rating" className="text-sm font-medium">
                  Food Rating
                </Label>
                <Input
                  id="food_rating"
                  name="food_rating"
                  type="number"
                  placeholder="Enter food rating (1-5)"
                  value={values.food_rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="5"
                  className="bg-[#F5F5F5]"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="food_rating"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="food_image" className="text-sm font-medium">
                  Food Image URL
                </Label>
                <Input
                  id="food_image"
                  name="food_image"
                  placeholder="Enter food image URL"
                  value={values.food_image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="food_image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="restaurant_name"
                  className="text-sm font-medium"
                >
                  Restaurant Name
                </Label>
                <Input
                  id="restaurant_name"
                  name="restaurant_name"
                  placeholder="Enter restaurant name"
                  value={values.restaurant_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="restaurant_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="restaurant_logo"
                  className="text-sm font-medium"
                >
                  Restaurant Logo URL
                </Label>
                <Input
                  id="restaurant_logo"
                  name="restaurant_logo"
                  placeholder="Enter restaurant logo URL"
                  value={values.restaurant_logo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <div className="h-5">
                  <ErrorMessage
                    name="restaurant_logo"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="restaurant_status"
                  className="text-sm font-medium"
                >
                  Restaurant Status
                </Label>
                <Select
                  value={values.restaurant_status}
                  onValueChange={(value) =>
                    setFieldValue("restaurant_status", value)
                  }
                >
                  <SelectTrigger id="restaurant_status" className="w-full">
                    <SelectValue placeholder="Restaurant status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open Now">Open Now</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-5">
                  <ErrorMessage
                    name="restaurant_status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex w-full gap-2 pt-3">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-1/2 text-white font-medium py-3"
                  style={{
                    background:
                      "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                  }}
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    </>
                  ) : (
                    "Update Meal"
                  )}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={updateMutation.isPending}
                    className="w-1/2 py-3"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealModal;
