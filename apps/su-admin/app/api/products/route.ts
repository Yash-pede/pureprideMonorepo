import { db } from "@repo/drizzle/db";
import { products } from "@repo/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const GET = async () => {
  console.log("GET");
  const allProducts = await db.select().from(products);
  return NextResponse.json({ success: true, allProducts });
};

export const POST = async (req: NextRequest) => {
  console.log("POST");
  const { id } = await req.json();
  const product = await db.select().from(products).where(eq(products.id, id));
  return NextResponse.json({ success: true, product: product[0] });
};

export const DELETE = async (req: NextRequest) => {
  console.log("DELETE");
  console.log(await req.json())
  // try {
  //   const {id} = await req.json();
  //   const product = await db.delete(products).where(eq(products.id, id));
  //   return NextResponse.json({ success: true, product: product[0] });
  // } catch (err) {
  //   console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  // }
};
