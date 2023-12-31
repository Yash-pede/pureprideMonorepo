"use client";
import React, { useState } from "react";
import { products } from "@repo/shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";
import AddStock from "../stocks/AddStock";
import { Badge } from "../../../ui/badge";
import { toast } from "sonner";
import RolecheckSuAdmin from "../../auth/HOC/Rolecheck";

const ProductPage = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [addProductSheet, setAddProductSheet] = useState(false);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/products`, {
          id: productId,
        });
        return response.data.product as products;
      } catch (error: any) {
        throw error.response?.data || error.message || error;
      }
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !product) {
    router.back();
    return <div>Product not found</div>;
  }

  // console.log(product);
  return (
    <section className="">
      <div className="container px-5  mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <Badge
              className="text-sm title-font  tracking-widest"
              variant={"default"}
            >
              PUREPRIDE
            </Badge>
            <h1 className=" text-3xl title-font font-medium mb-4">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow text-primary border-b-2 border-primary py-2 text-lg px-1">
                Description
              </a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Reviews
              </a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Details
              </a>
            </div>
            <p className="leading-relaxed mb-4">{product?.description}</p>
            {product.updatedAt && (
              <div className="flex border-t border-gray-200 py-2">
                <span className="">updated at</span>
                <span className="ml-auto ">
                  {format(product.updatedAt, "dd MMM yyyy")}
                </span>
              </div>
            )}
            <div className="flex">
              <span className="title-font font-medium text-2xl ">
                ₹ {product.price}
              </span>
              <Button
                className="ml-auto gap-5"
                variant={"default"}
                onClick={() => setAddProductSheet((prev) => !prev)}
              >
                Add stock <PlusCircle />
              </Button>
            </div>
          </div>
          <Image
            src={
              "https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/" +
              product.imageUrl
            }
            alt="Product image"
            width={400}
            height={400}
            className="object-cover inset-0 rounded-lg"
          />
        </div>
      </div>
      <AddStock
        openSheet={addProductSheet}
        setOpenSheet={setAddProductSheet}
        Productname={product.name}
        id={product?.id}
      />
    </section>
  );
};

export default ProductPage;
