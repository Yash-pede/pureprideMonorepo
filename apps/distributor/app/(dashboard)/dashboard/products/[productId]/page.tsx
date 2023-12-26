"use client";
import { products } from "@repo/shared/types";
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/shadCnComponents";
import { formatDate } from "@repo/ui/shadCnUtils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

const Product = ({ params }: { params: { productId: string } }) => {
  const [open, setOpen] = React.useState(false);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.post(`/api/products`, {
        id: params.productId,
      });
      return response.data.product as products;
    },
  });
  console.log(product);
  return (
    <section className=" body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font  tracking-widest">PUREPRIDE</h2>
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
              <Button className="ml-auto" onClick={() => setOpen(true)}>
                add to cart
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Order Products</SheetTitle>
            <SheetDescription>
              <Label>Quantity to order </Label>
              <Input />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Product;
