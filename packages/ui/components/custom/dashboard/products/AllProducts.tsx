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
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Notfound from "../../Handmade/Notfound/Notfound";

const AllProducts = ({
  data,
  isLoading,
}: {
  data: products[];
  isLoading: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="w-full">
      {isLoading ? (
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
      ) : (
        <section className="md:flex flex-row gap-7 grid grid-cols-2 place-items-center flex-wrap xl:justify-start justify-center items-center">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((product: products) => (
              <Card
                key={product.id}
                className="xl:w-[300px] md:w-[250px] max-w-[110%] bg-card shadow-lg hover:scale-105 duration-300 transition-all"
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
                    <p className="truncate">{product.name}</p>
                  </CardTitle>
                  <CardDescription className="truncate">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg "> &#8377;{product.price}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-1">
                  <Button
                    className="w-full"
                    onClick={() =>
                      router.push(`/dashboard/products/${product.id}`)
                    }
                  >
                    View
                  </Button>
                  {product.updatedAt && (
                    <p className="text-sm text-muted-foreground text-right w-full bottom-0 mt-5">
                      Updated at:{" "}
                      {format(product.updatedAt, "dd MMM yyyy hh:mm a")}
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-bold text-center w-full mx-auto">
                No products
              </p>
              <Notfound />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AllProducts;
