"use client"
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../shadCnExport";
import { cn } from "../../../../config/utils";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addingStockFormSchema } from "@repo/shared/types";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddStock = ({
  openSheet,
  setOpenSheet,
  Productname,
  id,
}: {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  Productname: string;
  id: string;
}) => {
  const [date, setDate] = React.useState<Date>();
  const addProductStocks = async (values: any) => {
    const response = await axios.post("/api/productStock", {
      id: id,
      ...values,
    });
    if (response.data.success) {
      toast.success("Stock Added");
    } else {
      toast.error(response.data.message);
    }
    return response.data;
  };
  const { mutateAsync: addMutuation } = useMutation({
    mutationFn: addProductStocks,
  });

  const form = useForm<z.infer<typeof addingStockFormSchema>>({
    resolver: zodResolver(addingStockFormSchema),
    defaultValues: {
      batchNo: "",
      expiryDate: new Date(),
      quantity: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof addingStockFormSchema>) {
    // console.log(values);
    toast.loading("Adding Stocks...");

    await addMutuation(values);

    setOpenSheet(false);
  }

  return (
    <Dialog open={openSheet} onOpenChange={setOpenSheet}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Stocks</DialogTitle>
          <DialogDescription>
            These changes will be reflected immediately to the distributors.
            Handle with responsibility.
          </DialogDescription>
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
              name="batchNo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Batch No</FormLabel>
                  <FormControl>
                    <Input
                      id="batchno"
                      placeholder="Batch No"
                      className="col-span-3"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      id="quantity"
                      placeholder="quantity"
                      className="col-span-3"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage/> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Expiry Date</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        required
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button type="submit">Add Stock</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStock;
