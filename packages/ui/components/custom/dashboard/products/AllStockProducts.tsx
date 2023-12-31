"use client";
import { Skeleton } from "../../../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { products, stockProducts } from "@repo/shared/types";
import { Button } from "../../../ui/button";
import { useRouter } from "next/navigation";

const AllStockProducts = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      const response = await axios.get("/api/products/stocks"); 
      return response.data.stocks;
    },
  });

  const { data: Products, isLoading: ProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      return response.data.allProducts;
    },
  });


  if (isLoading || !data || !Products || ProductsLoading) {
    return (
      <div className="flex flex-row gap-7 flex-wrap xl:justify-start justify-center items-center">
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
          <Skeleton className="XL:w-[300px] md:w-[250px] h-[350px]" />
        </div>
    );
  }

  return (
    <div className="w-full">
      <section className="flex flex-row gap-7 flex-wrap xl:justify-start justify-center items-center">
        {data.map((productData: stockProducts) => {
          const product = Products.find((p: products) => p.id === productData.productId);

          return (
            <Card
              key={productData.productId}
              className="xl:w-[300px] w-[250px] bg-card shadow-lg hover:scale-105 duration-300 transition-all"
            >
              <CardHeader>
                <CardTitle className="space-y-4">
                  {product && (
                    <Image
                      src={
                        "https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/" +
                        product.imageUrl
                      }
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover w-full max-h-36 inset-0 rounded-lg"
                    />
                  )}
                  <h2 className="truncate">{product?.name || "N/A"}</h2>
                </CardTitle>
                <CardDescription className="truncate">
                  {product?.description || "N/A"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg ">&#8377;{product?.price || "N/A"}</p>
                <p className="text-sm">Quantity: {productData.quantity || "N/A"}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-1">
                <Button
                  className="w-full"
                  onClick={() => router.push(`/dashboard/products/${productData.productId}`)}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default AllStockProducts;