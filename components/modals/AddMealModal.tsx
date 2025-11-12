"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryKeys } from "@/lib/query-keys";
import useDynamicMutation from "@/lib/use-post-data";
import { addMealSchema } from "@/lib/validations/meal";
import { AddMealFormValues, AddMealPayload } from "@/types/meal";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../loader";

const AddMealModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation({});

  const handleAddFood = async (
    values: AddMealFormValues,
    { resetForm }: any
  ) => {
    try {
      const payload: AddMealPayload = {
        name: values.food_name,
        rating: values.food_rating,
        image: values.food_image,
        restaurantName: values.restaurant_name,
        logo: values.restaurant_logo,
        status: values.restaurant_status,
        price: 0,
      };

      await postMutation.mutateAsync({
        url: "/Food",
        method: "POST",
        body: payload,
      });

      toast.success("Meal added successfully!", {
        description: "Your delicious meal has been added to the menu.",
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: [queryKeys.food.all] });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add meal", {
        description:
          "Something went wrong. Please check your details and try again.",
      });
      console.error("Error adding meal:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="food-gradient text-white btn-shadow">
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#FF9A0E] text-center">
            Add a Meal
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            food_name: "",
            food_rating: 0,
            food_image: "",
            restaurant_name: "",
            restaurant_logo: "",
            restaurant_status: "Open Now" as const,
          }}
          validationSchema={addMealSchema}
          onSubmit={handleAddFood}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <Input
                  name="food_name"
                  placeholder="Enter food name"
                  value={values.food_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="food_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Input
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
                <ErrorMessage
                  name="food_rating"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Input
                  name="food_image"
                  placeholder="Enter food image URL"
                  value={values.food_image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="food_image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Input
                  name="restaurant_name"
                  placeholder="Enter restaurant name"
                  value={values.restaurant_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="restaurant_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Input
                  name="restaurant_logo"
                  placeholder="Enter restaurant logo URL"
                  value={values.restaurant_logo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="restaurant_logo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="bg-[#F5F5F5] ">
                <Select
                  value={values.restaurant_status}
                  onValueChange={(value) =>
                    setFieldValue("restaurant_status", value)
                  }
                >
                  <SelectTrigger id="restaurant_status" className="w-full">
                    <SelectValue placeholder="Restaurant status (open/close)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open Now">Open Now</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="restaurant_status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex w-full gap-2 pt-3">
                <Button
                  type="submit"
                  disabled={postMutation.isPending}
                  className="w-1/2 text-white font-medium py-3"
                  style={{
                    background:
                      "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                  }}
                >
                  {postMutation.isPending ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={postMutation.isPending}
                    className="w-1/2 border border-[#FFBA26] py-3"
                    data-close-modal
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

export default AddMealModal;
