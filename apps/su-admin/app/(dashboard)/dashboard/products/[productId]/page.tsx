"use client";
import { ProductPage } from "@repo/ui/components";

const Product = ({ params }: { params: { productId: string } }) => {
  return <ProductPage productId={params.productId} />;
};

export default Product;
