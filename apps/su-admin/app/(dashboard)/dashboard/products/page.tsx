"use client";
import { AllProducts, ProductNav } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Products = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      console.log(response.data);
      return response.data.allProducts || [];
    },
  });
  return (
    <main>
      <ProductNav />
      <AllProducts data={data} isLoading={isLoading} />
    </main>
  );
};

export default Products;
