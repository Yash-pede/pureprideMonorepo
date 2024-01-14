"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../shadCnExport";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addingCartFormSchema } from "@repo/shared/types";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddStockDistributor = ({
  openSheet,
  setOpenSheet,
  Productname,
  id,
  user,
  setInCart,
}: {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setInCart: React.Dispatch<React.SetStateAction<boolean>>;
  Productname: string;
  user: string;
  id: string;
}) => {
  const [quantity, setQuantity] = React.useState(0);
  const addProductCart = async (values: any) => {
    const response = await axios.post("/api/products/cart", {
      product: id,
      quantity,
      user,
    });
    if (response.data.success) {
      setInCart(true);
      toast.success("Stock Added");
    } else {
      toast.error(response.data.message);
    }
    return response.data;
  };
  const { mutateAsync: addMutuation } = useMutation({
    mutationFn: addProductCart,
  });

  const form = useForm<z.infer<typeof addingCartFormSchema>>({
    resolver: zodResolver(addingCartFormSchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof addingCartFormSchema>) {
    // console.log(values);
    toast.loading("Adding Stocks...");

    await addMutuation(values);

    setOpenSheet(false);
  }

  return (
    <Dialog open={openSheet} onOpenChange={setOpenSheet}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogDescription>Add product to your cart.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4 pointer-events-none">
              <Label htmlFor="productName" className="text-right">
                Name
              </Label>
              <Input
                id="productName"
                placeholder="Add Stock"
                defaultValue={Productname}
                disabled
                className="text-lg w-full bg-secondary text-muted-foreground placeholder:text-muted-foreground col-span-3"
              />
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">{field.name}</FormLabel>
                  <FormControl className="col-span-3">
                    <div className="flex items-center justify-between w-full mx-auto">
                      <MinusCircleIcon
                        className="w-7 h-auto hover:scale-110 hover:cursor-pointer duration-200 transition-all"
                        onClick={() =>
                          setQuantity((prev) => (prev > 0 ? prev - 5 : 0))
                        }
                      />
                      <Input
                        id="quantity"
                        placeholder="quantity"
                        className="w-2/3 pointer-events-none text-lg font-bold text-center"
                        value={quantity}
                        disabled
                      />
                      <PlusCircleIcon
                        onClick={() =>
                          setQuantity((prev) => (prev >= 0 ? prev + 5 : 0))
                        }
                        className="w-7 h-auto hover:scale-110 hover:cursor-pointer duration-200 transition-all"
                      />
                    </div>
                  </FormControl>
                  {/* <FormMessage/> */}
                </FormItem>
              )}
            />
            <Button type="submit">Add Cart</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockDistributor;
