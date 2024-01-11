"use client";
import React from "react";
import { productBatches } from "@repo/drizzle/schema";
import { Button, Checkbox, Skeleton } from "../../../../shadCnExport";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { ArrowRight, ArrowUpDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const deletedStocks: string[] = [];
const isDeleted = (batch: string) => deletedStocks.includes(batch);
function getProductName(id: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      return response.data;
    },
  });

  if (isLoading) {
    // Loading state
    return <Skeleton className="h-full w-7 rounded-md"></Skeleton>;
  }

  if (isError) {
    // Error state
    return <div>Error loading data</div>;
  }

  try {
    if (!data) {
      // Data is undefined
      return null;
    }

    if (data.success) {
      return data.allProducts.find((product: any) => product.id === id)?.name;
    } else {
      throw new Error(data.message);
    }
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

const delStock = async (batchNo: string) => {
  const response = await axios.delete("/api/productStock", {
    data: { batchNo },
  });
  if (response.data.success) {
    toast.success(response.data.message);
    deletedStocks.push(batchNo);
  } else {
    toast.error(response.data.message);
  }
};
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        product name
      </Button>
    ),
    cell: ({ row }) => {
      const productName = getProductName(row.getValue("productId"));
      const batchNo: string = row.getValue("batchNo");
      const isDeleted = deletedStocks.includes(batchNo);

      if (!productName) {
        return <Skeleton className="h-4 w-20" />;
      }

      return (
        <div
          className={`lowercase truncate flex items-center gap-1 w-full justify-between ${
            isDeleted ? "line-through" : ""
          }`}
        >
          <div className="max-w-32 truncate">{productName}</div>

          <Link
            href={"/dashboard/products/" + row.getValue("productId")}
            className="justify-self-end border border-input rounded-lg p-1 cursor-pointer hover:bg-card bg-muted transition-all duration-200"
          >
            <ArrowRight />
          </Link>
        </div>
      );
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
    accessorKey: "del_Stock",
    header: ({ column }) => {
      return (
        <Button variant="ghost" size={"icon"}>
          <Trash2 className="text-rose-600 hover:text-rose-700" />
          <span>Stock</span>
        </Button>
      );
    },
    cell: ({ row }) => (
      <Button
        variant="outline"
        size={"icon"}
        onClick={() => delStock(row.getValue("batchNo"))}
        className=" bg-destructive hover:bg-destructive/80 text-white hover:text-white/80"
      >
        <Trash2 className="p-1 rounded" />
      </Button>
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
      <div className="lowercase text-center md:text-left">
        {format(row.getValue("createdAt"), "P")}
      </div>
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
      <div className="lowercase text-center md:text-left">
        {format(row.getValue("expiryDate"), "P")}
      </div>
    ),
  },
];

export default columns;
