"use client";

import { ProductPage } from "@repo/ui/components";
import { Button } from "@repo/ui/shadCnComponents";

const Product = ({ params }: { params: { productId: string } }) => {
  return <ProductPage productId={params.productId} />;
};

export default Product;
