"use client";

import { productBatches } from "@repo/drizzle/schema";
import { Button, Checkbox, Skeleton } from "@repo/ui/shadCnComponents";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
// import { getProductName } from "./page";
function getProductName(id: string) {
  try {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const response = await axios.get("/api/products");
        return response.data.allProducts;
      },
    });
    return data.find((product: any) => product.id === id)?.name;
  } catch (err) {
    console.log(err);
    toast.error("Some Error");
    return "Some Error";
  }
}

export const columns: ColumnDef<typeof productBatches._.inferSelect>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "batchNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          batchNo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("batchNo")}</div>
    ),
  },
  {
    accessorKey: "productId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          product name
        </Button>
      );
    },
    cell: ({ row }) => {
      const productName = getProductName(row.getValue("productId"));
      if (productName === "Some Error") {
        return <Skeleton className="h-full w-7 rounded-md"></Skeleton>;
      } else {
        return <div className="lowercase truncate">{productName}</div>;
      }
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          quantity
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          createdAt
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{format(row.getValue("createdAt"), "P")}</div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          expiryDate
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{format(row.getValue("expiryDate"), "P")}</div>
    ),
  },
];
