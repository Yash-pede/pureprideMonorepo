"use client";
import React, { useEffect, useState } from "react";
import { products } from "@repo/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import {
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/shadCnComponents";
import { AddStockDistributor, CommingSoon } from "@repo/ui/components";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const ProductPage = () => {
  const router = useRouter();
  const productId = usePathname()?.split("/").pop();
  const supabase = createClientComponentClient();
  const [useId, setUserId] = useState("");
  const [inCart, setInCart] = useState(false);
  supabase.auth.getUser().then((res) => setUserId(res.data.user?.id || ""));
  const [addProductSheet, setAddProductSheet] = useState(false);
  const [product, setProduct] = useState<products>({} as products);
  const [Loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setLoading(true);
    const cart = async () => {
      const response = await axios.post(`/api/products`, {
        id: productId,
      });
      if (response.status !== 200) {
        setIsError(true);
        setLoading(false);
        return;
      }
      setProduct(
        (response.data.product as products) ||
          response.data.message ||
          response.data.error
      );
      setLoading(false);
    };
    cart();
    if (cartLoading) setInCart(true);
    else {
      isInCart();
    }
  }, []);

  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/products/cart");
      return response.data.cartItems || response.data.message;
    },
  });
  const isInCart = () => {
    const isProduct =
      cart && cart.find((item: any) => item.productId === product?.id);
    if (isProduct) setInCart(true);
    else setInCart(false);
  };

  if (Loading) {
    return <div>Loading</div>;
  }

  if (isError || !product) {
    router.back();
    console.log(product);
    return <div>Product not found</div>;
  }

  console.log(product);
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
            {inCart ? (
              <Link href="/dashboard/products/cart">
                <Button className="ml-auto gap-2" variant={"default"}>
                  Go to Cart <ShoppingCart />
                </Button>
              </Link>
            ) : (
              <Button
                className={`ml-auto gap-2 ${
                  inCart ? "pointer-events-none" : null
                }`}
                variant={"default"}
                disabled={inCart}
                onClick={() => setAddProductSheet((prev) => !prev)}
              >
                Add To Cart <PlusCircle />
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
      {!inCart && (
        <AddStockDistributor
          user={useId}
          setInCart={setInCart}
          openSheet={addProductSheet}
          setOpenSheet={setAddProductSheet}
          Productname={product.name}
          id={product?.id}
        />
      )}
    </section>
  );
};

export default ProductPage;
