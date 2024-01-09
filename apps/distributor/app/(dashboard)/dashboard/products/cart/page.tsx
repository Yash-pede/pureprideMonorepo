"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Cart = () => {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/products/cart");
      return response.data.cartItems || response.data.message;
    },
  });
    console.log(cart)
  return <div>Cart</div>;
};

export default Cart;
