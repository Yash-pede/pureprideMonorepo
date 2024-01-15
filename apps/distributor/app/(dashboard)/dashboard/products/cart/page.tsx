"use client";
import { DataTable } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { columns } from "./Columns";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/shadCnComponents";
import { Loader, LucideShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Cart = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/products/cart");
      return response.data.cartItems || response.data.message;
    },
  });
  // console.log(data);
  if (!data || !data.length || isError) {
    <div className="">No items in cart </div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const supabase = createClientComponentClient();
  const orderGoods = async () => {
    setLoading(true);
    const userId = await supabase.auth.getUser();
    toast.loading("Preparing for Your Order 😊 ");
    try {
      const response = await axios.post("/api/products/orders", {
        userId: userId.data.user?.id,
      });
      // console.log(response.data);
      if (response.data.success) {
        toast.success("Order Placed Successfully");
        router.push("/dashboard/orders");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to process your order. Please try again");
    }
  };

  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data} tableName="cartItems" />
      <Button variant="default" className="my-5 gap-4" onClick={orderGoods}>
        {!loading ? (
          <>
            Order Goods <LucideShoppingBag />
          </>
        ) : (
          <Loader className="animate-spin " />
        )}
      </Button>
    </div>
  );
};

export default Cart;
