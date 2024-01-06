"use client";
import React, { useState } from "react";
import { products } from "@repo/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "../../../ui/badge";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import CommingSoon from "../../Handmade/CommingSoon";
import { userRoles } from "@repo/drizzle/schema";
import AddStock from "../stocks/AddStock";

const ProductPage = ({
  productId,
  userRole,
}: {
  productId: string;
  userRole: string;
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
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
  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products`, {
        data: {
          id: product.id,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        console.log();
        const { data, error } = await supabase.storage
          .from("Products")
          .remove([product.imageUrl]);
        //  console.log(data);
        //  console.log(error);
        router.back();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  // console.log(product);
  return (
    <section className="flex flex-col lg:flex-row justify-around w-full h-full items-center overflow-hidden px-5">
      <div className="lg:w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mb-0 space-y-5 md:space-y-7 w-full md:w-2/3 mx-auto h-fit">
        <h1 className=" text-3xl title-font font-medium mb-4 w-full md:w-2/3 mx-auto h-fit flex flex-col gap-2">
          {product?.name}
          <Badge
            className="text-sm title-font max-w-fit tracking-widest"
            variant={"default"}
          >
            PUREPRIDE
          </Badge>
        </h1>
        <Tabs
          defaultValue="description"
          className="w-full md:w-2/3 mx-auto h-fit"
        >
          <TabsList className="w-full justify-around">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <p className="leading-relaxed mb-4">{product?.description}</p>
          </TabsContent>
          <TabsContent value="reviews">
            <CommingSoon />
          </TabsContent>
          <TabsContent value="details">
            <CommingSoon />
          </TabsContent>
        </Tabs>
        {product.updatedAt && (
          <div className="flex py-2 w-full md:w-2/3 mx-auto font-medium">
            <span className="">updated at</span>
            <span className="ml-auto ">
              {format(product.updatedAt, "dd MMM yyyy")}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center w-full md:w-2/3 mx-auto h-fit">
          <span className="title-font font-medium text-2xl">
            ₹ {product.price}
          </span>
          <div className="flex gap-5">
            <Button
              className="ml-auto"
              variant={"default"}
              onClick={() => setAddProductSheet((prev) => !prev)}
            >
              Add stock <PlusCircle />
            </Button>
            {userRole === userRoles.enumValues[0] && (
              <Button
                className="ml-auto"
                variant={"destructive"}
                onClick={() => handleDeleteProduct()}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 overflow-hidden">
        <Image
          src={
            "https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/" +
            product.imageUrl
          }
          alt="Product image"
          width={400}
          height={400}
          className="object-cover w-full h-full rounded-lg"
        />
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
