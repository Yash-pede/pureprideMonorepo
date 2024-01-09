"use client"
import { AllStockProducts } from "@repo/ui/components";
import { Button } from "@repo/ui/shadCnComponents";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
const Products = () => {
  return (
    <main>
      <div className="flex flex-row justify-between items-center ">
      <h1 className="text-4xl font-bold text-left mb-5">Products</h1>
      <Link href="/dashboard/products/cart">
      <Button variant="default" className="gap-3"> <ShoppingCart /> Cart</Button>
      </Link>
      </div>
      <AllStockProducts />
    </main>
  );
};

export default Products;
