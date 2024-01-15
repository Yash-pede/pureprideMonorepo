"use client";
import { useEffect, useState } from "react";
import { products } from "@repo/shared/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@repo/ui/shadCnComponents";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Products = () => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<
    Array<products | undefined>
  >([]);
  const { data: stock, isLoading: stockLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      const response = await axios.get("/api/products/stocks");
      return (response.data.stocks as Array<any>) || response.data.message;
    },
  });

  const fetchProductDetails = async (
    productId: string
  ): Promise<products | undefined> => {
    try {
      const response = await axios.post("/api/products", { id: productId });
      return response.data.product;
    } catch (error) {
      console.error("Error while fetching product:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const promises = (stock || []).map((product: any) =>
        fetchProductDetails(product.productId)
      );
      const results = await Promise.all(promises);
      setProductDetails(results);
    };

    fetchData();
  }, [stock]);

  return (
    <main>
      <div className="flex flex-row justify-between items-center ">
        <h1 className="text-4xl font-bold text-left mb-5">Products</h1>
        <Link href="/dashboard/products/cart">
          <Button variant="default" className="gap-3">
            <ShoppingCart /> Cart
          </Button>
        </Link>
      </div>
      {stockLoading ? (
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
        <section className="flex flex-row gap-7 flex-wrap xl:justify-start justify-center items-center">
          {stock?.map((product: any, index: number) => {
            const productDetail = productDetails[index];
            return (
              <Card
                key={product.productId}
                className="xl:w-[300px] w-[250px] bg-card shadow-lg hover:scale-105 duration-300 transition-all"
              >
                <CardHeader>
                  <CardTitle className="space-y-4">
                    {productDetail?.imageUrl ? (
                      <Image
                        src={
                          "https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/" +
                          product.imageUrl
                        }
                        alt={productDetail?.name}
                        width={200}
                        height={200}
                        className="object-cover w-full max-h-36 inset-0 rounded-lg"
                      />
                    ) : (
                      <Skeleton className="w-full h-36" />
                    )}
                    {productDetail?.name ? (
                      <h2 className="truncate">
                        {productDetail?.name || "N/A"}
                      </h2>
                    ) : (
                      <Skeleton className="w-full h-4" />
                    )}
                  </CardTitle>
                  <CardDescription className="truncate">
                    {productDetail?.description ? (
                      productDetail?.description
                    ) : (
                      <Skeleton className="w-full h-4" />
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {productDetail?.price ? (
                    <p className="text-lg ">
                      &#8377;{productDetail?.price || "N/A"}
                    </p>
                  ) : (
                    <Skeleton className="w-full h-4" />
                  )}
                  <p className="text-sm">
                    Quantity: {product.quantity || "N/A"}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-1">
                  <Button
                    className="w-full"
                    onClick={() =>
                      router.push(`/dashboard/products/${product.productId}`)
                    }
                  >
                    View
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Products;
