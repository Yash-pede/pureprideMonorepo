"use client";
import { userRoles } from "@repo/drizzle/schema";
import { ProductPage } from "@repo/ui/components";

const Product = ({ params }: { params: { productId: string } }) => {
  return (
    <ProductPage
      productId={params.productId}
      userRole={userRoles.enumValues[0]}
    />
  );
};

export default Product;
