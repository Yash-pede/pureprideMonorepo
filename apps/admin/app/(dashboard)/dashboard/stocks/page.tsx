"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { DataTable, columns } from "@repo/ui/components";

const Stocks = () => {
  const [productsdata, setData] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      toast.loading("Getting Stocks...");
      const response = await axios.get("/api/productStock");
      if (response.data.success) {
        toast.success("Got Stocks");
        setData(response.data.allProducts);
      } else {
        toast.error(response.data.message);
      }
      return response.data;
    },
  });
  // console.log(data);
  return (
    <section className="w-full flex flex-col">
      <h2 className="text-3xl font-bold text-left mb-5 ">Stocks</h2>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <main className="mx-auto">
          <DataTable columns={columns} data={productsdata} tableName="product_batches" />
        </main>
      )}
    </section>
  );
};

export default Stocks;