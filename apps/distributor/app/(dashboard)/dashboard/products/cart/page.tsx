"use client";
import { DataTable } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { columns } from "./Columns";

const Cart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/products/cart");
      return response.data.cartItems || response.data.message;
    },
  });
  console.log(data);
  if(isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data} tableName="cartItems" />
    </div>
  );
};

export default Cart;
