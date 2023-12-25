"use client";
import { products } from "@repo/shared/types";
import { Badge, Button } from "@repo/ui/shadCnComponents";
import { formatDate } from "@repo/ui/shadCnUtils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddStock from "../../../../../components/AddStock";

const Product = ({ params }: { params: { productId: string } }) => {
  const [addProductSheet, setAddProductSheet] = useState(false);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.post(`/api/products`, {
        id: params.productId,
      });
      return response.data.product as products;
    },
  });
  if (isLoading) {
    return <div>Loading</div>;
  }
  const router = useRouter();
  if (!product) {
    router.back();
    return <div>Product not found</div>;
  }
  // console.log(product);
  return (
    <section className=" body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
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
            <div className="flex border-t border-gray-200 py-2">
              <span className="">updated at</span>
              <span className="ml-auto ">{formatDate(product?.updatedAt)}</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl ">₹ 58.00</span>
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
              product?.imageUrl
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

export default Product;
