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
import { products } from "@repo/shared/types";
import { Button } from "../../../ui/button";
import { formatDate } from "../../../../config/utils";

const AllProducts = () => {
  const { data, isLoading, status } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      return response.data.allProducts;
    },
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex flex-row gap-7 flex-wrap xl:justify-start justify-center items-center">
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
          <Skeleton className="w-[300px] h-[350px]" />
        </div>
      ) : (
        <section className="flex flex-row gap-7 flex-wrap xl:justify-start justify-center items-center">
          {data &&
            data.map((product: products) => (
              <Card
                key={product.id}
                className="xl:w-[300px] w-[250px] bg-card shadow-lg hover:scale-105 duration-300 transition-all"
              >
                <CardHeader>
                  <CardTitle className="space-y-4">
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
                    <h2 className="truncate">{product.name}</h2>
                  </CardTitle>
                  <CardDescription className="truncate">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg "> &#8377;{product.price}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-1">
                  <Button className="w-full">View</Button>
                  {product.updatedAt && (
                    <p className="text-xs text-muted-foreground text-right w-full bottom-0 mt-5">
                      Updated at: {formatDate(product.updatedAt)}
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
        </section>
      )}
    </div>
  );
};

export default AllProducts;
