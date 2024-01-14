"use client";

import { Button, Skeleton } from "@repo/ui/shadCnComponents";
import { Checkbox } from "@repo/ui/shadCnComponents";
import { profiles } from "@repo/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowRight, EyeOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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

const onDelete = async (id: string) => {
  console.log("Delete");
};

export const columns: ColumnDef<typeof profiles._.inferSelect>[] = [
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

      if (!productName) {
        return <Skeleton className="h-4 w-20" />;
      }

      return (
        <div
          className={`lowercase truncate flex items-center gap-1 w-1/2 justify-between`}
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
    maxSize: 5,
    size: 4,
    enableResizing: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          quantity
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="truncate ">{row.getValue("quantity")}</p>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "userId",
    maxSize: 5,
    size: 4,
    enableResizing: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          ID
          <EyeOff className="ml-3 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="truncate w-[50%]">{row.getValue("userId")}</p>
    ),
    enableSorting: false,
    enableHiding: true,
  },
];
