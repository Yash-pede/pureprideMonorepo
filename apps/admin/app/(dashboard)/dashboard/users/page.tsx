"use client";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./Columns";
import axios from "axios";
import { Dot } from "lucide-react";
import { Button } from "@repo/ui/shadCnComponents";
import { Skeleton } from "@repo/ui/shadCnComponents";
import { DataTable } from "@repo/ui/components";

export default function Users() {
  const { data, status } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data.users;
    },
  });

  return (
    <div className="w-full py-10 space-y-5">
      {/* <h1 className="text-4xl font-bold text-left">List of all Users</h1> */}

      <Button variant={"ghost"} className="gap-4">
        <Dot className="animate-ping text-rose-700 w-10 h-10" />
        <p>{status}</p>
      </Button>

      {status == "success" ? (
        <DataTable columns={columns} data={data} tableName="profiles" />
      ) : (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}
    </div>
  );
}
