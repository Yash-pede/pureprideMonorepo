"use client";

import { Button } from "@repo/ui/shadCnComponents";
import { Checkbox } from "@repo/ui/shadCnComponents";
import { profiles } from "@repo/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import {
  ArrowUpDown,
  Ban,
  CalendarCheck2,
  Delete,
  DeleteIcon,
  TypeIcon,
} from "lucide-react";
import { toast } from "sonner";
import {ComboboxDemo} from "@repo/ui/components";
import { formatDate } from "@repo/ui/shadCnUtils";

const onBan = async (id: string) => {
  const response = await axios.delete("/api/users", {
    data: {
      id,
      actionType: "ban",
    },
  });
  if (response.data.success) {
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }
};
const onDelete = async (id: string) => {
  const response = await axios.delete("/api/users", {
    data: {
      id,
      actionType: "delete",
    },
  });
  if (response.data.success) {
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "userrole",
    header: () => {
      return (
        <Button variant="ghost">
          Role
          <TypeIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <ComboboxDemo
        defaultValue={row.getValue("userrole")}
        id={row.getValue("id")}
      />
    ),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },

  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <Delete className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        <div className="flex gap-3 items-center justify-start">
          <Button
            className="hover:scale-105 duration-200 transition-all"
            variant={"destructive"}
            onClick={() => onBan(row.getValue("id"))}
          >
            <Ban className="w-4 h-4" />
          </Button>
          <Button
            className="hover:scale-105 duration-200 transition-all"
            variant={"outline"}
            onClick={() => onDelete(row.getValue("id"))}
          >
            <DeleteIcon className="w-4 h-4 text-red-700" />
          </Button>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <CalendarCheck2 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (row.getValue("updatedAt")) {
        return (
          <p className="text-xs text-center text-muted-foreground">
            {formatDate(row.getValue("updatedAt"))}
          </p>
        );
      } else {
        return <p className="text-xs text-center text-muted-foreground">-</p>;
      }
    },
  },
  {
    accessorKey: "id", enableHiding: true,
  },
];
